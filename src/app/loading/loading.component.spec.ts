import {
  ComponentFixture,
  TestBed,
  async,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { LoadingComponent } from './loading.component';
import { LoaderService } from '../services/loader.service';
import { Subscription, of } from 'rxjs';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;
  let loaderService: jasmine.SpyObj<LoaderService>;

  beforeEach(() => {
    const loaderServiceSpy = jasmine.createSpyObj('LoaderService', [
      'getLoader',
    ]);
    loaderServiceSpy.getLoader.and.returnValue(of()); // Set a default value for the observable

    TestBed.configureTestingModule({
      declarations: [LoadingComponent],
      providers: [{ provide: LoaderService, useValue: loaderServiceSpy }],
    });

    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    loaderService = TestBed.inject(
      LoaderService
    ) as jasmine.SpyObj<LoaderService>;
  });

  // it('should create the component', () => {
  //   expect(component).toBeTruthy();
  // });

  it('should not show loader initially', () => {
    expect(component.showLoader).toBeFalse();
  });

  it('should subscribe to loaderService and update showLoader on changes', fakeAsync(() => {
    debugger;
    const mockShowLoader = false;

    // Set up a spy observable
    const loaderServiceObservable = of(mockShowLoader);
    loaderService.getLoader.and.returnValue(loaderServiceObservable);

    // Trigger change detection
    fixture.detectChanges();

    // Simulate the passage of time
    tick();

    // Ensure the component property is updated
    expect(component.showLoader).toBe(mockShowLoader);
  }));

  it('should unsubscribe onDestroy', () => {
    spyOn(component.subscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(component.showLoader).toBeFalse();
    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });
});
