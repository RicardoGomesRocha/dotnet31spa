import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { WeatherForecast } from "../fetch-data/fetch-data.models";

@Injectable()
export class WeatherFormService {

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

    getWeatherReport(id: number): Observable<WeatherForecast> {
        return this.http.get<WeatherForecast>(`${this.baseUrl}api/weatherforecast/${id}`);
    }

    addNewWeatherReport(weatherReport: WeatherForecast): Observable<WeatherForecast> {
        return this.http.post<WeatherForecast>(`${this.baseUrl}api/weatherforecast`, weatherReport);
    }

    editNewWeatherReport(weatherReport: WeatherForecast): Observable<WeatherForecast> {
        return this.http.put<WeatherForecast>(`${this.baseUrl}api/weatherforecast`, weatherReport);
    }
}