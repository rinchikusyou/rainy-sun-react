import { Paper, Typography } from "@mui/material";
import styles from "../styles/main.module.css";
import { getWeatherIcon } from "../utils/get-weather-icon";
import { convertDate } from "../utils/convert-date";

const DailyWeather = (daily) => {
  const date = convertDate(daily.dt);
  return (
    <Paper className={styles.dailyWeather}>
      <img
        className={styles.image}
        src={getWeatherIcon(daily.weather[0].icon)}
        alt="weather-icon"
      />
      {date}
      <Typography variant={"h6"}>{daily.temp.day.toFixed(0)}°C</Typography>
    </Paper>
  );
};

export default DailyWeather;
