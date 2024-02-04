# Mood-Responsive Lighting System

This project creates a mood-responsive lighting system that syncs with Spotify songs, adjusting bulb colors based on music features like danceability, instrumentation, and energy levels.

## Backend (Flask)

### Installation
1. Install Python 3.x from [python.org](https://www.python.org/downloads/).
2. Clone this repository.
3. Navigate to the `backend` directory.
4. Create a virtual environment:
    ```bash
    python3 -m venv venv
    ```
5. Activate the virtual environment:
    - On macOS and Linux:
        ```bash
        source venv/bin/activate
        ```
    - On Windows (cmd.exe):
        ```bash
        venv\Scripts\activate
        ```
6. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
7. Set up Spotify API credentials:
    - Create a Spotify Developer account and create a new application.
    - Add `http://localhost:5000/callback` as a Redirect URI in your Spotify application settings.
    - Copy the Client ID and Client Secret into `config.py`.
8. Run the Flask server:
    ```bash
    python app.py
    ```

## Frontend (React.js)

### Installation
1. Install Node.js from [nodejs.org](https://nodejs.org/en/download/).
2. Clone this repository.
3. Navigate to the `frontend` directory.
4. Install dependencies:
    ```bash
    npm install
    ```
5. Set up environment variables:
    - Rename `.env.example` to `.env`.
    - Set the REACT_APP_API_URL variable in `.env` to `http://localhost:5000` or the URL where your Flask server is running.
6. Run the React development server:
    ```bash
    npm start
    ```

Open your web browser and navigate to `http://localhost:3000` to see the mood-responsive lighting system in action!
