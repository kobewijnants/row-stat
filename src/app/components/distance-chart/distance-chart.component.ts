import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-distance-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './distance-chart.component.html',
  styleUrls: ['./distance-chart.component.css']
})
export class DistanceChartComponent {
  @Input() stats: any[] = [];

  chartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Distance (m)',
        borderColor: '#3cba9f',
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
            data: this.stats.map(stat => stat.distance),
            label: 'Distance (m)',
            borderColor: '#3cba9f',
            fill: false
          }
        ]
      };
    }
  }
} 