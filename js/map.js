$(function () {
    $("#legend").toggle(function () {
        $(this).animate({right:'0px'}, {queue: false, duration: 500});
    }, function () {
        $(this).animate({right:'-200px'}, {queue: false, duration: 500});
    });
});

mapboxgl.accessToken = 'pk.eyJ1IjoiYXRvZCIsImEiOiJjanA5anp5cnQwNTB5M3JvNTgyeTR1NjZiIn0.q5oquljep0gfRnaIsgBGiA';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/atod/cjpgfws3y56qm2rodj9kyegy0',
    center: [1.522281952417984, 27.10609555592403],
    zoom: 1
});

var geojson = "map-data.php";

map.on('load', function () {

    map.addSource('samples', {
        "type": "geojson",
        "data": geojson
    });

    map.addLayer({
        id: 'samples-heat',
        type: 'heatmap',
        source: 'samples',
        maxzoom: 15,
        paint: {
            // increase weight as ConcentrationNormalized increases
            'heatmap-weight': {
                property: 'ConcentrationNormalized',
                type: 'exponential',
                stops: [
                    [0, 0],
                    [1, 5]
                ]
            },
            // increase intensity as zoom level increases
            'heatmap-intensity': {
                stops: [
                    [11, 1],
                    [15, 3]
                ]
            },
            // assign color values be applied to points depending on their density
            'heatmap-color': [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0, "rgba(33,102,172,0)",
                0.2, "rgb(103,169,207)",
                0.4, "rgb(209,229,240)",
                0.6, "rgb(253,219,199)",
                0.8, "rgb(239,138,98)",
                1, "rgb(178,24,43)"
            ],
            // increase radius as zoom increases
            'heatmap-radius': {
                // [zoom, radius]
                stops: [
                    [4, 10],
                    [6, 12],
                    [8, 14],
                    [10, 20]
                ]
            },
            // decrease opacity to transition into the circle layer
            'heatmap-opacity': {
                default: 1,
                // [zoom, opacity]
                stops: [
                    [2, 1],
                    [8, 0]
                ]
            },
        }
    });

    map.addLayer({
        id: 'samples-point2',
        type: 'circle',
        source: 'samples',
        minzoom: 5,
        paint: {
            'circle-radius': {
                property: 'ConcentrationNormalized',
                type: 'exponential',
                stops: [
                    [{ zoom: 5, value: 0 }, 0],
                    [{ zoom: 5, value: 0.999 }, 0],
                    [{ zoom: 5, value: 1 }, 13],
                    [{ zoom: 5, value: 5 }, 13],
                    [{ zoom: 8, value: 0 }, 0],
                    [{ zoom: 8, value: 0.999 }, 0],
                    [{ zoom: 8, value: 1 }, 18],
                    [{ zoom: 8, value: 5 }, 18],
                    [{ zoom: 10, value: 0 }, 0],
                    [{ zoom: 10, value: 0.999 }, 0],
                    [{ zoom: 10, value: 1 }, 23],
                    [{ zoom: 10, value: 5 }, 23],
                ]
            },
            'circle-color': 'red',
            'circle-stroke-color': 'red',
            'circle-stroke-width': 0,
            'circle-opacity': {
                stops: [
                    [5, 0],
                    [6, 1]
                ]
            }
        }
    });

    map.addLayer({
        id: 'samples-point',
        type: 'circle',
        source: 'samples',
        minzoom: 5,
        paint: {
            'circle-radius': {
                stops: [
                    [5, 10],
                    [8, 15],
                    [10, 20]
                ]
            },
            'circle-color': [
                'match',
                ['get', 'DisplayColor'],
                '005493', '#005493',
                '0096FF', '#0096FF',
                '941100', '#941100',
                'FF7D78', '#FF7D78',
                'FF9300', '#FF9300',
                '935100', '#935100',
                'EAEAEA', '#EAEAEA',
                'FFD478', '#FFD478',
                'FEFC78', '#FEFC78',
                /* other */ '#D783FF'
            ],
            'circle-stroke-color': 'black',
            'circle-stroke-width': 0,
            'circle-opacity': {
                stops: [
                    [5, 0],
                    [6, 1]
                ]
            }
        }
    });
});

map.on('click', 'samples-point', function (e) {
    new mapboxgl.Popup()

        .setLngLat(e.features[0].geometry.coordinates)

        // .setHTML('<div id=\'popup\' class=\'popup\' style=\'z-index: 10;\'> <span style=\'font-weight: 900;\'>' + e.features[0].properties.TypeDescription + '</span>' +
        // '<ul class=\'list-group\'>' + '<b>Concentration: </b>' + e.features[0].properties.Concentration + ' ' + e.features[0].properties.Unit +
        // '<li class=\'list-group-item\'>' + e.features[0].properties.Date +' </li>' +
        // '<li class=\'list-group-item\'><b>Notes:</b><br>' + e.features[0].properties.ConcentrationNormalized + ' </li></ul></div>')

        .setHTML('<span style=\'font-weight: 900;\'>' + e.features[0].properties.TypeDescription + '</span>' +
            '<ul class=\'list-group\'>' + '<b>Concentration: </b>' + e.features[0].properties.Concentration + ' ' + e.features[0].properties.Unit +
            '<li class=\'list-group-item\'>' + e.features[0].properties.Date + ' </li>' +
            '<li class=\'list-group-item\'><b>Notes:</b><br>' + e.features[0].properties.Notes + ' </li></ul></div>')

        .addTo(map);

});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl({ position: 'top-left' }));

dict = {
    '#005493': 'Human - Blood',
    '#0096FF': 'Human - Urine',
    '#941100': 'Livestock - Blood',
    '#FF7D78': 'Livestock - Urine',
    '#FF9300': 'Food - Peanuts',
    '#935100': 'Food - Cocoa',
    '#EAEAEA': 'Food - Milk',
    '#FFD478': 'Food - Wheat',
    '#FEFC78': 'Food - Corn',
    '#D783FF': 'Food - Other'
}

for (var key in dict) {
    //   console.log( key, dict[key] );
    // legend.insertAdjacentHTML('beforeend', '<div><span style="width:' + 15 + 'px;height:' + 15 + 'px;margin: 0 ' + [(20 - 15) / 2] + 'px;background-color:' + key + ';"></span><p>' + dict[key] + '</p><br></div>');
    legend.insertAdjacentHTML('beforeend', '<div><span style="width:' + 15 + 'px;height:' + 15 + 'px;margin: 0' + 'px;background-color:' + key + ';"></span><p>' + dict[key] + '</p><br></div>');

}
legend.insertAdjacentHTML('beforeend', '<div><span style="width:' + 15 + 'px;height:' + 15 + 'px;margin: 0' + 'px;background-color: #ffffff; border: 2px solid red;"></span><br><p>' + 'Above Normal Range' + '</p><br></div>');
// legend.insertAdjacentHTML('beforeend', '<div><span style="width:' + 15 + 'px;height:' + 15 + 'px;margin: 0 ' + [(20 - 15) / 2] + 'px;background-color: #ffffff; border: 2px solid red;"></span><br><p>' + 'Above Normal Range' + '</p><br></div>');