import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FetchDataService } from './fetch-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { WeatherForecast } from './fetch-data.models';
import { FetchDataComponent } from './fetch-data.component';
import { delay } from 'rxjs/internal/operators';

const mockWeatherResults = [{ "id": "1", "date": "2021-05-27 10:34:09 AM", "temperatureC": -16, "temperatureF": 4, "summary": "Cold" }, { "id": "2", "date": "2021-05-28 8:34:09 AM", "temperatureC": 53, "temperatureF": 127, "summary": "Hot" }, { "id": "3", "date": "2021-05-29 6:34:09 PM", "temperatureC": 50, "temperatureF": 121, "summary": "Balmy" }, { "id": "4", "date": "2021-05-30 4:34:09 PM", "temperatureC": 41, "temperatureF": 105, "summary": "Chilly" }, { "id": "5", "date": "2021-05-31 10:50:09 AM", "temperatureC": -8, "temperatureF": 18, "summary": "Warm" }];
let serviceResponseDelayTime = 0;
class MockFetchDataService extends FetchDataService {
    getWeatherReport(): Observable<WeatherForecast[]> {
        if (serviceResponseDelayTime === 0) {
            return of(mockWeatherResults);
        }
        return of(mockWeatherResults).pipe(delay(serviceResponseDelayTime));
    }
}

describe('Fetch Data Component', () => {
    let component: FetchDataComponent;
    let fixture: ComponentFixture<FetchDataComponent>;
    beforeEach(() => {
        serviceResponseDelayTime = 0;
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [FetchDataComponent],
            providers: [
                { provide: FetchDataService, useClass: MockFetchDataService },
                { provide: 'BASE_URL', useValue: 'http://mockUrl/' }]
        }).compileComponents();
        fixture = TestBed.createComponent(FetchDataComponent);
        component = fixture.componentInstance;
    });

    it('component should be defined', () => {
        expect(component).toBeDefined();
    });

    it('expects to show loading before getting data', () => {
        fixture.detectChanges();
        serviceResponseDelayTime = 1000;
        const html = fixture.debugElement.nativeElement;
        expect(html).toBeDefined();
        const loading = html.getElementsByClassName('loading');
        expect(loading).toBeDefined();
        expect(loading.length).toBe(0);
    });

    it('expects component to get data on initialization', () => {
        expect(component.forecasts).toBeUndefined();
        fixture.detectChanges();
        expect(component.forecasts).toBe(mockWeatherResults);
    });

    it('expects to show a table with data', () => {
        expect(component.forecasts).toBeUndefined();
        fixture.detectChanges();
        expect(component.forecasts).toBe(mockWeatherResults);
        const html = fixture.debugElement.nativeElement;
        expect(html).toBeDefined();
        const table = html.getElementsByTagName('table');
        expect(table).toBeDefined();
        expect(table.length).toBe(1);
        const rows = html.getElementsByTagName('tr');
        expect(rows).toBeDefined();
        expect(rows.length).toBe(6);
    });


});
