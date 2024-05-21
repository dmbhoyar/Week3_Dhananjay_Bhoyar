import express, { Request, Response } from 'express';
import { fetchAndSaveWeather, getWeatherData} from './services/weatherService';
import {formatWeatherDataAsTable, sendMail } from './utils/mailer';
import bodyParser from 'body-parser';

const app = express();
const port = 8000;

app.use(bodyParser.json());

app.post('/api/SaveWeatherMapping', async (req: Request, res: Response) => {
    const cities = req.body.cities;
   // console.log("const cities = req.body;",cities)
    await fetchAndSaveWeather(cities);
    res.send('Weather data saved successfully.');
});

app.get('/api/weatherDashboard', async (req: Request, res: Response) => {
    const city = req.query.city as string;
    const weatherData = await getWeatherData(city);
    res.json(weatherData);
});

app.post('/api/mailWeatherData', async (req: Request, res: Response) => {
    const { to, subject, cities } = req.body;
    const weatherData = await getWeatherData();
   // console.log("weatherData",weatherData);
    const weatherTable = formatWeatherDataAsTable(weatherData);
   // console.log("weatherTable",weatherTable)
    await sendMail(to, subject, weatherTable);
    res.send('Weather data mailed successfully.');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
