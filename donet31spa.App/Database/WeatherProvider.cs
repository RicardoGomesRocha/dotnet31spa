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

        public async Task<WeatherForecast> Get(int id)
        {
            using var connection = new SqliteConnection(databaseConfig.Name);
            var query = $"SELECT * from Weathers where id={id}";
            var result = await connection.QueryAsync<WeatherForecast>(query);
            return result.FirstOrDefault();
        }

        public async Task<IEnumerable<WeatherForecast>> GetAll()
        {
            using var connection = new SqliteConnection(databaseConfig.Name);
            var query = $"SELECT * from Weathers";
            return await connection.QueryAsync<WeatherForecast>(query);
        }
    }
}