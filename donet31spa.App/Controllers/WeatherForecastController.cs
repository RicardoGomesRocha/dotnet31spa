using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using dotnet31spa.Models;
using dotnet31spa.Database;

namespace dotnet31spa.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        private readonly IWeatherProvider weatherProvider;
        private readonly IWeatherRepository weatherRepository;

        public WeatherForecastController(ILogger<WeatherForecastController> logger,
            IWeatherProvider weatherProvider,
            IWeatherRepository weatherRepository)
        {
            _logger = logger;
            this.weatherProvider = weatherProvider;
            this.weatherRepository = weatherRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<WeatherForecast>> Get()
        {
            return await this.weatherProvider.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<WeatherForecast> Get(int id)
        {
            return await this.weatherProvider.Get(id);
        }

        [HttpPost]
        public async Task<WeatherForecast> Post(WeatherForecast weatherForecast)
        {
            return await this.weatherRepository.Add(weatherForecast);
        }

        [HttpPut]
        public async Task<WeatherForecast> Put(WeatherForecast weatherForecast)
        {
            return await this.weatherRepository.Edit(weatherForecast);
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await this.weatherRepository.Delete(id);
        }
    }
}
