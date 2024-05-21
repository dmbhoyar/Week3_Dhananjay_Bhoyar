"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const weatherService_1 = require("./services/weatherService");
const mailer_1 = require("./utils/mailer");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 8000;
app.use(body_parser_1.default.json());
app.post('/api/SaveWeatherMapping', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cities = req.body.cities;
    // console.log("const cities = req.body;",cities)
    yield (0, weatherService_1.fetchAndSaveWeather)(cities);
    res.send('Weather data saved successfully.');
}));
app.get('/api/weatherDashboard', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const city = req.query.city;
    const weatherData = yield (0, weatherService_1.getWeatherData)(city);
    res.json(weatherData);
}));
app.post('/api/mailWeatherData', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { to, subject, cities } = req.body;
    const weatherData = yield (0, weatherService_1.getWeatherData)();
    // console.log("weatherData",weatherData);
    const weatherTable = (0, mailer_1.formatWeatherDataAsTable)(weatherData);
    console.log("weatherTable", weatherTable);
    yield (0, mailer_1.sendMail)(to, subject, weatherTable);
    res.send('Weather data mailed successfully.');
}));
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
