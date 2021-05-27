using System;

namespace dotnet31spa.Models
{
    public class WeatherForecast
    {
        public string id { get; set; }

        public string Date { get; set; }

        public int TemperatureC { get; set; }

        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

        public string Summary { get; set; }

    }
}
