
const restaurants = [
    { 
        name: "El Valle de Seta", 
        latitude: 39.4032738, 
        longitude: -0.3991262, 
        url: "parada1.html", 
        imageUrl: "parada1/parada1.png",
        rating: 1
    },
    { 
        name: "Castell de Cabres", 
        latitude: 39.3994776, 
        longitude: -0.3913431, 
        url: "parada2.html", 
        imageUrl: "parada2/parada2.png",
        rating: 2
    },
    { 
        name: "Tollos", 
        latitude: 39.400659,
        longitude: -0.3945479, 
        url: "parada3.html", 
        imageUrl: "parada3/parada3.png",
        rating: 1 
    },
    { 
        name: "Sacañet", 
        latitude: 39.3996542,
        longitude: -0.3948841, 
        url: "parada4.html", 
        imageUrl: "parada4/parada4.png",
        rating: 1 
    },
    { 
        name: "Espadilla", 
        latitude: 39.398679, 
        longitude: -0.3950342, 
         url: "parada5.html", 
        imageUrl: "parada5/parada5.png",
        rating: 1 
    },
    { 
        name: "Peña Saganta", 
        latitude: 39.3993797, 
        longitude: -0.3969805, 
         url: "parada6.html", 
        imageUrl: "parada6/parada6.png",
        rating: 1 
    },
    { 
        name: "La Cueva de Zanzano", 
        latitude: 39.3997543, 
        longitude: -0.3967426, 
         url: "parada7.html", 
        imageUrl: "parada7/parada7.png",
        rating: 1 
    },
    { 
        name: "Caminos del agua", 
        latitude: 39.4012488, 
        longitude: -0.3944826, 
         url: "parada8.html", 
        imageUrl: "parada8/parada8.png",
        rating: 1 
    },
    { 
        name: "Pavías", 
        latitude: 39.4015487, 
        longitude: -0.3925008, 
        url: "parada9.html", 
        imageUrl: "parada9/parada9.png",
        rating: 1 
    },
    { 
        name: "Puente Viejo", 
        latitude: 39.400603, 
        longitude: -0.3978505, 
         url: "parada10.html", 
        imageUrl: "parada10/parada10.png",
        rating: 1 
    },
    { 
        name: "El Valle de Travadell", 
        latitude: 39.397548, 
        longitude: -0.3976812, 
        url: "parada11.html", 
        imageUrl: "parada11/parada11.png",
        rating: 1 
    },
    { 
        name: "Mercado del pueblo", 
        latitude: 39.3960963, 
        longitude: -0.394664, 
         url: "parada12.html", 
        imageUrl: "parada12/parada12.png",
        rating: 1 
    },
    { 
        name: "Amor Propio", 
        latitude: 39.395143, 
        longitude: -0.3964856, 
         url: "parada13.html", 
        imageUrl: "parada13/parada13.png",
        rating: 1 
    },
    { 
        name: "Iglesia N.S. del Rosario", 
        latitude: 39.397268, 
        longitude: -0.389776, 
         url: "parada14.html", 
        imageUrl: "parada14/parada14.png",
        rating: 1 
    },
    { 
        name: "Iglesia de San Lorenzo", 
        latitude: 39.397548, 
        longitude: -0.3950342, 
         url: "parada15.html", 
        imageUrl: "parada15/parada15.png",
        rating: 1 
    },
    // Añade los demás restaurantes aquí con su respectiva imagen URL
];

document.addEventListener('DOMContentLoaded', function() {
    console.log('Documento cargado y listo');
    findRestaurants();
    checkProximity();
});

function findRestaurants() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                console.log('Ubicación obtenida:', latitude, longitude);
                displayRestaurants(latitude, longitude);
            },
            (error) => {
                alert("Error al obtener tu ubicación. Asegúrate de permitir el acceso a tu ubicación.");
            },
            {
                enableHighAccuracy: true,
                maximumAge: 10000,
                timeout: 5000
            }
        );
    } else {
        alert("Geolocalización no soportada en tu navegador. Intenta con otro dispositivo o navegador.");
    }
}

function displayRestaurants(userLat, userLng) {
    const list = document.getElementById('restaurantsList');
    list.innerHTML = ''; // Limpiar entradas anteriores

    restaurants.sort((a, b) => compareRestaurants(a, b, userLat, userLng));
    
    restaurants.forEach(restaurant => {
        renderRestaurant(restaurant, userLat, userLng);
    });
}

function compareRestaurants(a, b, userLat, userLng) {
    const distA = simplifiedDistance(userLat, userLng, a.latitude, a.longitude);
    const distB = simplifiedDistance(userLat, userLng, b.latitude, b.longitude);
    return distA !== distB ? distA - distB : b.rating - a.rating;
}

function renderRestaurant(restaurant, userLat, userLng) {
    const distKm = simplifiedDistance(userLat, userLng, restaurant.latitude, restaurant.longitude);
    const distMeters = (distKm * 1000).toFixed(0);
    const list = document.getElementById('restaurantsList');

    const item = document.createElement('li');

    const link = document.createElement('a');
    link.href = restaurant.url;
    link.style = "display: flex; align-items: center; text-decoration: none; color: inherit; width: 100%;"; // Distribuye el espacio entre los elementos

    const imageContainer = document.createElement('div');
    imageContainer.className = 'image-container';
    const image = document.createElement('img');
    image.src = restaurant.imageUrl; // Usa la URL de la imagen específica para cada restaurante
    image.alt = `Imagen de ${restaurant.name}`;
    image.style = "width: 50px; height: 50px; margin: 0 auto;"; // Centra la imagen dentro de su contenedor
    imageContainer.appendChild(image);

    const nameContainer = document.createElement('div');
    nameContainer.className = 'name-container'; // Contenedor para el nombre centrado
    const name = document.createElement('span');
    name.textContent = restaurant.name;
    nameContainer.appendChild(name);

    const distanceContainer = document.createElement('div');
    distanceContainer.className = 'distance-container'; // Contenedor para la distancia centrada
    const distance = document.createElement('span');
    distance.textContent = `${distMeters} m`;
    distanceContainer.appendChild(distance);

    link.appendChild(imageContainer); // Primero la imagen centrada
    link.appendChild(nameContainer); // Luego el nombre centrado
    link.appendChild(distanceContainer); // Finalmente la distancia centrada

    item.appendChild(link);
    list.appendChild(item);
}

// Simplified distance calculation to reduce complexity
function simplifiedDistance(lat1, lon1, lat2, lon2) {
    const x = lat2 - lat1;
    const y = (lon2 - lon1) * Math.cos(Math.PI / 180 * lat1);
    return Math.sqrt(x * x + y * y) * 111.32; // Approximation for kilometers
}

function checkProximity() {
    // Implementación de la función para verificar proximidad
}

function redirectToBestRated() {
    const maxRating = Math.max(...restaurants.map(r => r.rating));
    const bestRatedRestaurants = restaurants.filter(r => r.rating === maxRating);
    window.location.href = bestRatedRestaurants[Math.floor(Math.random() * bestRatedRestaurants.length)].url;
}

document.addEventListener('DOMContentLoaded', function() {
    // Resto del código existente
    console.log('Documento cargado y listo');
    findRestaurants();
    checkProximity();
    
    // Añadimos la llamada a checkAnswer cuando la página carga
    document.getElementById('questionSelect').addEventListener('change', checkAnswer);
});

function checkAnswer() {
    const select = document.getElementById('questionSelect');
    const hiddenText = document.getElementById('hiddenText');
    const incorrectText = document.getElementById('incorrectText');

    if (select.value === 'correct') {
        hiddenText.style.display = 'block';
        incorrectText.style.display = 'none';

        // Guardar la respuesta correcta en localStorage
        let correctAnswers = JSON.parse(localStorage.getItem('correctAnswers')) || [];
        const answer = {
            text: hiddenText.innerText,
            id: `answer-${correctAnswers.length + 1}`
        };
        correctAnswers.push(answer);
        localStorage.setItem('correctAnswers', JSON.stringify(correctAnswers));
    } else if (select.value === 'incorrect') {
        hiddenText.style.display = 'none';
        incorrectText.style.display = 'block';
    } else {
        hiddenText.style.display = 'none';
        incorrectText.style.display = 'none';
    }
}