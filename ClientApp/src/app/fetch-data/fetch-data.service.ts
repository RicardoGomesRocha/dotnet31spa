import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { WeatherForecast } from "./fetch-data.models";

@Injectable()
export class FetchDataService {

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

    getWeatherReport(): Observable<WeatherForecast[]> {
        return this.http.get<WeatherForecast[]>(`${this.baseUrl}api/weatherforecast`);
    }
}