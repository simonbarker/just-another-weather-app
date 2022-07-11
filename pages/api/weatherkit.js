import jwt from "jsonwebtoken";
import process from "process";

export default async function handler(req, res) {
  const getWeather = async () => {
    var privateKey = process.env.WEATHER_KIT.replace(/\\n/g, "\n");
    var token = jwt.sign(
      {
        sub: "com.allthecode.jawa",
      },
      privateKey,
      {
        issuer: "YV4CVWZ68D",
        expiresIn: "1h",
        keyid: "W2FH247X5P",
        algorithm: "ES256",
        header: {
          id: "YV4CVWZ68D.com.allthecode.jawa",
        },
      }
    );

    console.log(token);

    const url = `https://weatherkit.apple.com/api/v1/weather/en/${req.query.lat}/${req.query.lon}?dataSets=currentWeather&timezone=Europe/London`;

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const response = await fetch(url, config);
    console.log(response);
    const data = await response.json();
    return data;
  };

  try {
    const data = await getWeather();
    // console.log(data);
    res.status(200).json(data);
  } catch (error) {
    // console.log(error);
    res.status(400).json({ error: error.message });
  }
}
