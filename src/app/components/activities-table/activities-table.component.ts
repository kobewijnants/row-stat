import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activities-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activities-table.component.html',
  styleUrls: ['./activities-table.component.css']
})
export class ActivitiesTableComponent {
  @Input() stats: any[] = [];

  get sortedStats() {
    return [...this.stats].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
} 