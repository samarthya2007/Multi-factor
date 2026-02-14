
import React from 'react';
import { ShieldAlert, Cpu, Network, Layers, Code, Zap, GitBranch, Github, Globe } from 'lucide-react';

const TechnicalBlueprint: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-top-4 duration-700">
      <section className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 md:p-12 space-y-8">
        <div className="flex items-center gap-4 border-b border-zinc-800 pb-6">
          <Layers className="w-10 h-10 text-blue-500" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">System Architecture</h1>
            <p className="text-zinc-400">Multi-Factor Proof of Life (MFPL) Protocol</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-blue-400">
              <Zap className="w-5 h-5" />
              <h3 className="font-bold uppercase text-xs mono">Layer 1: Challenge Engine</h3>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Generates unpredictable, time-gated visual challenges. This forces the user to interact with the environment in real-time, defeating "pre-rendered" deepfake streams.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-purple-400">
              <Cpu className="w-5 h-5" />
              <h3 className="font-bold uppercase text-xs mono">Layer 2: CV Tracking</h3>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Utilizes MediaPipe Face Mesh for sub-pixel landmark tracking. Analyzes Eye Aspect Ratio (EAR) for involuntary blinks and head pose estimation.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-emerald-400">
              <ShieldAlert className="w-5 h-5" />
              <h3 className="font-bold uppercase text-xs mono">Layer 3: Sentiment Audit</h3>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Gemini 3 Pro analysis of "Intent Verification." High-res deepfakes often show "synthetic rigidity" when reacting to unexpected instructions.
            </p>
          </div>
        </div>
      </section>

      {/* Deployment & Git Section */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-8">
        <div className="flex items-center gap-3">
          <GitBranch className="w-8 h-8 text-orange-500" />
          <h2 className="text-xl font-bold text-white">Version Control & Deployment</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mono">Git Strategy</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              We utilize a <strong>Feature-Branch Workflow</strong>. No code is merged into <code className="text-orange-400">main</code> without a peer security review and automated liveness regression testing.
            </p>
            <div className="bg-black/50 p-4 rounded-xl border border-zinc-800 mono text-[11px] text-zinc-400 space-y-2">
              <p className="text-emerald-500"># Start a new security feature</p>
              <p>git checkout -b feat/chroma-flash-v2</p>
              <p className="text-emerald-500"># Securely commit changes</p>
              <p>git add . && git commit -m "security: Add sub-dermal scattering check"</p>
              <p className="text-emerald-500"># Push to remote audit pipeline</p>
              <p>git push origin feat/chroma-flash-v2</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mono">GitHub CI/CD Pipeline</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-zinc-800 rounded-lg"><Github className="w-5 h-5" /></div>
                <div>
                  <h4 className="text-sm font-bold">GitHub Actions</h4>
                  <p className="text-xs text-zinc-500">Automated scanning for API key leaks and vulnerable dependencies.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2 bg-zinc-800 rounded-lg"><Globe className="w-5 h-5" /></div>
                <div>
                  <h4 className="text-sm font-bold">Production Hosting</h4>
                  <p className="text-xs text-zinc-500">Deployed via Vercel or AWS with high-availability WAF (Web Application Firewall).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explainer on Injection Attacks */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-8 space-y-6">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-red-500" />
            <h2 className="text-xl font-bold text-red-500">Mitigating Injection Attacks</h2>
          </div>
          <div className="prose prose-invert prose-sm max-w-none text-zinc-400 space-y-4">
            <p>
              <strong>The Threat:</strong> Attackers use "Virtual Webcams" to feed deepfake video directly into <code>getUserMedia</code>, bypassing physical presence.
            </p>
            <p className="font-semibold text-zinc-300">Our Countermeasures:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="text-zinc-200">Temporal Jitter Analysis:</span> Real CMOS sensors have chaotic latency patterns; synthetic streams are too perfect.</li>
              <li><span className="text-zinc-200">Dynamic Challenge-Response:</span> Measures the "Millisecond Response Gap" between challenge and movement.</li>
              <li><span className="text-zinc-200">Chroma-Flash:</span> Real-time lighting verification on skin surfaces.</li>
            </ul>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-6">
          <div className="flex items-center gap-3">
            <Network className="w-8 h-8 text-blue-500" />
            <h2 className="text-xl font-bold text-white">Web3 Access Flow</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold shrink-0">1</div>
              <p className="text-sm text-zinc-400">User completes MFPL sequence successfully on "The Vault" frontend.</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold shrink-0">2</div>
              <p className="text-sm text-zinc-400">Backend validation confirms ZK-proof of liveness.</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold shrink-0">3</div>
              <p className="text-sm text-zinc-400">Smart Contract (Polygon/Base) mints a Soulbound Token (SBT).</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold shrink-0">4</div>
              <p className="text-sm text-zinc-100 font-semibold">Asset gateway detects the token and unlocks the high-value vault.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Code Snippet */}
      <section className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Code className="w-6 h-6 text-zinc-500" />
            <h2 className="text-lg font-bold text-white">Liveness Verification (FastAPI Backend Logic)</h2>
          </div>
          <span className="text-xs mono bg-zinc-800 px-2 py-1 rounded text-zinc-500">Python 3.10+</span>
        </div>
        <pre className="bg-black/50 p-6 rounded-xl overflow-x-auto mono text-xs text-blue-400 leading-relaxed border border-zinc-800">
{`from fastapi import FastAPI, UploadFile
from mediapipe.python.solutions import face_mesh

app = FastAPI()

def verify_intent(landmarks, challenge_type):
    # Logic to check coordinate deltas
    # e.g., if challenge_type == 'LOOK_LEFT':
    # verify nose tip x-coord shift > threshold
    return True

@app.post("/verify")
async def process_verification(file: UploadFile, challenge_id: str):
    image_data = await file.read()
    # Perform deeper CV analysis
    # ...
    return {"status": "success", "token": "SBT_MINT_AUTH_772"}
`}
        </pre>
      </section>
    </div>
  );
};

export default TechnicalBlueprint;
