import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'averageSplit',
  standalone: true
})
export class AverageSplitPipe implements PipeTransform {
  transform(items: any[]): string {
    if (!items || items.length === 0) return '0:00';
    const totalSeconds = items.reduce((sum, item) => {
      const [minutes, seconds] = (item.splitTime || '0:00').split(':').map(Number);
      return sum + (minutes * 60 + seconds);
    }, 0);
    const averageSeconds = Math.round(totalSeconds / items.length);
    const minutes = Math.floor(averageSeconds / 60);
    const seconds = averageSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}

@Pipe({
  name: 'maxSplit',
  standalone: true
})
export class MaxSplitPipe implements PipeTransform {
  transform(items: any[]): string {
    if (!items || items.length === 0) return '0:00';
    
    // Convert all split times to seconds and find the minimum (fastest) one
    const fastestSplit = items.reduce((min, item) => {
      const currentSplit = this.convertSplitToSeconds(item.maxSplitTime);
      return currentSplit < min ? currentSplit : min;
    }, Infinity);

    // Convert back to MM:SS format
    const minutes = Math.floor(fastestSplit / 60);
    const seconds = fastestSplit % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  private convertSplitToSeconds(splitTime: string): number {
    if (!splitTime) return Infinity;
    const [minutes, seconds] = splitTime.split(':').map(Number);
    return minutes * 60 + seconds;
  }
} 