// map.js

// Initializing the map and setting the view
const map = L.map('map-container').setView([50.4501, 30.6400], 6); // Default to Kyiv, Ukraine

// Adding the tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Sample exhibition data
const exhibitions = [
  {
    city: 'Kyiv',
    name: 'Exhibition 1',
    lat: 50.4501,
    lon: 30.6400,
    date: '2025-01-15'
  },
  {
    city: 'Lviv',
    name: 'Exhibition 2',
    lat: 49.8397,
    lon: 24.0297,
    date: '2025-01-20'
  },
  {
    city: 'Odessa',
    name: 'Exhibition 3',
    lat: 46.4825,
    lon: 30.7233,
    date: '2025-01-22'
  }
];

// Function to add markers to the map based on the selected filters
function addMarkers(cityFilter, dateFilter) {
  // Clear all existing markers
  map.eachLayer(function(layer) {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });

  // Filter exhibitions based on selected city and date
  const filteredExhibitions = exhibitions.filter(exhibition => {
    const matchesCity = cityFilter ? exhibition.city === cityFilter : true;
    const matchesDate = dateFilter ? exhibition.date === dateFilter : true;
    return matchesCity && matchesDate;
  });

  // Add markers for filtered exhibitions
  filteredExhibitions.forEach(exhibition => {
    L.marker([exhibition.lat, exhibition.lon])
      .addTo(map)
      .bindPopup(`<b>${exhibition.name}</b><br>${exhibition.city}<br>${exhibition.date}`);
  });

  // Show a message if no exhibitions are found
  const messageElement = document.getElementById('message');
  if (filteredExhibitions.length === 0) {
    messageElement.textContent = 'No exhibitions found for the selected filters.';
  } else {
    messageElement.textContent = '';
  }
}

// Event listener for city filter change
document.getElementById('city-select').addEventListener('change', (event) => {
  const city = event.target.value;
  const date = document.getElementById('date-select').value;
  addMarkers(city, date);
});

// Event listener for date filter change
document.getElementById('date-select').addEventListener('change', (event) => {
  const date = event.target.value;
  const city = document.getElementById('city-select').value;
  addMarkers(city, date);
});

// Initial load of markers
addMarkers('', ''); // Show all exhibitions initially
