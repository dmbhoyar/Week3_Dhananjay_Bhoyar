# Week3_Dhananjay_Bhoyar
# .env file code

DB_PASSWORD= own_database_password

GEOCODING_API_KEY=ARw2evL00wEVs/lFkYymLg==OY5TatroO7JPaSab
WEATHER_API_KEY=4166a4b05dmsh46a86f9e622d2a2p118d17jsn1d06ea6ce608

EMAIL_USER= Sender_mail
EMAIL_PASS=Sender_Password


# sample data formate for http://localhost:8000/api/SaveWeatherMapping

{
    "cities": [
        {
            "city": "Pune",
            "country": "India"
        },
        {
            "city": "Mumbai",
            "country": "India"
        },
        {
            "city": "London",
            "country": "England"
        }
    ]
}

# Sample data formate for http://localhost:8000/api/mailWeatherData

{
  "to": "xyz@gmail.com",
  "subject": "Weather Data Report",
  "cities": ["Pune", "Amravati", "Prompton"]
}


