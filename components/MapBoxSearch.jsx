import { useState } from "react";

export const MapBoxSearch = ({ onSetPlace }) => {
  const mapboxKey =
    "pk.eyJ1IjoiYWxsdGhlY29kZSIsImEiOiJjbDVjZXlsZ28wZ282M2NvMmxxbTZwcjgwIn0.6Tp5Y15w18VFLN2bAEQPaQ";

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/LOCATION.json?access_token=${mapboxKey}`;

  const [places, setPlaces] = useState([]);

  const onChangeHandler = (e) => {
    console.log(e.target.value);

    const searchUrl = url.replace("LOCATION", encodeURI(e.target.value));

    fetch(searchUrl)
      .then((response) => response.json())
      .then((data) => {
        setPlaces(data.features);
        console.log(data.features);
      });
  };

  const onPlaceClickHandler = (place) => {
    onSetPlace(place.center, place.place_name);
    setPlaces([]);
  };

  return (
    <div>
      <input
        onChange={(e) => onChangeHandler(e)}
        type="text"
        className="rounded border p-1 w-full"
      />
      {!!places.length && (
        <div className="absolute bg-white border rounded shadow-lg mt-1 max-w-[75%]">
          {places.map((place) => (
            <div
              onClick={() => onPlaceClickHandler(place)}
              className="border-b p-2"
              key={place.id}
            >
              {place.place_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
