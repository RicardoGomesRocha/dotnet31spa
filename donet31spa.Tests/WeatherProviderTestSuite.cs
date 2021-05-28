using System;
using Xunit;
using dotnet31spa.Models;
using Microsoft.Data.Sqlite;
using dotnet31spa.Database;
using System.Collections.Generic;

namespace dotnet31spa.Tests
{
    public class WeatherProviderTestSuite
    {
        [Fact]
        public async void GetAll()
        {
            SqliteHelper.CreateTables();
            var service = new WeatherProvider(new DatabaseConfig { Name = "Data Source=weather.sqlite" });
            var result = await service.GetAll();
            Assert.Equal(Count(result), 5);
        }

        private int Count<T>(IEnumerable<T> enumerator)
        {
            var _enumerator = enumerator.GetEnumerator();
            var count = 0;
            while (_enumerator.MoveNext())
            {
                ++count;
            }
            return count;
        }
    }
}
