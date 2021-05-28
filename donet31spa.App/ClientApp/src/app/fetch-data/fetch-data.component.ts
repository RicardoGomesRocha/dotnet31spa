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
/**
 * Responsible to show weather reports.
 * Provides a way to access edit and delete weather report features.
 */
export class FetchDataComponent implements OnInit {
    /** Array of weather forecasts. */
    forecasts: WeatherForecast[];

    /** Angular materials columns configuration. */
    displayedColumns: string[] = ['id', 'date', 'temperatureC', 'temperatureF', 'summary', 'actions'];

    /**
     * FetchDataComponent Constructor
     * @param fetchDataService Responsible for the rest api communication.
     * @param router Provides navigation among views and URL manipulation capabilities
     */
    constructor(private fetchDataService: FetchDataService, private router: Router) { }

    /**
     * OnInit Angular Hook
     */
    ngOnInit(): void {
        // Gets the report
        this.fetchDataService.getWeatherReport().subscribe((result) => {
            this.forecasts = result;
        }, (error) => {
            alert(`Something wrong happening when fetching data`);
            console.error(error);
        });
    }

    /**
     * Provides access to the edit feature
     * @param weather Weather forecast
     */
    edit(weather: WeatherForecast) {
        // Redirects user to the weather form
        this.router.navigate(['weather-form', weather.id]);
    }

    /**
    * Deletes a give report.
    * @param weather Weather forecast
    */
    async delete(weather: WeatherForecast) {
        this.fetchDataService.deleteWeatherReport(weather).subscribe(() => {
            this.forecasts = this.forecasts.filter((w) => w.id !== weather.id)
        }, (error) => {
            alert(`Something wrong happening when deleting the data`);
            console.error(error)
        });

    }
}
