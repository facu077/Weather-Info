import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
 
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable()
export class WeatherService {

    constructor(private http:HttpClient) {}
    //Llamada a la api openWeather que devuelve el clima del dia
    getWeatherToday(state) {
        return this.http.get('http://api.openweathermap.org/data/2.5/weather?q=' + state + ',ar&APPID=0e6fc5d8ea92aee150a4d8fb4e900959&units=metric');
    }
    //Llamada a la api openWeather que devuelve el clima de los proximos 3 dias en intervalos de 3 horas
    getWeatherThreeDay(state) {
        return this.http.get('http://api.openweathermap.org/data/2.5/forecast?q=' + state + ',ar&cnt=24&APPID=0e6fc5d8ea92aee150a4d8fb4e900959&units=metric');
    }
}


