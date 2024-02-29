import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent implements OnDestroy {
  showLoader = false;
  public subscription: Subscription;

  constructor(private loaderService: LoaderService) {
    this.subscription = this.loaderService
      .getLoader()
      .subscribe((showLoader) => {
        this.showLoader = showLoader;
      });
  }

  ngOnDestroy(): void {
    this.showLoader = false;
    this.subscription.unsubscribe();
  }
}
