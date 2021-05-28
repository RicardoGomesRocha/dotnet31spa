using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using dotnet31spa.Models;

namespace dotnet31spa.Database
{
    public interface IWeatherRepository
    {
        Task<WeatherForecast> Add(WeatherForecast weatherForecast);
        Task Delete(int weatherForecast);
        Task<WeatherForecast> Edit(WeatherForecast weatherForecast);
    }
}