import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-calories-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './calories-chart.component.html',
  styleUrls: ['./calories-chart.component.css']
})
export class CaloriesChartComponent {
  @Input() stats: any[] = [];

  chartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Calories',
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
            data: this.stats.map(stat => stat.calories),
            label: 'Calories',
            borderColor: '#ff6384',
            fill: false
          }
        ]
      };
    }
  }
} 