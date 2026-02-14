
import { ChallengeType, Challenge } from './types';

export const SYSTEM_CONFIG = {
  FPS: 30,
  CONFIDENCE_THRESHOLD: 0.85,
  BLINK_THRESHOLD: 0.25,
  GEMINI_MODEL: 'gemini-3-flash-preview',
};

export const CHALLENGE_BANK: Challenge[] = [
  { id: '1', type: ChallengeType.LOOK_LEFT, description: 'Look toward your left shoulder', isCompleted: false },
  { id: '2', type: ChallengeType.LOOK_RIGHT, description: 'Look toward your right shoulder', isCompleted: false },
  { id: '3', type: ChallengeType.BLINK_TWICE, description: 'Blink your eyes twice quickly', isCompleted: false },
  { id: '4', type: ChallengeType.SMILE, description: 'Give a wide, natural smile', isCompleted: false },
  { id: '5', type: ChallengeType.NOD_HEAD, description: 'Nod your head up and down', isCompleted: false },
];
