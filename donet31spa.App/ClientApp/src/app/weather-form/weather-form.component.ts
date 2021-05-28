import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherFormService } from './weather-form.service';

@Component({
    selector: 'app-weather-form',
    templateUrl: './weather-form.component.html',
    styleUrls: ['weather-form.component.scss']
})
export class WeatherFormComponent implements OnInit {

    editMode = false;

    weatherForm = new FormGroup({
        date: new FormControl('date', Validators.required),
        temperatureC: new FormControl('temperatureC', Validators.required),
        temperatureF: new FormControl('temperatureF', Validators.required),
        summary: new FormControl('summary'),
    });

    id: number;

    constructor(private router: Router,
        private weatherFormService: WeatherFormService,
        private activatedRoute: ActivatedRoute) {
        this.activatedRoute.params.subscribe(params => this.id = params['id']);
    }

    ngOnInit() {
        if (this.id) {
            this.editMode = true;
            this.weatherFormService.getWeatherReport(this.id).subscribe((result) => {
                if (!result) {
                    alert(`The weather forecast ${this.id} does not exists`);
                    return this.router.navigate(['fetch-data']);
                }
                this.weatherForm.setValue({
                    date: new Date(result.date),
                    temperatureC: result.temperatureC,
                    temperatureF: result.temperatureF,
                    summary: result.summary,
                });
            }, (error) => {
                alert(`Something wrong happening when fetching data`);
                console.error(error);
            });
        }

    }

    submitForm() {
        if (this.editMode) {
            const weatherObject = this.weatherForm.value;
            weatherObject.id = this.id;
            this.weatherFormService.editNewWeatherReport(weatherObject).subscribe(() => {
                this.router.navigate(['fetch-data']);
            }, (error) => {
                alert(`Something wrong happening when editing data`);
                console.error(error);
            });
        } else {
            this.weatherFormService.addNewWeatherReport(this.weatherForm.value).subscribe(() => {
                this.router.navigate(['fetch-data']);
            }, (error) => {
                alert(`Something wrong happening when submitting data`);
                console.error(error);
            });
        }

    }
}