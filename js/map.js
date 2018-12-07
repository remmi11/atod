// $(document).ready(function () {
//     "use strict";

mapboxgl.accessToken = 'pk.eyJ1Ijoid3RnZW9ncmFwaGVyIiwiYSI6ImNpdGFicWJqYjAwdzUydHM2M2g0MmhsYXAifQ.oO-MYNUC2tVeXa1xYbCIyw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-4.4085481716901995, 5.598509482775725],
    zoom: 2,
    maxzoom: 12
});

var geojson = "map-data2.php";
var geojson2 = "map-data2(2).php";

map.on('load', function () {

    map.addSource('samples', {
        "type": "geojson",
        "data": geojson2
    });

    map.addLayer({
        id: 'samples-heat',
        type: 'heatmap',
        source: 'samples',
        maxzoom: 15,
        paint: {
            // increase weight as diameter breast height increases
            'heatmap-weight': {
                property: 'ConcentrationNormalized',
                type: 'exponential',
                stops: [
                    [0, 1],
                    [2, 4]
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
    }, 'waterway-label');

    map.addLayer({
        id: 'samples-point',
        type: 'circle',
        source: 'samples',
        minzoom: 5,
        paint: {
            // increase the radius of the circle as the zoom level and ConcentrationNormalized value increases
              'circle-radius': {
                property: 'ConcentrationNormalized',
                type: 'exponential',
                stops: [
                    [5, 10],
                    [8, 15],
                    [10, 18]
                ]
              },
            //   'circle-color': {
            //     property: 'ConcentrationNormalized',
            //     type: 'exponential',
            //     stops: [
            //       [0, 'rgba(236,222,239,0)'],
            //       [0.2, 'rgb(236,222,239)'],
            //       [0.4, 'rgb(208,209,230)'],
            //       [0.6, 'rgb(166,189,219)'],
            //       [0.8, 'rgb(103,169,207)'],
            //       [1.0, 'rgb(28,144,153)']
            //     ]
            //   },
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
    }, 'waterway-label');

    map.on('click', 'samples-point', function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.features[0].geometry.coordinates)
            .setHTML('<b>Type Description: </b>' + e.features[0].properties.TypeDescription + 
            '<br><b>Concentration: </b>' + e.features[0].properties.Concentration +
            '<br><b>Unit: <b>' + e.features[0].properties.Unit +
            '<br><b>Date: <b>' + e.features[0].properties.Date +
            '<br><b>Notes: <b><br>' + e.features[0].properties.Unit )


            // TypeDescription (string)
            // Concentration (float)
            // Unit (string)
            // Date (string, [M/D/YYYY])
            // Notes (string)
            .addTo(map);
    });
});