import { useEffect, useMemo, useState } from "react";
import { getWeather } from "../services/weather.service";
import { Container, Paper, Skeleton, Typography } from "@mui/material";
import styles from "../styles/main.module.css";
import { getWeatherIcon } from "../utils/get-weather-icon";
import { ReactComponent as WindSpeedIcon } from "../assets/icons/wind-speed.svg";
import { ReactComponent as FeelsLikeIcon } from "../assets/icons/feels-like.svg";
import { ReactComponent as PressureIcon } from "../assets/icons/pressure.svg";
import { ReactComponent as UviIcon } from "../assets/icons/uvi.svg";
import PaperField from "../components/paper-field";
import DailyWeather from "../components/daily-weather";

const MainPage = () => {
  const [weather, setWeather] = useState(null);

  const currentWeather = useMemo(() => {
    return weather?.current;
  }, [weather]);

  const paperFields = useMemo(() => {
    if (!weather) return [];
    return [
      {
        title: "Wind Speed",
        Icon: WindSpeedIcon,
        value: currentWeather.wind_speed,
        className: styles.windContainer,
      },
      {
        title: "Feels Like",
        Icon: FeelsLikeIcon,
        value: currentWeather.feels_like,
        className: styles.feelsLikeContainer,
      },
      {
        title: "Pressure",
        Icon: PressureIcon,
        value: currentWeather.pressure,
        className: styles.pressureContainer,
      },
      {
        title: "UVI",
        Icon: UviIcon,
        value: currentWeather.uvi,
        className: styles.pressureContainer,
      },
    ];
  }, [weather]);

  useEffect(() => {
    getWeather(43, 76).then((data) => {
      setWeather(data);
    });
  }, []);

  return (
    <Container style={{ marginTop: "3rem" }}>
      {!weather ? null : (
        <div>
          <Paper className={styles.paper}>
            <div className={styles.content}>
              {paperFields.map((el) => (
                <PaperField {...el} key={el.title} />
              ))}
            </div>
            <Paper className={styles.paperContainer}>
              <img
                className={styles.image}
                src={getWeatherIcon(currentWeather.weather[0].icon)}
                alt="weather-icon"
              />
              <Typography variant={"h6"}>
                {currentWeather.temp.toFixed(0)}°C
              </Typography>
              <Typography variant={"h5"} style={{ fontWeight: 700 }}>
                {weather.timezone}
              </Typography>
            </Paper>
          </Paper>
          <div className={styles.dailyContainer}>
            {weather.daily.map((daily, index) => (
              <DailyWeather {...daily} key={index} />
            ))}
          </div>
        </div>
      )}
    </Container>
  );
};

export default MainPage;
