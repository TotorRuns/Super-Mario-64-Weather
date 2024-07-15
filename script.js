async function changeBackground() {
    let level = document.getElementById('level-input').value;
    let backgroundImage = document.body;
    let backgroundimage = '';
    let city = '';

    switch(level) {
        case 'BOB':
            backgroundimage = 'Assets/SM64_Levels/BOB.png';
            city = 'New York';
            break;
        case 'WF':
            backgroundimage = 'Assets/SM64_Levels/WF.png';
            city = 'Berlin';
            break;
        case 'JRB':
            backgroundimage = 'Assets/SM64_Levels/JRB.png';
            city = 'Venice';
            break;
        case 'CCM':
            backgroundimage = 'Assets/SM64_Levels/CCM.png';
            city = 'Canberra';
            break;
        case 'BBH':
            backgroundimage = 'Assets/SM64_Levels/BBH.png';
            city = 'Edinburgh';
            break;
        case 'HMC':
            backgroundimage = 'Assets/SM64_Levels/HMC.png';
            city = 'Vienna';
            break;
        case 'LLL':
            backgroundimage = 'Assets/SM64_Levels/LLL.png';
            city = 'Saudi Arabia';
            break;
        case 'SSL':
            backgroundimage = 'Assets/SM64_Levels/SSL.png';
            city = 'Cairo';
            break;
        case 'DDD':
            backgroundimage = 'Assets/SM64_Levels/DDD.png';
            city = 'Sydney';
            break;
        case 'SL':
            backgroundimage = 'Assets/SM64_Levels/SL.png';
            city = 'Antartica';
            break;
        case 'WDW':
            backgroundimage = 'Assets/SM64_Levels/WDW.png';
            city = 'Amsterdam';
            break;
        case 'TTM':
            backgroundimage = 'Assets/SM64_Levels/TTM.png';
            city = 'Innsbruck';
            break;
        case 'THI':
            backgroundimage = 'Assets/SM64_Levels/THI.png';
            city = 'Tokyo';
            break;
        case 'TTC':
            backgroundimage = 'Assets/SM64_Levels/TTC.png';
            city = 'London';
            break;
        case 'RR':
            backgroundimage = 'Assets/SM64_Levels/RR.png';
            city = 'Paris';
            break;
        default:
            backgroundimage = 'Assets/SM64_Levels/CastleC.png';
            city = 'Merano';
    }
    backgroundImage.style.backgroundImage = 'url(\'' + backgroundimage + '\')';

    const geocodingUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${city}`;

    try {
        const geocodingResponse = await fetch(geocodingUrl);
        const geocodingData = await geocodingResponse.json();
        const latitude = geocodingData[0].lat;
        const longitude = geocodingData[0].lon;

        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=Europe/Berlin`;

        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();
        document.querySelector('.temperature').textContent = `${Math.round(weatherData.current_weather.temperature)}°C`;
        document.querySelector('.description').textContent = getWeatherDescription(weatherData.current_weather.weathercode);
        
        const weatherIcon = getWeatherIcon(weatherData.current_weather.weathercode);
        document.querySelector('.weather-icon').src = weatherIcon;
        document.querySelector('.weather-icon').alt = getWeatherDescription(weatherData.current_weather.weathercode);
    } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
    }

    document.querySelector('.weather-container').style.display = 'inline-block';
    ausgabe();
}

function ausgabe() {
    const userInput = document.getElementById('level-input').value;
    document.getElementById('user-input-display').textContent = 'Aktuelles Wetter in ' + userInput + ':';
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

function getWeatherIcon(weatherCode) {
    const weatherIcons = {
        0: 'Assets/Weather_Icons/day_clear.png',
        1: 'Assets/Weather_Icons/day_clear.png',
        2: 'Assets/Weather_Icons/day_partial_cloud.png',
        3: 'Assets/Weather_Icons/cloudy.png',
        45: 'Assets/Weather_Icons/fog.png',
        48: 'Assets/Weather_Icons/mist.png',
        51: 'Assets/Weather_Icons/rain.png',
        53: 'Assets/Weather_Icons/rain.png',
        55: 'Assets/Weather_Icons/rain.png',
        56: 'Assets/Weather_Icons/sleet.png',
        57: 'Assets/Weather_Icons/sleet.png',
        61: 'Assets/Weather_Icons/rain.png',
        63: 'Assets/Weather_Icons/rain.png',
        65: 'Assets/Weather_Icons/rain.png',
        66: 'Assets/Weather_Icons/sleet.png',
        67: 'Assets/Weather_Icons/sleet.png',
        71: 'Assets/Weather_Icons/snow.png',
        73: 'Assets/Weather_Icons/snow.png',
        75: 'Assets/Weather_Icons/snow.png',
        77: 'Assets/Weather_Icons/snow_grains.png',
        80: 'Assets/Weather_Icons/rain.png',
        81: 'Assets/Weather_Icons/rain.png',
        82: 'Assets/Weather_Icons/rain.png',
        85: 'Assets/Weather_Icons/snow.png',
        86: 'Assets/Weather_Icons/snow.png',
        95: 'Assets/Weather_Icons/rain_thunder.png',
        96: 'Assets/Weather_Icons/snow_thunder.png',
        99: 'Assets/Weather_Icons/snow_thunder.png'
    };
    return weatherIcons[weatherCode] || 'Assets/Weather_Icons/unknown.png';
}