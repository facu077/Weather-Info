import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
import { WeatherComponent } from './weather.component';
import { WeatherService } from './weather.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

describe('WeatherComponent', () => {

  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>; 
  let weatherService: WeatherService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WeatherComponent
      ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        WeatherService
      ]
    }).compileComponents();

    // create component and test fixture
    fixture = TestBed.createComponent(WeatherComponent); 

    // get test component from the fixture
    component = fixture.componentInstance; 
    
    // UserService provided to the TestBed
    weatherService = TestBed.get(WeatherService);

  }));
  //Input test para boton Mendoza
  it('should call setState with mendoza', async(() => {
    spyOn(component, 'setState');
 
    let button = fixture.debugElement.nativeElement.querySelector('#btnStateMdz');
    button.click();
 
    fixture.whenStable().then(() => {
    expect(component.setState).toHaveBeenCalledWith('mendoza');
   })
  }));
  //Input test para boton Buenos Aires
  it('should call setState with buenos aires', async(() => {
    spyOn(component, 'setState');

    let button = fixture.debugElement.nativeElement.querySelector('#btnStateBsAs');
    button.click();

    fixture.whenStable().then(() => {
    expect(component.setState).toHaveBeenCalledWith('buenos aires');
  })
  }));
  //Input test para boton today
  it('should call setDay with today', async(() => {
    spyOn(component, 'setDay');

    let button = fixture.debugElement.nativeElement.querySelector('#btnDayToday');
    button.click();

    fixture.whenStable().then(() => {
    expect(component.setDay).toHaveBeenCalledWith('today');
  })
  }));
  //Input test para boton three days
  it('should call setDay with threeDay', async(() => {
    spyOn(component, 'setDay');

    let button = fixture.debugElement.nativeElement.querySelector('#btnDayThreeDay');
    button.click();

    fixture.whenStable().then(() => {
    expect(component.setDay).toHaveBeenCalledWith('threeDay');
  })
  }));
  //Test para llamada al servicio con info del clima de hoy
  it(
    'should get today weather info',
    inject(
      [HttpTestingController, WeatherService],
      (httpMock: HttpTestingController, dataService: WeatherService) => {
        const mockData = [
          { main: {temp: 30, humidity: 25}, wind: {speed: 1.5} }
        ];

        dataService.getWeatherToday('mendoza').subscribe(data => {
          expect(data).toEqual(mockData);
        });

        const mockReq = httpMock.expectOne('http://api.openweathermap.org/data/2.5/weather?q=mendoza,ar&APPID=0e6fc5d8ea92aee150a4d8fb4e900959&units=metric');
        expect(mockReq.request.method).toEqual('GET');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockData);

        httpMock.verify();
      }
    )
  );
  //Test para llamada al servicio con info del clima de los proximos 3 dias
  it(
    'should get three days weather info',
    inject(
      [HttpTestingController, WeatherService],
      (httpMock: HttpTestingController, dataService: WeatherService) => {
        const mockData = [
          { list: {
            0: {main: {temp_min: 10.5, temp_max: 16.3}},
            1: {main: {temp_min: 8.3, temp_max: 17.5}},
            2: {main: {temp_min: 14, temp_max: 24}},
            3: {main: {temp_min: 12, temp_max: 16}},
            4: {main: {temp_min: 11.5, temp_max: 19.3}}
          }
        }
        ];

        dataService.getWeatherThreeDay('mendoza').subscribe(data => {
          expect(data).toEqual(mockData);
        });

        const mockReq = httpMock.expectOne('http://api.openweathermap.org/data/2.5/forecast?q=mendoza,ar&cnt=24&APPID=0e6fc5d8ea92aee150a4d8fb4e900959&units=metric');
        expect(mockReq.request.method).toEqual('GET');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockData);

        httpMock.verify();
      }
    )
  );
});