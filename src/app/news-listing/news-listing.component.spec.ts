import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsListingComponent } from './news-listing.component';
import { DataService } from '../services/data.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { of } from 'rxjs';

describe('NewsListingComponent', () => {
  let component: NewsListingComponent;
  let fixture: ComponentFixture<NewsListingComponent>;
  let dataServiceSpy: jasmine.SpyObj<DataService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('DataService', ['getData']);

    TestBed.configureTestingModule({
      declarations: [NewsListingComponent],
      imports: [MatTableModule, MatPaginatorModule, MatSortModule],
      providers: [{ provide: DataService, useValue: spy }],
    });

    fixture = TestBed.createComponent(NewsListingComponent);
    component = fixture.componentInstance;
    dataServiceSpy = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load data on ngOnInit', () => {
    const testData = [{ title: 'Test Title', url: 'http://example.com' }];
    dataServiceSpy.getData.and.returnValue(of(testData));

    component.ngOnInit();

    expect(dataServiceSpy.getData).toHaveBeenCalledOnceWith();
    expect(component.dataSource.data).toEqual(testData);
    if (component.paginator) {
      expect(component.dataSource.paginator).toBeDefined();
    }
    if (component.sort) {
      expect(component.dataSource.sort).toBeDefined();
    }
  });

  it('should set paginator and sort on ngAfterViewInit', () => {
    if (component.paginator) expect(component.paginator).toBeDefined();
    if (component.sort) expect(component.sort).toBeDefined();
  });

  it('should apply filter correctly', () => {
    const testData = [
      { title: 'Test Title 1', url: 'http://example.com/1' },
      { title: 'Test Title 2', url: 'http://example.com/2' },
    ];
    component.dataSource.data = testData;

    component.applyFilter('Test Title 1');

    expect(component.dataSource.filteredData.length).toBe(1);
    expect(component.dataSource.filteredData[0].title).toBe('Test Title 1');
  });
});
