import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type TimeFrame = 'all' | 'year' | '6months' | 'month' | 'week';

@Component({
  selector: 'app-time-frame-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './time-frame-selector.component.html',
  styleUrls: ['./time-frame-selector.component.css']
})
export class TimeFrameSelectorComponent {
  @Output() timeFrameChange = new EventEmitter<TimeFrame>();
  
  selectedTimeFrame: TimeFrame = 'all';
  timeFrames = [
    { value: 'all', label: 'All Time' },
    { value: 'year', label: '1 Year' },
    { value: '6months', label: '6 Months' },
    { value: 'month', label: '1 Month' },
    { value: 'week', label: '1 Week' }
  ];

  onTimeFrameChange() {
    this.timeFrameChange.emit(this.selectedTimeFrame);
  }
} 