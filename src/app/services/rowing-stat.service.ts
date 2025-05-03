import { Injectable } from '@angular/core';
import { RowingStat } from '../models/rowing-stat.model';
import * as Papa from 'papaparse';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

interface CSVRow {
  date: string;
  time: string;
  distance: string;
  calories: string;
  averageWatts: string;
  strokesPerMinute: string;
  splitTime: string;
  maxWatts: string;
  maxStrokesPerMinute: string;
  maxSplitTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class RowingStatService {
  private statsSubject = new BehaviorSubject<RowingStat[]>([]);
  stats$ = this.statsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadStats();
  }

  private loadStats(): void {
    this.http.get('rowing_stats.csv', { responseType: 'text' })
      .subscribe({
        next: (data) => {
          Papa.parse<CSVRow>(data, {
            header: true,
            complete: (results) => {
              const processedStats = results.data.map((row: CSVRow) => ({
                date: new Date(row.date),
                time: row.time,
                distance: Number(row.distance),
                calories: Number(row.calories),
                averageWatts: Number(row.averageWatts),
                strokesPerMinute: Number(row.strokesPerMinute),
                splitTime: row.splitTime,
                maxWatts: Number(row.maxWatts),
                maxStrokesPerMinute: Number(row.maxStrokesPerMinute),
                maxSplitTime: row.maxSplitTime
              }));
              this.statsSubject.next(processedStats);
            },
            error: (error: Error) => {
              console.error('Error parsing CSV:', error);
            }
          });
        },
        error: (error: Error) => {
          console.error('Error loading CSV:', error);
        }
      });
  }

  getStats(): Observable<RowingStat[]> {
    return this.stats$;
  }

  addStat(stat: RowingStat): void {
    this.statsSubject.next([...this.statsSubject.getValue(), stat]);
  }

  importFromCSV(csvData: string): void {
    Papa.parse<CSVRow>(csvData, {
      header: true,
      complete: (results) => {
        const newStats = results.data.map((row: CSVRow) => ({
          date: new Date(row.date),
          time: row.time,
          distance: Number(row.distance),
          calories: Number(row.calories),
          averageWatts: Number(row.averageWatts),
          strokesPerMinute: Number(row.strokesPerMinute),
          splitTime: row.splitTime,
          maxWatts: Number(row.maxWatts),
          maxStrokesPerMinute: Number(row.maxStrokesPerMinute),
          maxSplitTime: row.maxSplitTime
        }));
        this.statsSubject.next([...this.statsSubject.getValue(), ...newStats]);
      }
    });
  }

  exportToCSV(): string {
    return Papa.unparse(this.statsSubject.getValue());
  }

  clearStats(): void {
    this.statsSubject.next([]);
  }
} 