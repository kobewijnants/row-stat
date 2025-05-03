import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsOverviewComponent } from './components/stats-overview/stats-overview.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, StatsOverviewComponent],
  template: `
    <div class="app-container">
      <header>
        <h1>Rowing Statistics</h1>
      </header>
      <main>
        <app-stats-overview></app-stats-overview>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: #f5f5f5;
    }
    header {
      background: #333;
      color: white;
      padding: 20px;
      text-align: center;
    }
    main {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
  `]
})
export class AppComponent {}
