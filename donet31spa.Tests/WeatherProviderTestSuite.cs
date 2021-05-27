using System;
using Xunit;
using donet31spa;

namespace donet31spa.Tests
{
    public class WeatherProviderTestSuite
    {
        [Fact]
        public void GetAll()
        {
            SqliteHelper.CreateTables();
            var service = new WeatherProvider(new DatabaseConfig { Name = "Filename =:memory:" });
            var result = await service.GetAll();
            Assert.True(false);
        }
    }
}
