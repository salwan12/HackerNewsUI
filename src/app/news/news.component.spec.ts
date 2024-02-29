import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsComponent } from './news.component';
import { DataService } from '../services/data.service';
import { LoaderService } from '../services/loader.service';
import { of, throwError } from 'rxjs';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;
  let dataServiceSpy: jasmine.SpyObj<DataService>;
  let loaderServiceSpy: jasmine.SpyObj<LoaderService>;

  beforeEach(() => {
    const dataServiceMock = jasmine.createSpyObj('DataService', [
      'getApiData',
      'setData',
    ]);
    const loaderServiceMock = jasmine.createSpyObj('LoaderService', [
      'showLoader',
      'hideLoader',
    ]);

    TestBed.configureTestingModule({
      declarations: [NewsComponent],
      providers: [
        { provide: DataService, useValue: dataServiceMock },
        { provide: LoaderService, useValue: loaderServiceMock },
      ],
    });

    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    dataServiceSpy = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
    loaderServiceSpy = TestBed.inject(
      LoaderService
    ) as jasmine.SpyObj<LoaderService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component properties on ngOnInit', () => {
    const mockData = [{ country: 'USA' }, { country: 'Canada' }];
    dataServiceSpy.getApiData.and.returnValue(of(mockData));

    component.ngOnInit();

    expect(component.isLoading).toBe(false);
    expect(component.news).toEqual(mockData);
    expect(dataServiceSpy.setData).toHaveBeenCalledWith(mockData);
    expect(loaderServiceSpy.hideLoader).toHaveBeenCalled();
  });
});
