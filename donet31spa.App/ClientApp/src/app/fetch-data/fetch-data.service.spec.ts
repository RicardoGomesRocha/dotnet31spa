import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FetchDataService } from './fetch-data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

const mockWeatherResults = [{ "id": "1", "date": "2021-05-27 10:34:09 AM", "temperatureC": -16, "temperatureF": 4, "summary": "Cold" }, { "id": "2", "date": "2021-05-28 8:34:09 AM", "temperatureC": 53, "temperatureF": 127, "summary": "Hot" }, { "id": "3", "date": "2021-05-29 6:34:09 PM", "temperatureC": 50, "temperatureF": 121, "summary": "Balmy" }, { "id": "4", "date": "2021-05-30 4:34:09 PM", "temperatureC": 41, "temperatureF": 105, "summary": "Chilly" }, { "id": "5", "date": "2021-05-31 10:50:09 AM", "temperatureC": -8, "temperatureF": 18, "summary": "Warm" }];

describe('Fetch Data Service', () => {
    let httpMock: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule,],
            providers: [FetchDataService, { provide: 'BASE_URL', useValue: 'http://mockUrl/' }]
        });
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should get all weather data', waitForAsync(async () => {
        const service = TestBed.inject(FetchDataService);
        service.getWeatherReport().subscribe((results) => {
            expect(results).toBe(mockWeatherResults);
        });
        const request = httpMock.expectOne(`http://mockUrl/api/weatherforecast`);
        expect(request.request.method).toBe('GET');
        request.flush(mockWeatherResults);
    }));
});
