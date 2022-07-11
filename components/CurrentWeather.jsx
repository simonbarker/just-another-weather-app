import { useEffect, useState } from "react";

export const CurrentWeather = ({
  center,
  placeName,
  handleFavouriteClick,
  favouritesList,
}) => {
  const [weatherData, setWeatherData] = useState({});
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    fetch(`/api/weatherkit?lon=${center[0]}&lat=${center[1]}`)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
      });
  }, [center]);

  useEffect(() => {
    const found = favouritesList.find(
      (place) => place.place_name === placeName
    );

    if (found) {
      setIsFavourite(true);
    } else {
      setIsFavourite(false);
    }
  }, [placeName, favouritesList]);

  const localSetFavouriteHandler = () => {
    handleFavouriteClick(isFavourite);
    setIsFavourite(!isFavourite);
  };

  return (
    <div className="border shadow-md p-4 flex flex-col gap-y-4">
      <div className="font-black text-center">Current Weather: {placeName}</div>
      <div
        className={`text-center text-5xl ${
          weatherData?.currentWeather?.temperature > 13
            ? "text-red-500"
            : "text-sky-500"
        }`}
      >
        <span className="font-black">
          {weatherData?.currentWeather?.temperature ?? 12}
        </span>
        <span className="font-thin">&deg;C</span>
      </div>
      <div className="flex flex-row justify-around text-center">
        <div className="">
          <div className="font-bold">
            {weatherData?.currentWeather?.windSpeed ?? 10}
          </div>
          <div>Wind</div>
        </div>
        <div className="">
          <div className="font-bold">
            {weatherData?.currentWeather?.uvIndex ?? 0}
          </div>
          <div>UV</div>
        </div>
        <div className="">
          <div className="font-bold">
            {weatherData?.currentWeather?.cloudCover ?? 50}%
          </div>
          <div>Cloud</div>
        </div>
      </div>
      <div className="text-sm text-center">
        Weather data from Apple WeatherKit
      </div>
      <button onClick={localSetFavouriteHandler} className="rounded border p-2">
        {isFavourite ? "Remove From Favourites" : "Add To Favourites"}
      </button>
    </div>
  );
};
