import { Component } from '@angular/core';
import { WeatherService } from './weather.service';

@Component({
	selector: 'app-weather',
	templateUrl: './weather.component.html'
})
export class WeatherComponent {

    state: String;
    day: String;
    today: boolean;
    threeDay: boolean;
    weatherData: any;
    weatherWind: String;
    temp: any;

    threeDayWeather: ThreeDayWeather = {
        tempMax: [-100,-100,-100],
        tempMin: [100,100,100]
    }
    
    constructor(
        private weatherService: WeatherService
    ){
        this.state = '';
        this.day = '';
    }
    //Funcion para formatear el valor del clima que se muestra
    setWeather(data){
        var count = 0;
        var pos = 0;
        this.threeDayWeather.tempMax[pos]=-100;
        this.threeDayWeather.tempMin[pos]=100;
        if(this.today){
            this.weatherData = data['main'];
            this.weatherWind = data['wind'];
        }
        if(this.threeDay){
            for (let entry of data) {
                this.temp = entry['main'];
                //Info en intervalos de 3 horas, cada 8 horas es un dia y paso a la posicion siguiente
                if (count % 8 == 0 && count != 0){
                    pos++;
                    this.threeDayWeather.tempMax[pos]=-100;
                    this.threeDayWeather.tempMin[pos]=100;
                }
                // Calculo la maxima y la minima por dia
                this.temp = entry['main'];
                if(this.threeDayWeather.tempMax[pos] < this.temp['temp_max']){
                    this.threeDayWeather.tempMax[pos] = this.temp['temp_max'];
                }
                if(this.threeDayWeather.tempMin[pos] > this.temp['temp_min']){
                    this.threeDayWeather.tempMin[pos] = this.temp['temp_min'];
                }
                count++;
            }
        }
    }
    //Funcion para setear la provincia
    setState(state){
        this.state = state;
        this.updateWeather();
    }
    //Funcion para setear el dia
    setDay(day){
        this.day = day;
        this.updateDay();
        this.updateWeather();
    }
    //Funcion para actualizar el dia
    updateDay(){
        if (this.day == 'today'){
            this.today = true;
            this.threeDay = false;
        }
        if (this.day == 'threeDay'){
            this.today = false;
            this.threeDay = true;
        }
    }
    //Funcion para actualizar el valor del clima
    updateWeather(){
        if(this.today){
            this.weatherService.getWeatherToday(this.state).subscribe(
                data => this.setWeather(data),
                err => console.log(err)
            );
        }
        if(this.threeDay){
            this.weatherService.getWeatherThreeDay(this.state).subscribe(
                data => this.setWeather(data['list']),
                err => console.log(err)
            );
        }
    }
}
//Estructura de los datos para cuando se trabaja con 3 dias
interface ThreeDayWeather {
    tempMax: number[];
    tempMin: number[];
}