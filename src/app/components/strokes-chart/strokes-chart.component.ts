import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-strokes-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './strokes-chart.component.html',
  styleUrls: ['./strokes-chart.component.css']
})
export class StrokesChartComponent {
  @Input() stats: any[] = [];

  chartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Average SPM',
        borderColor: '#36a2eb',
        fill: false
      },
      {
        data: [],
        label: 'Max SPM',
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
            data: this.stats.map(stat => stat.strokesPerMinute),
            label: 'Average SPM',
            borderColor: '#36a2eb',
            fill: false
          },
          {
            data: this.stats.map(stat => stat.maxStrokesPerMinute),
            label: 'Max SPM',
            borderColor: '#ff6384',
            fill: false
          }
        ]
      };
    }
  }
} 