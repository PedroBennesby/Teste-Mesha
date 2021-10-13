import React from "react";
import cities from "../../lib/city.list.json";
import Head from "next/head";
import TodaysWeather from "../../components/TodaysWeather";
import moment from "moment-timezone";
import HourlyWeather from "../../components/HourlyWeather";
import SearchBox from "../../components/SearchBox";
import Link from "next/link";
import WeatherSongs from "../../components/WeatherSongs";

export async function getServerSideProps(context) {
  const city = getCity(context.params.city);

  if (!city) {
    return {
      notFound: true,
    };
  }

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=6ee18fbcb29bb1f73f76fec3daaf1b03&units=metric&exclude=minutely&lang=pt_br`
  );

  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  let songCat = "";
  if (data.current.temp < 16) {
    songCat = "genre-global-chart-6";
  } else if (data.current.temp < 24) {
    songCat = "genre-global-chart-5";
  } else if (data.current.temp < 32) {
    songCat = "genre-global-chart-1";
  } else {
    songCat = "genre-global-chart-7";
  }
  const response = await fetch(
    `https://shazam.p.rapidapi.com/charts/track?locale=pt-br&listId=${songCat}&pageSize=10&startFrom=0`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "shazam.p.rapidapi.com",
        "x-rapidapi-key": "eb5d865c9fmshbcd01666a0ba389p125415jsnd8f9a25f93ff",
      },
    }
  );
  const songs = await response.json();

  return {
    props: {
      city: city,
      timezone: data.timezone,
      currentWeather: data.current,
      dailyWeather: data.daily,
      hourlyWeather: getHourlyWeather(data.hourly, data.timezone),
      songs: songs.tracks,
    },
  };
}

const getHourlyWeather = (hourlyData, timezone) => {
  const endOfDay = moment().tz(timezone).endOf("day").valueOf();
  const eodTimeStamp = Math.floor(endOfDay / 1000);
  const todaysData = hourlyData.filter((data) => data.dt < eodTimeStamp);

  return todaysData;
};

const getCity = (param) => {
  const cityParam = param.trim();
  // pega o id da cidade
  const splitCity = cityParam.split("-");
  const id = splitCity[splitCity.length - 1];

  if (!id) {
    return null;
  }

  const city = cities.find((city) => city.id.toString() === id);

  if (city) {
    return city;
  } else {
    return null;
  }
};

export default function City({
  hourlyWeather,
  city,
  currentWeather,
  dailyWeather,
  timezone,
  songs,
}) {
  return (
    <div>
      <Head>
        <title>{city.name} Clima</title>
      </Head>

      <div className="page-wrapper">
        <div className="container">
          <Link href="/">
            <a className="back-link">&larr; Home</a>
          </Link>
          <SearchBox placeholder="Procure por outra cidade..." />
          <TodaysWeather
            city={city}
            weather={dailyWeather[0]}
            timezone={timezone}
          />
          <HourlyWeather hourlyWeather={hourlyWeather} timezone={timezone} />
          <WeatherSongs songs={songs} />
        </div>
      </div>
    </div>
  );
}
