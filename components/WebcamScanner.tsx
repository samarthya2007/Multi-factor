
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { VerificationStatus, Challenge, UserIdentity } from '../types';
import { CHALLENGE_BANK } from '../constants';
import ChallengeOverlay from './ChallengeOverlay';
import IdentityForm from './IdentityForm';
import { analyzeLiveness } from '../services/gemini';
import { AlertTriangle, ShieldCheck, Fingerprint, Zap } from 'lucide-react';

interface Props {
  status: VerificationStatus;
  setStatus: (s: VerificationStatus) => void;
  onComplete: (success: boolean) => void;
}

const WebcamScanner: React.FC<Props> = ({ status, setStatus, onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState(0);
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const [progress, setProgress] = useState(0);
  const [identity, setIdentity] = useState<UserIdentity | null>(null);
  const [showFlash, setShowFlash] = useState(false);

  // Initial State Setup
  useEffect(() => {
    if (status === VerificationStatus.IDLE && !identity) {
      setStatus(VerificationStatus.COLLECTING_DATA);
    }
  }, [status, identity, setStatus]);

  // Initialize MediaPipe FaceMesh
  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const faceMesh = new (window as any).FaceMesh({
      locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMesh.onResults((results: any) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
        setIsFaceDetected(true);
        const landmarks = results.multiFaceLandmarks[0];
        (window as any).drawConnectors(ctx, landmarks, (window as any).FACEMESH_TESSELATION, {color: '#3b82f633', lineWidth: 1});
        (window as any).drawConnectors(ctx, landmarks, (window as any).FACEMESH_RIGHT_EYE, {color: '#3b82f6', lineWidth: 1});
        (window as any).drawConnectors(ctx, landmarks, (window as any).FACEMESH_LEFT_EYE, {color: '#3b82f6', lineWidth: 1});
        (window as any).drawConnectors(ctx, landmarks, (window as any).FACEMESH_LIPS, {color: '#6366f1', lineWidth: 1});
      } else {
        setIsFaceDetected(false);
      }
    });

    const camera = new (window as any).Camera(videoRef.current, {
      onFrame: async () => {
        if (videoRef.current) {
          await faceMesh.send({image: videoRef.current});
        }
      },
      width: 640,
      height: 480,
    });
    camera.start();

    return () => {
      camera.stop();
      faceMesh.close();
    };
  }, []);

  const handleIdentitySubmit = (data: UserIdentity) => {
    setIdentity(data);
    setStatus(VerificationStatus.IDLE);
  };

  const startVerification = () => {
    const randomChallenges = [...CHALLENGE_BANK]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    setChallenges(randomChallenges);
    setCurrentChallengeIdx(0);
    setProgress(0);
    setStatus(VerificationStatus.SCANNING);
  };

  const handleNextChallenge = useCallback(async () => {
    if (currentChallengeIdx < challenges.length - 1) {
      setCurrentChallengeIdx(prev => prev + 1);
      setProgress(((currentChallengeIdx + 1) / challenges.length) * 100);
    } else {
      setProgress(100);
      setStatus(VerificationStatus.PROCESSING);
      
      // Trigger Chroma-Flash reflection check
      setShowFlash(true);
      
      // Wait for flash to register on camera exposure (approx 500ms)
      setTimeout(async () => {
        const canvas = canvasRef.current;
        if (canvas && videoRef.current) {
          const offscreen = document.createElement('canvas');
          offscreen.width = 640;
          offscreen.height = 480;
          offscreen.getContext('2d')?.drawImage(videoRef.current, 0, 0);
          const frameData = offscreen.toDataURL('image/jpeg').split(',')[1];
          
          try {
            const result = await analyzeLiveness(frameData, challenges.map(c => c.description).join(', '));
            setShowFlash(false);
            onComplete(result.isReal);
          } catch (error) {
            console.error("Liveness check failed", error);
            setShowFlash(false);
            onComplete(false);
          }
        }
      }, 600);
    }
  }, [currentChallengeIdx, challenges, onComplete, setStatus]);

  useEffect(() => {
    let timer: any;
    if (status === VerificationStatus.SCANNING) {
      timer = setTimeout(() => {
        handleNextChallenge();
      }, 3500);
    }
    return () => clearTimeout(timer);
  }, [status, currentChallengeIdx, handleNextChallenge]);

  return (
    <div className="relative w-full h-full aspect-video bg-black flex items-center justify-center group overflow-hidden">
      <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover grayscale opacity-60" playsInline muted />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover pointer-events-none" width={640} height={480} />
      
      {/* Chroma-Flash Overlay */}
      <div className={`absolute inset-0 z-40 transition-opacity duration-300 pointer-events-none ${showFlash ? 'opacity-80 bg-blue-500' : 'opacity-0'}`} />

      {status === VerificationStatus.SCANNING && <div className="scanner-line pointer-events-none" />}

      {/* 0. Identity Data Collection */}
      {status === VerificationStatus.COLLECTING_DATA && (
        <IdentityForm onSubmit={handleIdentitySubmit} />
      )}

      {/* 1. Landing UI (Camera Ready) */}
      {status === VerificationStatus.IDLE && identity && (
        <div className="z-10 text-center space-y-6 max-w-sm px-6 animate-in fade-in duration-500">
          <div className="mx-auto w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center border border-blue-500/50 animate-pulse">
            <Fingerprint className="w-10 h-10 text-blue-500" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold tracking-tight text-white uppercase italic">Ready, {identity.fullName.split(' ')[0]}</h2>
            <p className="text-zinc-400 text-sm">Target Wallet: <span className="mono text-[10px] text-zinc-500">{identity.walletAddress.slice(0, 6)}...{identity.walletAddress.slice(-4)}</span></p>
          </div>
          <button 
            onClick={startVerification}
            disabled={!isFaceDetected}
            className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${isFaceDetected ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/40' : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'}`}
          >
            {isFaceDetected ? 'START MFPL SCAN' : 'WAITING FOR FACE...'}
          </button>
        </div>
      )}

      {/* 2. Scanning / Processing UI */}
      {status === VerificationStatus.SCANNING && challenges[currentChallengeIdx] && (
        <ChallengeOverlay 
          challenge={challenges[currentChallengeIdx]} 
          index={currentChallengeIdx + 1}
          total={challenges.length}
          progress={progress}
        />
      )}

      {status === VerificationStatus.PROCESSING && (
        <div className="z-10 bg-black/60 backdrop-blur-xl p-8 rounded-2xl border border-zinc-700 text-center space-y-4">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            {showFlash && <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-blue-400 animate-pulse" />}
          </div>
          <div>
            <h3 className="font-bold text-lg">Chroma-Reflection Audit</h3>
            <p className="text-zinc-400 text-sm mono">Testing skin response to light flash...</p>
          </div>
        </div>
      )}

      {/* 3. Final Result UI */}
      {(status === VerificationStatus.SUCCESS || status === VerificationStatus.FAILED) && (
        <div className="z-10 animate-in fade-in zoom-in duration-300">
          {status === VerificationStatus.SUCCESS ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-xl p-10 rounded-3xl text-center space-y-6">
              <div className="w-20 h-20 bg-emerald-500 rounded-full mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/40">
                <ShieldCheck className="w-12 h-12 text-white" />
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-emerald-400">Identity Confirmed</h3>
                <p className="text-emerald-500/70 mono text-[10px] tracking-widest uppercase">{identity?.fullName}</p>
                <p className="text-zinc-600 mono text-[9px] mt-2">SBT MINTED TO {identity?.walletAddress.slice(0, 10)}...</p>
              </div>
            </div>
          ) : (
            <div className="bg-red-500/10 border border-red-500/30 backdrop-blur-xl p-10 rounded-3xl text-center space-y-6">
              <div className="w-20 h-20 bg-red-500 rounded-full mx-auto flex items-center justify-center shadow-lg shadow-red-500/40">
                <AlertTriangle className="w-12 h-12 text-white" />
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-red-400">Access Denied</h3>
                <p className="text-red-500/70 mono text-xs uppercase">Synthetic latency detected for {identity?.fullName}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {status === VerificationStatus.SCANNING && !isFaceDetected && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-500/90 text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 z-50">
          <AlertTriangle className="w-3 h-3" /> FACE LOST: RE-CENTER
        </div>
      )}
    </div>
  );
};

export default WebcamScanner;
