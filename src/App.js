import React, { useEffect, useState } from "react";

const normalizeSongData = (data) => {
  const normalizedData = {
    danceability: (data.danceability - 0) / (1 - 0), // Assuming danceability ranges from 0 to 1
    loudness: (data.loudness - (-15)) / (0 - (-15)), // Assuming loudness ranges from -15 to 0
    energy: (data.energy - 0) / (1 - 0), // Assuming energy ranges from 0 to 1
  };
  return normalizedData;
};

const sendSongDataToBackend = (data) => {
  const normalizedData = normalizeSongData(data);

  fetch('http://localhost:5000/songdata', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...normalizedData, name: data.name }), // Include the name attribute
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((responseData) => {
      console.log(responseData);
    })
    .catch((error) => console.error("Error sending data to Flask:", error));
};

const App = () => {
  const songid = "6XQHlsNu6so4PdglFkJQRJ";
  const accessToken = "BQDzF9Q7AniTz02uG1-zYbTw95RvEKjuK5XHdu1QRdmNH_efK-MTtxwRfSjnllSd5l7cG6aunwmGtnazgNnWjIs5yTDoByQuqTb1IuHHnNjYp33K8Jc";
  const [songData, setSongData] = useState(null);
  const [songtrackData, setSongtrackData] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("");

  useEffect(() => {
    fetch(  
      `https://api.spotify.com/v1/audio-features/${songid}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSongData(data);
        console.log(data); // Log the fetched data
        sendSongDataToBackend(data);
        // Check conditions and set background color
        const { danceability, loudness, energy } = normalizeSongData(data);
        if (danceability <= 0.500 && loudness >= -9.00 && energy <= 0.300) {
          setBackgroundColor("blue");
        } else {
          setBackgroundColor("");
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [accessToken]);

  useEffect(() => {
    fetch(
      `https://api.spotify.com/v1/tracks/${songid}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSongtrackData(data);
        console.log(data); // Log the fetched data
        sendSongDataToBackend(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [accessToken]);

  return (
    <div className= {`flex items-center justify-center h-screen bg-${backgroundColor}-500 rounded-md p-4`}>
     <div className="">
     <div className="rounded-md p-4 bg-gray-200" >
      {songData ? (
        <div className="flex items-center justify-center text-3xl space-x-6 rounded-md">
          <div>Danceability: {songData.danceability}</div>
          <div>Loudness: {songData.loudness}</div>
          <div>Energy: {songData.energy}</div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {songtrackData ? (
        <div className="flex items-center justify-center py-10">
          <div className=" bg-blue-400 rounded-lg p-4">Song Name: {songtrackData.name}</div>
          {/* Add more track data here if needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
     </div>
    </div>
  );
};

export default App;
