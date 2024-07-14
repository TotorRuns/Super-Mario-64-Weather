async function changeBackground() {
    let level = document.getElementById('level-input').value;
    let backgroundImage = document.body;
    let backgroundimage = "mario_background.jpg";
    let city = '';

    switch(level) {
        case 'BOB':
            backgroundimage = 'bob.png';
            city = 'New York'; // Beispielstadt für Bob-omb Battlefield
            break;
        case 'WF':
            backgroundimage = 'wf.png';
            city = 'Berlin'; // Beispielstadt für Whomp's Fortress
            break;
        case 'JRB':
            backgroundimage = 'jrb.jpg';
            city = 'Venice'; // Beispielstadt für Jolly Roger Bay
            break;
        case 'LLL':
            backgroundimage = 'lll.png';
            city = 'Furnance Creek';
            break;
        // Fügen Sie hier weitere Level hinzu
        default:
            backgroundimage = 'mario_background.png'; // Standardhintergrund // Standardstadt
    }
    backgroundImage.style.backgroundImage = "url('" + backgroundimage + "')";

    // Koordinaten der Stadt von der Nominatim API abrufen
    const geocodingUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${city}`;

    try {
        const geocodingResponse = await fetch(geocodingUrl);
        const geocodingData = await geocodingResponse.json();
        const latitude = geocodingData[0].lat;
        const longitude = geocodingData[0].lon;

        // Wetterdaten von der Open-Meteo API abrufen
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=Europe/Berlin`;

        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();
        document.querySelector('.temperature').textContent = `${Math.round(weatherData.current_weather.temperature)}°C`;
        document.querySelector('.description').textContent = getWeatherDescription(weatherData.current_weather.weathercode);
        // Open-Meteo API liefert keine Icons, daher wird das Icon nicht aktualisiert
    } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
    }

    // Zeige das Wetter-Container an, nachdem der Button geklickt wurde
    document.querySelector('.weather-container').style.display = 'inline-block';
    ausgabe();
}

function ausgabe() {
    const userInput = document.getElementById('level-input').value;
    document.getElementById('user-input-display').textContent = "Aktuelles Wettern in "+ userInput + ":";
};

function getWeatherDescription(weatherCode) {
    const weatherDescriptions = {
        0: 'Klarer Himmel',
        1: 'Überwiegend klar',
        2: 'Teilweise bewölkt',
        3: 'Bewölkt',
        45: 'Nebel',
        48: 'Reifnebel',
        51: 'Leichter Nieselregen',
        53: 'Mäßiger Nieselregen',
        55: 'Starker Nieselregen',
        56: 'Leichter gefrierender Nieselregen',
        57: 'Starker gefrierender Nieselregen',
        61: 'Leichter Regen',
        63: 'Mäßiger Regen',
        65: 'Starker Regen',
        66: 'Leichter gefrierender Regen',
        67: 'Starker gefrierender Regen',
        71: 'Leichter Schneefall',
        73: 'Mäßiger Schneefall',
        75: 'Starker Schneefall',
        77: 'Schneekörner',
        80: 'Leichte Regenschauer',
        81: 'Mäßige Regenschauer',
        82: 'Starke Regenschauer',
        85: 'Leichte Schneeschauer',
        86: 'Starke Schneeschauer',
        95: 'Gewitter',
        96: 'Gewitter mit leichtem Hagel',
        99: 'Gewitter mit starkem Hagel'
    };
    return weatherDescriptions[weatherCode] || 'Unbekanntes Wetter';
}