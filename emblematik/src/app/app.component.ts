import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';


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
  data$: Observable<Lot[]>;
  constructor(private http: HttpClient) {
    this.data$ = this.http.get<Lot[]>(`https://emblematik.azurewebsites.net/api/GetData?code=1eR1wLNuTpIx6j-X8fPHMQ48MJuxO_mpIhu7xwYbGiD3AzFuS0SHnQ%3D%3D`, {
    });
  }

  ngOnInit() {
  }

  load() {
    this.http.get<Lot[]>('https://emblematik.azurewebsites.net/api/GetData?code=1eR1wLNuTpIx6j-X8fPHMQ48MJuxO_mpIhu7xwYbGiD3AzFuS0SHnQ%3D%3D').subscribe(data => {
      const total = data.length;
      const reserved = data.filter(x => x.isReserved).length;

    });
  }
}

