/* eslint-disable */
const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken = 'pk.eyJ1Ijoic2NoYWRlOSIsImEiOiJja244M2N1YWEwNWxmMm5waW1ya2w4am9vIn0.hI-ElJjcj0EB-JoM1JmX_g';

var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/schade9/ckn83zgqe104j17nto3mpy8j8',
	scrollZoom: false
	// center: [-118.124633, 34.126961],
	// zoom: 10,
	// interactive: false
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(loc => {
	// Create marker
	const el = document.createElement('div');
	el.className = 'marker';

	// Add marker
	new mapboxgl.Marker({
		element: el,
		anchor: 'bottom'
	})
		.setLngLat(loc.coordinates)
		.addTo(map);

	// Add popup
	new mapboxgl.Popup({
		offset: 30
	})
		.setLngLat(loc.coordinates)
		.setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
		.addTo(map);

	// Extend map bounds to include current location
	bounds.extend(loc.coordinates)
});

map.fitBounds(bounds, {
	padding: {
		top: 200,
		bottom: 150,
		left: 100,
		right: 100
	}
});