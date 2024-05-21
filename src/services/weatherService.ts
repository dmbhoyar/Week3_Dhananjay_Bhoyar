import axios from 'axios';
import Weather from '../models/weather';
import sequelize from '../config/dbConfig';
import dotenv from 'dotenv';

dotenv.config();

interface City {
    city: string;
    country: string;
  }

const geocodingApiUrl = 'https://api.api-ninjas.com/v1/geocoding';
const weatherApiUrl = 'https://weatherapi-com.p.rapidapi.com/current.json';
const geoApiKey = process.env.GEOCODING_API_KEY as string;
const weatherApiKey = process.env.WEATHER_API_KEY as string;
//console.log("key",geoApiKey);
export const fetchAndSaveWeather = async (cities: City | City[]) => {
    const citiesArray = Array.isArray(cities) ? cities : [cities];
    //console.log("citiesArray",citiesArray);

 for (const cityObj of citiesArray) {

   // console.log("cityObj",cityObj.city);
 
    const geoResponse = await axios.get(`${geocodingApiUrl}`, {
      params: {
        city:cityObj.city,
        country:cityObj.country,
      },
      headers: {
        'X-Api-Key': geoApiKey,
        
      }
    });
   console.log("geoApiResponse:-",geoResponse.data);
   //console.log("GeoCoding Response:", geoResponse.data[0]);
   
   const coordinates =  geoResponse.data[0];
   
    console.log("---------------------------------------------------------")
   // console.log("coordinates",coordinates.latitude);
    const weatherResponse = await axios.get(`${weatherApiUrl}`, {
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
    console.log("cityObj.city",cityObj.city)
    console.log("cityObj.country",cityObj.country)
    await Weather.create({
      city: cityObj.city,
      country: cityObj.country,
      weather: weatherData.current.condition.text,
      time: new Date(),
      longitude: coordinates.longitude,
      latitude: coordinates.latitude,
    });
  }
};

export const getWeatherData = async (city?: string) => {
  if (city) {
    return Weather.findAll({ where: { city } });
  } else {
    const weathers = await Weather.findAll({
      attributes: [
        'id',
        'city',
        'country',
        // [sequelize.fn('to_char', sequelize.fn('max', sequelize.col('time')), 'YYYY-MM-DD HH24:MI:SS'), 'date'],
        'time',
        'weather'
        
      ],
      group: [ 'id','city', 'country', 'weather']
    });
    return weathers;
  }
};
