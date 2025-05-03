import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface FilterOptions {
  timeFrame: 'all' | 'year' | '6months' | 'month' | 'week';
  distance: {
    min: number | null;
    max: number | null;
  };
  calories: {
    min: number | null;
    max: number | null;
  };
  averageWatts: {
    min: number | null;
    max: number | null;
  };
  maxWatts: {
    min: number | null;
    max: number | null;
  };
  averageSPM: {
    min: number | null;
    max: number | null;
  };
  maxSPM: {
    min: number | null;
    max: number | null;
  };
  averageSplit: {
    min: string | null;
    max: string | null;
  };
  maxSplit: {
    min: string | null;
    max: string | null;
  };
}

@Component({
  selector: 'app-stats-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stats-filter.component.html',
  styleUrls: ['./stats-filter.component.css']
})
export class StatsFilterComponent {
  @Output() filterChange = new EventEmitter<FilterOptions>();
  isExpanded = false;
  
  timeFrames = [
    { value: 'all', label: 'All Time' },
    { value: 'year', label: 'Last Year' },
    { value: '6months', label: 'Last 6 Months' },
    { value: 'month', label: 'Last Month' },
    { value: 'week', label: 'Last Week' }
  ];

  filterOptions: FilterOptions = {
    timeFrame: 'all',
    distance: { min: null, max: null },
    calories: { min: null, max: null },
    averageWatts: { min: null, max: null },
    maxWatts: { min: null, max: null },
    averageSPM: { min: null, max: null },
    maxSPM: { min: null, max: null },
    averageSplit: { min: null, max: null },
    maxSplit: { min: null, max: null }
  };

  toggleFilters() {
    this.isExpanded = !this.isExpanded;
  }

  onFilterChange() {
    this.filterChange.emit(this.filterOptions);
  }

  clearFilters() {
    this.filterOptions = {
      timeFrame: 'all',
      distance: { min: null, max: null },
      calories: { min: null, max: null },
      averageWatts: { min: null, max: null },
      maxWatts: { min: null, max: null },
      averageSPM: { min: null, max: null },
      maxSPM: { min: null, max: null },
      averageSplit: { min: null, max: null },
      maxSplit: { min: null, max: null }
    };
    this.onFilterChange();
  }
} 