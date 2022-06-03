mapboxgl.accessToken = 'pk.eyJ1IjoiY3phcGF0YTE5OTIiLCJhIjoiY2t5YnVkbDhhMGl2ZzJub2xnM2p5eDJtbSJ9.QQ73wRoQpVXokaaRCpQQQw';
let busApiKey = '0759105001794edfb3a0ab5befbc1307'

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-71.091542,42.358862],
    zoom: 12
});

var marker = new mapboxgl.Marker(
  document.getElementById("blueBus")
)
.setLngLat([-71.092761, 42.365554])
.addTo(map);


// Request bus data from MBTA - 
async function getBusLocations(){
	const url = `https://api-v3.mbta.com/vehicles?api_key=${busApiKey}&filter[route]=1&include=trip`;
	const response = await fetch(url); //fetch data from the source
	const json = await response.json(); //convert data into JSON
	return json.data;
	//const location = [data[0].attributes.longitude, data[0].attributes.latitude];
}

//Pulls getbuslocations() every 15 seconds
async function run(){
    // get bus data 
	var longslat = [];   
	const locations = await getBusLocations();
	longslat.push(locations[0].attributes.longitude, locations[0].attributes.latitude);
  	console.log(longslat);
	console.log(new Date());
	// timer - updates every 15seconds to update from the data source

	marker.setLngLat(longslat);

	setTimeout(run, 15000);
}
run();
	
