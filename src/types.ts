export interface WeatherCondition {
    main: string;
    description: string;
    icon: string;
  }
  
  export interface WeatherResponse {
    name: string;
    main: {
      temp: number;
      humidity: number;
    };
    weather: WeatherCondition[];
    wind: {
      speed: number;
    };
  }
  export interface ForecastItem {
    dt_txt: string;
    main: {
      temp: number;
    };
    weather: WeatherCondition[];
  }
  
  export interface ForecastResponse {
    list: ForecastItem[];
  }