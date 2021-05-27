using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using dotnet31spa.Models;

namespace dotnet31spa.Database
{
    public interface IWeatherProvider
    {
        Task<IEnumerable<WeatherForecast>> GetAll();
    }
}