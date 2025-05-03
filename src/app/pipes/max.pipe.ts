import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'max',
  standalone: true
})
export class MaxPipe implements PipeTransform {
  transform(items: any[], property: string): number {
    if (!items || !property || items.length === 0) return 0;
    return Math.max(...items.map(item => item[property] || 0));
  }
} 