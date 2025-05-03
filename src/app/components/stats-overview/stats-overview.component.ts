import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RowingStatService } from '../../services/rowing-stat.service';
import { Subscription } from 'rxjs';
import { StatsFilterComponent } from '../stats-filter/stats-filter.component';
import { CaloriesChartComponent } from '../calories-chart/calories-chart.component';
import { PerformanceChartComponent } from '../performance-chart/performance-chart.component';
import { StrokesChartComponent } from '../strokes-chart/strokes-chart.component';
import { SplitTimeChartComponent } from '../split-time-chart/split-time-chart.component';
import { DistanceChartComponent } from '../distance-chart/distance-chart.component';
import { RowingStat } from '../../models/rowing-stat.model';
import { SumPipe } from '../../pipes/sum.pipe';
import { AveragePipe } from '../../pipes/average.pipe';
import { MaxPipe } from '../../pipes/max.pipe';
import { AverageSplitPipe, MaxSplitPipe } from '../../pipes/split-time.pipe';
import { ChartModalComponent } from '../chart-modal/chart-modal.component';
import { FilterOptions } from '../stats-filter/stats-filter.component';

@Component({
  selector: 'app-stats-overview',
  standalone: true,
  imports: [
    CommonModule,
    StatsFilterComponent,
    CaloriesChartComponent,
    PerformanceChartComponent,
    StrokesChartComponent,
    SplitTimeChartComponent,
    DistanceChartComponent,
    SumPipe,
    AveragePipe,
    MaxPipe,
    AverageSplitPipe,
    MaxSplitPipe,
    ChartModalComponent
  ],
  templateUrl: './stats-overview.component.html',
  styleUrls: ['./stats-overview.component.css']
})
export class StatsOverviewComponent implements OnInit, OnDestroy {
  stats: RowingStat[] = [];
  filteredStats: RowingStat[] = [];
  private subscription: Subscription = new Subscription();
  showModal = false;
  modalChart: string = '';

  // Pagination properties
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 1;
  Math = Math;

  constructor(
    private rowingStatService: RowingStatService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscription = this.rowingStatService.getStats().subscribe({
      next: (stats) => {
        // Validate and filter out invalid dates
        this.stats = stats
          .map(stat => {
            const date = new Date(stat.date);
            if (isNaN(date.getTime())) {
              console.warn(`Invalid date found: ${stat.date}`);
              return null;
            }
            return {
              ...stat,
              date: date
            };
          })
          .filter(stat => stat !== null) as RowingStat[];
        
        // Sort stats by date in descending order (most recent first)
        this.stats.sort((a, b) => b.date.getTime() - a.date.getTime());
        
        this.filteredStats = [...this.stats];
        this.updateTotalPages();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading stats:', error);
      }
    });
  }

  onFilterChange(filterOptions: FilterOptions) {
    this.filteredStats = this.stats.filter(stat => {
      // Time frame filter
      const statDate = new Date(stat.date);
      const now = new Date();
      const timeFrame = filterOptions.timeFrame;
      
      if (timeFrame !== 'all') {
        const timeFrameMap = {
          'year': 365 * 24 * 60 * 60 * 1000,
          '6months': 180 * 24 * 60 * 60 * 1000,
          'month': 30 * 24 * 60 * 60 * 1000,
          'week': 7 * 24 * 60 * 60 * 1000
        };
        
        const timeFrameMs = timeFrameMap[timeFrame];
        if (now.getTime() - statDate.getTime() > timeFrameMs) {
          return false;
        }
      }

      // Distance filter
      if (filterOptions.distance.min !== null && stat.distance < filterOptions.distance.min) return false;
      if (filterOptions.distance.max !== null && stat.distance > filterOptions.distance.max) return false;

      // Calories filter
      if (filterOptions.calories.min !== null && stat.calories < filterOptions.calories.min) return false;
      if (filterOptions.calories.max !== null && stat.calories > filterOptions.calories.max) return false;

      // Average watts filter
      if (filterOptions.averageWatts.min !== null && stat.averageWatts < filterOptions.averageWatts.min) return false;
      if (filterOptions.averageWatts.max !== null && stat.averageWatts > filterOptions.averageWatts.max) return false;

      // Max watts filter
      if (filterOptions.maxWatts.min !== null && stat.maxWatts < filterOptions.maxWatts.min) return false;
      if (filterOptions.maxWatts.max !== null && stat.maxWatts > filterOptions.maxWatts.max) return false;

      // Average SPM filter
      if (filterOptions.averageSPM.min !== null && stat.strokesPerMinute < filterOptions.averageSPM.min) return false;
      if (filterOptions.averageSPM.max !== null && stat.strokesPerMinute > filterOptions.averageSPM.max) return false;

      // Max SPM filter
      if (filterOptions.maxSPM.min !== null && stat.maxStrokesPerMinute < filterOptions.maxSPM.min) return false;
      if (filterOptions.maxSPM.max !== null && stat.maxStrokesPerMinute > filterOptions.maxSPM.max) return false;

      // Average split filter
      if (filterOptions.averageSplit.min !== null) {
        const minSplitSeconds = this.convertSplitToSeconds(filterOptions.averageSplit.min);
        const statSplitSeconds = this.convertSplitToSeconds(stat.splitTime);
        if (statSplitSeconds < minSplitSeconds) return false;
      }
      if (filterOptions.averageSplit.max !== null) {
        const maxSplitSeconds = this.convertSplitToSeconds(filterOptions.averageSplit.max);
        const statSplitSeconds = this.convertSplitToSeconds(stat.splitTime);
        if (statSplitSeconds > maxSplitSeconds) return false;
      }

      // Max split filter
      if (filterOptions.maxSplit.min !== null) {
        const minSplitSeconds = this.convertSplitToSeconds(filterOptions.maxSplit.min);
        const statSplitSeconds = this.convertSplitToSeconds(stat.maxSplitTime);
        if (statSplitSeconds < minSplitSeconds) return false;
      }
      if (filterOptions.maxSplit.max !== null) {
        const maxSplitSeconds = this.convertSplitToSeconds(filterOptions.maxSplit.max);
        const statSplitSeconds = this.convertSplitToSeconds(stat.maxSplitTime);
        if (statSplitSeconds > maxSplitSeconds) return false;
      }

      return true;
    });
    this.updateTotalPages();
    this.currentPage = 1;
    this.cdr.detectChanges();
  }

  private convertSplitToSeconds(split: string): number {
    if (!split) return 0;
    const [minutes, seconds] = split.split(':').map(Number);
    return minutes * 60 + seconds;
  }

  // Pagination methods
  updateTotalPages() {
    this.totalPages = Math.ceil(this.filteredStats.length / this.itemsPerPage);
  }

  getPaginatedStats(): RowingStat[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredStats.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  openModal(chartType: string) {
    this.modalChart = chartType;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.modalChart = '';
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
} 