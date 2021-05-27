import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherForecast } from './fetch-data.models';
import { FetchDataService } from './fetch-data.service';

@Component({
    selector: 'app-fetch-data',
    templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent implements OnInit {
    forecasts: WeatherForecast[];

    constructor(private fetchDataService: FetchDataService) { }

    ngOnInit(): void {
        this.fetchDataService.getWeatherReport().subscribe((result) => {
            this.forecasts = result;
        }, (error) => {
            alert(`Something wrong happening when fetching data`);
            console.error(error);
        });
    }
}
