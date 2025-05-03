import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sum',
  standalone: true
})
export class SumPipe implements PipeTransform {
  transform(items: any[], property: string): number | string {
    if (!items || !property) return 0;
    
    if (property === 'time') {
      const totalSeconds = items.reduce((sum, item) => {
        const value = item[property];
        if (typeof value === 'string') {
          const parts = value.split(':');
          if (parts.length === 3) {
            // HH:MM:SS format
            const [hours, minutes, seconds] = parts.map(Number);
            return sum + (hours * 3600 + minutes * 60 + seconds);
          } else if (parts.length === 2) {
            // MM:SS format
            const [minutes, seconds] = parts.map(Number);
            return sum + (minutes * 60 + seconds);
          }
        }
        return sum + (Number(value) || 0);
      }, 0);

      // Convert total seconds to HH:MM:SS format
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    return items.reduce((sum, item) => sum + (Number(item[property]) || 0), 0);
  }
} 