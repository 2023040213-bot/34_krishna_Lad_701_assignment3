
import { useState } from "react";
import "./App.css";

function App() {

    const [city, setCity] = useState("");

    const [weather, setWeather] = useState(null);

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);


    // ==========================
    // Get Weather
    // ==========================

    const getWeather = async () => {

        if (city === "") {

            setError("Please enter city name");

            return;

        }


        try {

            setLoading(true);

            setError("");

            setWeather(null);


            const response = await fetch(
                `http://localhost:5000/api/weather?city=${encodeURIComponent(city)}`
            );


            const data = await response.json();


            if (!response.ok) {

                setError(data.message);

                return;

            }


            setWeather(data);

        }

        catch (error) {

            console.log(error);

            setError("Unable to connect to backend");

        }

        finally {

            setLoading(false);

        }

    };


    return (

        <div className="container">

            <div className="weather-box">

                <h1>🌤 Weather App</h1>

                <p>
                    Check current weather of any city
                </p>


                <div className="search-box">

                    <input
                        type="text"
                        placeholder="Enter city name"
                        value={city}
                        onChange={(e) =>
                            setCity(e.target.value)
                        }
                    />

                    <button onClick={getWeather}>
                        Get Weather
                    </button>

                </div>


                {loading && (
                    <h3>Loading...</h3>
                )}


                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}


                {weather && (

                    <div className="weather-card">

                        <h2>
                            {weather.city}, {weather.country}
                        </h2>


                        <div className="temperature">
                            🌡 {weather.temperature}°C
                        </div>


                        <p>
                            🤗 Feels Like:
                            {weather.feelsLike}°C
                        </p>


                        <p>
                            💧 Humidity:
                            {weather.humidity}%
                        </p>


                        <p>
                            ☁ Weather:
                            {weather.weather}
                        </p>


                        <p>
                            💨 Wind:
                            {weather.windSpeed} m/s
                        </p>

                    </div>

                )}

            </div>

        </div>

    );

}

export default App;
