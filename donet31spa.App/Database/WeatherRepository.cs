using Dapper;
using Microsoft.Data.Sqlite;
using System.Threading.Tasks;
using dotnet31spa.Models;

namespace dotnet31spa.Database
{
    public class WeatherRepository : IWeatherRepository
    {
        private readonly DatabaseConfig databaseConfig;

        public WeatherRepository(DatabaseConfig databaseConfig)
        {
            this.databaseConfig = databaseConfig;
        }

        public async Task<WeatherForecast> Add(WeatherForecast weatherForecast)
        {
            using var connection = new SqliteConnection(databaseConfig.Name);
            var query = "INSERT INTO Weathers (date, temperaturec, temperaturef, summary)";
            query += $" VALUES('{weatherForecast.Date}', {weatherForecast.TemperatureC}, {weatherForecast.TemperatureF}, '{weatherForecast.Summary}')";
            await connection.QueryAsync(query);
            return weatherForecast;
        }
        public async Task<WeatherForecast> Edit(WeatherForecast weatherForecast)
        {
            using var connection = new SqliteConnection(databaseConfig.Name);
            var query = "Update Weathers";
            query += $" Set date='{weatherForecast.Date}',";
            query += $" temperaturec='{weatherForecast.TemperatureC}',";
            query += $" temperaturef='{weatherForecast.TemperatureF}',";
            query += $" summary='{weatherForecast.Summary}'";
            query += $" Where id={weatherForecast.id}";
            await connection.QueryAsync(query);
            return weatherForecast;
        }

        public async Task Delete(int id)
        {
            using var connection = new SqliteConnection(databaseConfig.Name);
            var query = $"Delete from Weathers where id={id}";
            await connection.QueryAsync(query);
        }


    }
}