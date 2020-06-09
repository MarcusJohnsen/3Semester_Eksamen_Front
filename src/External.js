import React, { useState } from "react";
import settingUrl from "./settings";

export function External() {
  const [norris, setNorris] = useState(<br />);
  const [dad, setDad] = useState(<br />);

  const URL = settingUrl.externalApi();

  function fetchExternalApi() {
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    fetch(URL, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDad(data.dadJoke);
        setNorris(data.chuckJoke);
      });
  }
  return (
    <div>
      <h1>External API</h1>
      <h2>This is the perfect place if you love terrible jokes!</h2>
      <button onClick={fetchExternalApi}>Press to fetch from API's!</button>
      <br />
      <h2>Chuck Norris joke: </h2>
      <p>{norris}</p>
      <h2>Dad joke:</h2>
      <p>{dad}</p>
      <p>Below is my other cat:</p>
      <img
        src="https://scontent-cph2-1.xx.fbcdn.net/v/t1.15752-9/94038632_248270322982754_2434719490114584576_n.jpg?_nc_cat=110&_nc_sid=b96e70&_nc_ohc=9KFeN9X7dBEAX-4oIpD&_nc_ht=scontent-cph2-1.xx&oh=26b811ce36a7e70fa0a73a8d1dea5a41&oe=5EC18105"
        alt="cat2"
        style={{ width: 300, height: 380 }}
      />
    </div>
  );
}
