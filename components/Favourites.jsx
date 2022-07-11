import { useEffect, useState } from "react";

export const Favourites = ({
  onSetPlace,
  setShowFavourites,
  favouritesList,
}) => {
  const onPlaceClickHandler = (place) => {
    onSetPlace(place.center, place.place_name);
    setShowFavourites(false);
  };

  return (
    <div className="bg-white rounded px-2 pt-2">
      <div className="text-2xl font-bold pb-2">Favourites</div>
      {favouritesList.map((place, index) => {
        return (
          <div
            onClick={() => onPlaceClickHandler(place)}
            key={place.place_name}
            className={`${
              index === favouritesList.length - 1 ? "" : "border-b"
            } py-2 cursor-pointer`}
          >
            {place.place_name}
          </div>
        );
      })}
    </div>
  );
};
