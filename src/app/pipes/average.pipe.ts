import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'average',
  standalone: true
})
export class AveragePipe implements PipeTransform {
  transform(items: any[], property: string): number {
    if (!items || !property || items.length === 0) return 0;
    const sum = items.reduce((sum, item) => sum + (item[property] || 0), 0);
    return sum / items.length;
  }
} 