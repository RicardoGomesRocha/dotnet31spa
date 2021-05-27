using Dapper;
using Microsoft.Data.Sqlite;
using System.Threading.Tasks;
using System.Linq;
using dotnet31spa.Models;
using System.Collections.Generic;

namespace dotnet31spa.Database
{
    public class WeatherProvider : IWeatherProvider
    {
        private readonly DatabaseConfig databaseConfig;

        public WeatherProvider(DatabaseConfig databaseConfig)
        {
            this.databaseConfig = databaseConfig;
        }

        public async Task<IEnumerable<WeatherForecast>> GetAll()
        {
            using var connection = new SqliteConnection(databaseConfig.Name);
            var result = connection.QueryAsync<WeatherForecast>("SELECT * from Weathers");
            return await connection.QueryAsync<WeatherForecast>("SELECT * from Weathers");
        }


    }
}