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
exports.getWeatherData = exports.fetchAndSaveWeather = void 0;
const axios_1 = __importDefault(require("axios"));
const weather_1 = __importDefault(require("../models/weather"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const geocodingApiUrl = 'https://api.api-ninjas.com/v1/geocoding';
const weatherApiUrl = 'https://weatherapi-com.p.rapidapi.com/current.json';
const geoApiKey = process.env.GEOCODING_API_KEY;
const weatherApiKey = process.env.WEATHER_API_KEY;
//console.log("key",geoApiKey);
const fetchAndSaveWeather = (cities) => __awaiter(void 0, void 0, void 0, function* () {
    const citiesArray = Array.isArray(cities) ? cities : [cities];
    //console.log("citiesArray",citiesArray);
    for (const cityObj of citiesArray) {
        // console.log("cityObj",cityObj.city);
        const geoResponse = yield axios_1.default.get(`${geocodingApiUrl}`, {
            params: {
                city: cityObj.city,
                country: cityObj.country,
            },
            headers: {
                'X-Api-Key': geoApiKey,
            }
        });
        console.log("geoApiResponse:-", geoResponse.data);
        //console.log("GeoCoding Response:", geoResponse.data[0]);
        const coordinates = geoResponse.data[0];
        console.log("---------------------------------------------------------");
        // console.log("coordinates",coordinates.latitude);
        const weatherResponse = yield axios_1.default.get(`${weatherApiUrl}`, {
            params: {
                q: `${coordinates.latitude},${coordinates.longitude}`,
            },
            headers: {
                'X-RapidAPI-Key': weatherApiKey,
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
            }
        });
        const weatherData = weatherResponse.data;
        //console.log("weatherData",weatherData.data)
        const weatherCondition = weatherData.current.condition.text;
        //console.log("weatherCondition",weatherCondition);
        console.log("cityObj.city", cityObj.city);
        console.log("cityObj.country", cityObj.country);
        yield weather_1.default.create({
            city: cityObj.city,
            country: cityObj.country,
            weather: weatherData.current.condition.text,
            time: new Date(),
            longitude: coordinates.longitude,
            latitude: coordinates.latitude,
        });
    }
});
exports.fetchAndSaveWeather = fetchAndSaveWeather;
const getWeatherData = (city) => __awaiter(void 0, void 0, void 0, function* () {
    if (city) {
        return weather_1.default.findAll({ where: { city } });
    }
    else {
        const weathers = yield weather_1.default.findAll({
            attributes: [
                'id',
                'city',
                'country',
                // [sequelize.fn('to_char', sequelize.fn('max', sequelize.col('time')), 'YYYY-MM-DD HH24:MI:SS'), 'date'],
                'time',
                'weather'
            ],
            group: ['id', 'city', 'country', 'weather']
        });
        return weathers;
    }
});
exports.getWeatherData = getWeatherData;
