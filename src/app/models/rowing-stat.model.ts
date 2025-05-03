export interface RowingStat {
  date: Date;
  time: string; // Format: HH:MM:SS
  distance: number; // meters
  calories: number; // Kcal
  averageWatts: number; // Watts
  strokesPerMinute: number; // SPM
  splitTime: string; // 500m time in format HH:MM:SS
  maxWatts: number; // Watts
  maxStrokesPerMinute: number; // SPM
  maxSplitTime: string; // 500m time in format HH:MM:SS
} 