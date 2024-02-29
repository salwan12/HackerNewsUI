import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { News } from '../model/news.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private data = new BehaviorSubject<any[]>([]);
  private apiUrl = 'https://localhost:7130/api/HackerNews/newest';

  constructor(private http: HttpClient) {}

  setData(newData: any[]) {
    this.data.next(newData);
  }

  getApiData(): Observable<any[]> {
    return this.http.get<News[]>(this.apiUrl);
  }

  getData() {
    return this.data.asObservable();
  }
}
