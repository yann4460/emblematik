import { CommonModule, NgStyle } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface Level {
  level: number;
  programs: Programm[];
}

interface Programm {
  name: string;
  lots: Lot[];
}

interface Lot {
  number: number;
  description: string;
  program: string;
  level: number;
  isReserved: boolean;
}


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'emblematik';
  programs: Programm[] = [];
  totalCount: number = 0;
  reservedCount: number = 0;
  availableCount: number = 0;
  lots: Lot[] = [];
  levels: Level[] = [];
  loading: boolean = true;
  percentage: Record<string, string> = {};
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.http.get<Level[]>('https://emblematik.azurewebsites.net/api/GetData?code=1eR1wLNuTpIx6j-X8fPHMQ48MJuxO_mpIhu7xwYbGiD3AzFuS0SHnQ%3D%3D').subscribe(data => {
      this.levels = data;
      this.lots = data.flatMap(a => a.programs.flatMap(p => p.lots));
      this.totalCount = this.lots.length;
      this.reservedCount = this.lots.filter(x => x.isReserved).length;
      this.availableCount = this.lots.filter(x => !x.isReserved).length
      this.loading = false;
      const percentageValue = this.reservedCount / this.totalCount * 100;
      this.percentage = { 'width': percentageValue + '%' }
    });
  }
}

