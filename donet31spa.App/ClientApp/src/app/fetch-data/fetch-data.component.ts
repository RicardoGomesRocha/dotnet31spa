import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherForecast } from './fetch-data.models';
import { FetchDataService } from './fetch-data.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-fetch-data',
    templateUrl: './fetch-data.component.html',
    styleUrls: ['./fetch-data.component.scss']
})
export class FetchDataComponent implements OnInit {
    forecasts: WeatherForecast[];

    displayedColumns: string[] = ['id', 'date', 'temperatureC', 'temperatureF', 'summary', 'actions'];

    constructor(private fetchDataService: FetchDataService, private router: Router) { }

    ngOnInit(): void {
        this.fetchDataService.getWeatherReport().subscribe((result) => {
            this.forecasts = result;
        }, (error) => {
            alert(`Something wrong happening when fetching data`);
            console.error(error);
        });
    }

    edit(weather: WeatherForecast) {
        this.router.navigate(['weather-form', weather.id]);
    }

    async delete(weather: WeatherForecast) {
        this.fetchDataService.deleteWeatherReport(weather).subscribe(() => {
            this.forecasts = this.forecasts.filter((w) => w.id !== weather.id)
        }, (error) => {
            alert(`Something wrong happening when deleting the data`);
            console.error(error)
        });

    }
}
