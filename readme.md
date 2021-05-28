Prerequisites:

- .Net 5
- node.js version 14+
- npm version 6.14+
- Angular version 11.2.11

Run

- Open with Visual Studio Code
- Make sure the C# extension is installed
- open the console (integrated terminal) in the "ClientApp" folder
- run "npm install"
- run "ng build"
- launch the application from the debug section ".NET Core Launch (web)" or press "F5"
- click on the "Fetch Data" menu item to verify that the angular app is recieving data from the api portion

---

April 2021: We are hiring!
Applicants must be able to legally work in the USA and are preferably located in the Eastern or Central time zone.

To be considered do the following:

- create a fork of the project (or clone it and send us the link)
- change the "Fetch Data" functionality from hard-coded values in the controller to be retrieved from a SQLite database (1 table)

We are looking for the following in your fork:

- a sql lite database with one table to hold the temperatures and dates
- a service class that uses Dapper to retrieve the temperatures from the database and unit test
- the service being used in the weather forecast controller to retrieve the data
- one angular component unit test using Jasmine and Karma

For additional bonus points:

- change the angular app to use angular material styling
- create a component for temperature CRUD operations using reactive forms
- add the required endpoints to the weather forecast controller
- add the required CRUD methods to the data service

For even more bonus points:

- secure the app with the identity provider of your choice (Google, etc) using OAuth and the angular-auth-oidc-client version 11+, if possible implementing PKCE flow

Finally, submit a pull request for your fork as well as your contact information!

# Ricardo Solution Explanation

I implemented all the following points:

- a sql lite database with one table to hold the temperatures and dates
- a service class that uses Dapper to retrieve the temperatures from the database and unit test
- the service being used in the weather forecast controller to retrieve the data
- one angular component unit test using Jasmine and Karma

And also all the following bonus points:

- change the angular app to use angular material styling
- create a component for temperature CRUD operations using reactive forms
- add the required endpoints to the weather forecast controller
- add the required CRUD methods to the data service

## Architecture

I created two folder containing to .net projects:

- `donet31spa.App`: Contains all artifacts to build a run the applications;
- `donet31spa.Tests`: Contains all artifacts to test the backend applications;

### donet31spa.App

I organized the backend project into the following folders:

- `Controllers`: Contains all controllers which are the entry point the rest api;
- `Database`:
    - Contains all the files from database layer;
    - Here I implemented the pattern CQRS where you can find Providers for data access ([R]ead) and Repository for data manipulation ([C]reate, [D]elete and [U]pdate).
    - `DatabaseBootstrap.cs` is responsible to create and populate a new database if necessary (during the application startup (`Startup.cs`))
    - `WeatherProvider.cs` and `WeatherRepository.cs` are service. A different folder organization would be creating a specific folder called Services and add this files there.
- Models: Contains all models used in backend.

I organized the frontend project into the following folders:

- `app/fetch-data folder:
    - contains components, models and services responsible to interact with the data table;
    - the table allows to edit and delete rows;
    - the edit feature redirects the user to the weather-form page;

- `weather-form folder`:
    - contains components and services allowing the creation and edition of weather reports;
    - if the id is present in the url (/weather-form/{id}) the component will fill the react form with data and when the form is submitted, the weather report will be change. If the id is not sent in the url, it will be created a new weather report.
    - When the form is submitted, for both cases, the user is redirect to the data table page.

### donet31spa.Tests

- To run the tests: go to the `dotnet31spa\donet31spa.Tests` and run in the terminal `dotnet test`;
- SqlitleHelper.cs: This helping class will create a database with data if need be.
- WeatherProviderTestSuite.cs: Didn't have the time to provide more tests. In here you have a small example of how to test get all weather forecasts from the database.

## Final notes:

- (Front end) You can check in fetch-data.component.ts how I document the code;
- (Back end) You can check in WeatherRepository.cs how I document the code;
- We could use some integrations tests (using swagger for example), didn't had the time 🤔;
- My email is ricardo1992rocha@gmail.com;
- Actually was a fun small project to build. I did not knew how easy is to build a database layer using sqlite and dapper. Always learning 😀.
