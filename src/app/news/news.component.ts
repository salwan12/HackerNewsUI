import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  isLoading = false;
  news: any[] = [];
  constructor(
    private dataService: DataService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.loaderService.showLoader();

    this.dataService.getApiData().subscribe(
      (data) => {
        this.news = data;
        this.dataService.setData(data);
        this.isLoading = false;
        this.loaderService.hideLoader();
      },
      (error) => {
        this.isLoading = false;
        this.loaderService.hideLoader();
        console.error('Error fetching data:', error);
      }
    );
  }
}
