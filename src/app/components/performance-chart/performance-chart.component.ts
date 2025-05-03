import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-performance-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './performance-chart.component.html',
  styleUrls: ['./performance-chart.component.css']
})
export class PerformanceChartComponent {
  @Input() stats: any[] = [];

  chartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Average Watts',
        borderColor: '#ffcc00',
        fill: false
      },
      {
        data: [],
        label: 'Max Watts',
        borderColor: '#ff6384',
        fill: false
      }
    ]
  };

  chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  ngOnChanges() {
    if (this.stats.length > 0) {
      this.chartData = {
        labels: this.stats.map(stat => stat.date.toLocaleDateString()),
        datasets: [
          {
            data: this.stats.map(stat => stat.averageWatts),
            label: 'Average Watts',
            borderColor: '#ffcc00',
            fill: false
          },
          {
            data: this.stats.map(stat => stat.maxWatts),
            label: 'Max Watts',
            borderColor: '#ff6384',
            fill: false
          }
        ]
      };
    }
  }
} 