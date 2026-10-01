
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 5000;

// ==========================
// Middleware
// ==========================

app.use(cors());
app.use(express.json());


// ==========================
// Weather API
// ==========================

app.get("/api/weather", async (req, res) => {

    try {

        const city = req.query.city;

        // Check city
        if (!city) {
            return res.status(400).json({
                message: "Please enter city name"
            });
        }


        // OpenWeatherMap API URL
        const url =
                `https://api.openweathermap.org/data/2.5/weather` +
    `?q=${encodeURIComponent(city)}` +
    `&appid=${process.env.OPENWEATHER_API_KEY}` +
    `&units=metric`;

        // Call OpenWeatherMap
        const response = await fetch(url);


        // If city not found / API error
        if (!response.ok) {

            return res.status(response.status).json({
                message: "City not found or weather API error"
            });

        }


        // Convert response to JSON
        const data = await response.json();


        // Send useful data to React
        res.json({

            city: data.name,

            country: data.sys.country,

            temperature: data.main.temp,

            feelsLike: data.main.feels_like,

            humidity: data.main.humidity,

            weather: data.weather[0].description,

            windSpeed: data.wind.speed

        });

    }

    catch (error) {

        console.log("Weather Error:", error);

        res.status(500).json({
            message: "Server error"
        });

    }

});


// ==========================
// Start Server
// ==========================

app.listen(PORT, () => {

    console.log(
        `Backend running at http://localhost:${PORT}`
    );

});
