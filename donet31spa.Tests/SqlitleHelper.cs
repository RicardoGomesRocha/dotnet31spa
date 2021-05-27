using System;
using Xunit;
using Microsoft.Data.Sqlite;

namespace donet31spa.Tests
{
    public static class SqliteHelper
    {
        public static void CreateTables()
        {
            using var connection = new SqliteConnection("Filename =:memory:");

            var table = connection.Query<string>("SELECT * FROM sqlite_master WHERE type='table' AND name='Weathers';");
            var tableName = table.FirstOrDefault();
            if (!string.IsNullOrEmpty(tableName))
                return;

            var script = @"CREATE TABLE Weathers(
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        date DateTime NOT NULL,
                        temperatureC INT NOT NULL,
                        temperatureF INT NOT NULL,
                        summary TINYTEXT
                        );

                        INSERT INTO Weathers (date, temperaturec, temperaturef, summary)
                        values ('2021-05-27 10:34:09 AM', -16, 4, 'Cold');

                        INSERT INTO Weathers (date, temperaturec, temperaturef, summary)
                        values ('2021-05-28 8:34:09 AM', 53, 127, 'Hot');

                        INSERT INTO Weathers (date, temperaturec, temperaturef, summary)
                        values ('2021-05-29 6:34:09 PM', 50, 121, 'Balmy');

                        INSERT INTO Weathers (date, temperaturec, temperaturef, summary)
                        values ('2021-05-30 4:34:09 PM', 41, 105, 'Chilly');

                        INSERT INTO Weathers (date, temperaturec, temperaturef, summary)
                        values ('2021-05-31 10:50:09 AM', -8, 18, 'Warm');
            ";

            connection.Execute(script);
        }
    }
}
