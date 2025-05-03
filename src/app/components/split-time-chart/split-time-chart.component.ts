import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-split-time-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './split-time-chart.component.html',
  styleUrls: ['./split-time-chart.component.css']
})
export class SplitTimeChartComponent {
  @Input() stats: any[] = [];

  chartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Average Split',
        borderColor: '#4bc0c0',
        fill: false
      },
      {
        data: [],
        label: 'Max Split',
        borderColor: '#ff6384',
        fill: false
      }
    ]
  };

  chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        reverse: true // Lower times are better in rowing
      }
    }
  };

  ngOnChanges() {
    if (this.stats.length > 0) {
      this.chartData = {
        labels: this.stats.map(stat => stat.date.toLocaleDateString()),
        datasets: [
          {
            data: this.stats.map(stat => this.convertSplitToSeconds(stat.splitTime)),
            label: 'Average Split',
            borderColor: '#4bc0c0',
            fill: false
          },
          {
            data: this.stats.map(stat => this.convertSplitToSeconds(stat.maxSplitTime)),
            label: 'Max Split',
            borderColor: '#ff6384',
            fill: false
          }
        ]
      };
    }
  }

  private convertSplitToSeconds(splitTime: string): number {
    if (!splitTime) return 0;
    const [minutes, seconds] = splitTime.split(':').map(Number);
    return minutes * 60 + seconds;
  }
} 