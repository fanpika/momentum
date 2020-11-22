const weather = document.querySelector(".js-weather");

const API_KEY = "9fb214c81cdf052dab96cf8825594c13";
const COORDS = 'coords';

function getWeather(lat, lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            console.log(json);
            const temperature = Math.floor(json.main.temp);
            const place = `${json.name} ${json.sys.country}`;
            weather.innerText = `${temperature}℃ ${place}`
        });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        // latitude: latitude,
        // longitude: longitude
        // javascript 오브젝트에서 key와 value의 이름이 같을때는 밑과같이 쓸 수 있다.
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("Cant access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();