// mapboxgl.accessToken = 'pk.eyJ1Ijoid3RnZW9ncmFwaGVyIiwiYSI6ImNpdGFicWJqYjAwdzUydHM2M2g0MmhsYXAifQ.oO-MYNUC2tVeXa1xYbCIyw';
mapboxgl.accessToken = 'pk.eyJ1IjoiYXRvZCIsImEiOiJjanA5anp5cnQwNTB5M3JvNTgyeTR1NjZiIn0.q5oquljep0gfRnaIsgBGiA';

var map = new mapboxgl.Map({
    container: 'map',
    // style: 'mapbox://styles/mapbox/streets-v9',
    style: 'mapbox://styles/atod/cjpgfws3y56qm2rodj9kyegy0',
    center: [39.701319, 21.697954],
    center: [-4.4085481716901995, 5.598509482775725],
    zoom: 2,
    minzoom: 2,
    maxzoom: 12
});

var geojson = "map-data2.php";

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
                  [{ zoom: 5, value: 0.9 }, 0],
                  [{ zoom: 5, value: 1 }, 15],
                  [{ zoom: 5, value: 5 }, 15],
                  [{ zoom: 8, value: 0 }, 0],
                  [{ zoom: 8, value: 0.99 }, 0],
                  [{ zoom: 8, value: 1 }, 25],
                  [{ zoom: 8, value: 5 }, 25],
                  [{ zoom: 10, value: 0 }, 20],
                  [{ zoom: 10, value: 0.99 }, 0],
                  [{ zoom: 10, value: 1 }, 45],
                  [{ zoom: 10, value: 5 }, 45],
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
                property: 'ConcentrationNormalized',
                type: 'exponential',
                stops: [
[                    [{ zoom: 5, value: 0 }, 0],
                    [{ zoom: 5, value: 0.9 }, 0],
                    [{ zoom: 5, value: 1 }, 15],
                    [{ zoom: 5, value: 5 }, 15],
                    [{ zoom: 8, value: 0 }, 0],
                    [{ zoom: 8, value: 0.99 }, 0],
                    [{ zoom: 8, value: 1 }, 25],
                    [{ zoom: 8, value: 5 }, 25],
                    [{ zoom: 10, value: 0 }, 20],
                    [{ zoom: 10, value: 0.99 }, 0],
                    [{ zoom: 10, value: 1 }, 45],
                    [{ zoom: 10, value: 5 }, 45],]
                ]
              },
            'circle-color': [
                'match',
                ['get', 'DisplayColor'],
                '5493', '#005493',
                '941100', '#941100',
                '945200', '#945200',
                '0096FF', '#0096ff',
                'EBEBEB', '#EBEBEB',
                'FF7E79', '#FF7E79',
                'ffc79', '#0ffc79',
                'FFD479', '#FFD479',
                /* other */ '#ccc'
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

    // var bounds = new mapboxgl.LngLatBounds();
    // var features = map.queryRenderedFeatures({ layers: ['samples-heat'] });
    // // var feature = features[0];
    // features.forEach(function (e) {
    //     bounds.extend(e.geometry.coordinates);
    //     // console.log(e[0].geometry)
    // });

    // map.fitBounds(bounds);    
});

map.on('click', 'samples-point', function (e) {
    new mapboxgl.Popup()

        .setLngLat(e.features[0].geometry.coordinates)

        .setHTML('<div id=\'popup\' class=\'popup\' style=\'z-index: 10;\'> <span style=\'font-weight: 900;\'>' + e.features[0].properties.TypeDescription + '</span>' +
        '<ul class=\'list-group\'>' + '<b>Concentration: </b>' + e.features[0].properties.Concentration + ' ' + e.features[0].properties.Unit +
        '<li class=\'list-group-item\'>' + e.features[0].properties.Date +' </li>' +
        '<li class=\'list-group-item\'><b>Notes:</b><br>' + e.features[0].properties.Notes + ' </li></ul></div>')

        .addTo(map);
       
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl({ position: 'top-left' }));