import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats-summary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="summary-container">
      <h2>Rowing Statistics Summary</h2>
      <div class="stats-grid">
        <div class="stat-card">
          <h4>Total Distance</h4>
          <p>{{ totalDistance }}m</p>
        </div>
        <div class="stat-card">
          <h4>Total Calories</h4>
          <p>{{ totalCalories }} kcal</p>
        </div>
        <div class="stat-card">
          <h4>Average Watts</h4>
          <p>{{ averageWatts }}W</p>
        </div>
        <div class="stat-card">
          <h4>Average SPM</h4>
          <p>{{ averageSPM }}</p>
        </div>
        <div class="stat-card">
          <h4>Best Distance</h4>
          <p>{{ bestDistance }}m</p>
        </div>
        <div class="stat-card">
          <h4>Best Watts</h4>
          <p>{{ bestWatts }}W</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .summary-container {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-bottom: 20px;
    }
    h2 {
      margin-bottom: 20px;
      color: #333;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
    }
    .stat-card {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 6px;
      text-align: center;
    }
    h4 {
      margin: 0 0 10px 0;
      color: #666;
    }
    p {
      margin: 0;
      font-size: 1.5em;
      font-weight: bold;
      color: #333;
    }
  `]
})
export class StatsSummaryComponent {
  @Input() stats: any[] = [];

  get totalDistance(): number {
    return this.stats.reduce((sum, stat) => sum + stat.distance, 0);
  }

  get totalCalories(): number {
    return this.stats.reduce((sum, stat) => sum + stat.calories, 0);
  }

  get averageWatts(): number {
    return this.stats.length > 0
      ? Math.round(this.stats.reduce((sum, stat) => sum + stat.averageWatts, 0) / this.stats.length)
      : 0;
  }

  get averageSPM(): number {
    return this.stats.length > 0
      ? Math.round(this.stats.reduce((sum, stat) => sum + stat.strokesPerMinute, 0) / this.stats.length)
      : 0;
  }

  get bestDistance(): number {
    return Math.max(...this.stats.map(stat => stat.distance));
  }

  get bestWatts(): number {
    return Math.max(...this.stats.map(stat => stat.maxWatts));
  }
} 