using Dapper;
using Microsoft.Data.Sqlite;
using System.Threading.Tasks;
using System.Linq;
using dotnet31spa.Models;
using System.Collections.Generic;

namespace dotnet31spa.Database
{
    // Contains all methods for getting weather data from the database.
    /// <summary>
    /// The Weather Provider service.
    /// Contains all methods for getting weather data from the database.
    /// </summary>
    public class WeatherProvider : IWeatherProvider
    {
        // Database access donfiguration
        private readonly DatabaseConfig databaseConfig;


        public WeatherProvider(DatabaseConfig databaseConfig)
        {
            this.databaseConfig = databaseConfig;
        }

        // Gets a weather forecast given an id.
        /// <summary>
        /// Gets a weather forecast given an id.
        /// </summary>
        /// <returns>
        /// The weather forecast.
        /// </returns>
        /// <param name="id">Weather forecast identifier</param>
        public async Task<WeatherForecast> Get(int id)
        {
            using var connection = new SqliteConnection(databaseConfig.Name);
            var query = $"SELECT * from Weathers where id={id}";
            var result = await connection.QueryAsync<WeatherForecast>(query);
            return result.FirstOrDefault();
        }

        // Gets a weather forecasts from the database
        /// <summary>
        // Gets a weather forecasts from the database
        /// </summary>
        /// <returns>
        /// All weather forecasts.
        /// </returns>
        public async Task<IEnumerable<WeatherForecast>> GetAll()
        {
            using var connection = new SqliteConnection(databaseConfig.Name);
            var query = $"SELECT * from Weathers";
            return await connection.QueryAsync<WeatherForecast>(query);
        }
    }
}