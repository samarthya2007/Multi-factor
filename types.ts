
export enum ChallengeType {
  LOOK_LEFT = 'LOOK_LEFT',
  LOOK_RIGHT = 'LOOK_RIGHT',
  BLINK_TWICE = 'BLINK_TWICE',
  SMILE = 'SMILE',
  NOD_HEAD = 'NOD_HEAD'
}

export enum VerificationStatus {
  COLLECTING_DATA = 'COLLECTING_DATA',
  IDLE = 'IDLE',
  SCANNING = 'SCANNING',
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED'
}

export interface UserIdentity {
  fullName: string;
  walletAddress: string;
}

export interface Challenge {
  id: string;
  type: ChallengeType;
  description: string;
  isCompleted: boolean;
}

export interface LandmarkResult {
  faceLandmarks: any[];
}

export interface VerificationResult {
  isReal: boolean;
  confidence: number;
  sentiment: string;
  reasoning: string;
}
