from flask import Flask, request, jsonify
from flask_cors import CORS
import asyncio
from pywizlight import wizlight, PilotBuilder

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Define the async function to control the bulb


async def control_bulb():
    bulb_ip = "192.168.143.138"
    light = wizlight(bulb_ip)
    builder = PilotBuilder()
    builder._set_scene(2)  # Set the scene
    await light.turn_on(builder)
    light.send(builder)  # Send the pilot to the bulb
    print("Bulb turned on with specified parameters.")


@app.route('/songdata', methods=['POST'])
def receive_song_data():
    data = request.json
    # Assuming the song data sent from the frontend includes danceability, loudness, and energy
    danceability = data.get('danceability')
    loudness = data.get('loudness')
    energy = data.get('energy')

    # Check if any of the data is None, and set default values if needed
    danceability = danceability if danceability is not None else 0
    loudness = loudness if loudness is not None else -15
    energy = energy if energy is not None else 0

    # Assuming the conditions for setting the scene in the bulb to 2
    if danceability <= 0.500 and loudness >= -9.00 and energy <= 0.300:
        # Call the async function to control the bulb
        asyncio.run(control_bulb())

    # You can send a response back to the frontend if needed
    response = {'message': 'Song data received successfully'}
    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True)
