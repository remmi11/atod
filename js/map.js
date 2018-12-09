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
            // increase weight as diameter breast height increases
            'heatmap-weight': {
                property: 'ConcentrationNormalized',
                type: 'exponential',
                stops: [
                    [0, 0],
                    [1.5, 4]
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
            // 'circle-radius': {
            //     property: 'ConcentrationNormalized',
            //     type: 'exponential',
            //     stops: [
            //         [5, 10],
            //         [8, 15],
            //         [10, 18]
            //     ]
            // },
            'circle-radius': {
                property: 'ConcentrationNormalized',
                type: 'exponential',
                stops: [
                  [{ zoom: 6, value: 0 }, 7],
                  [{ zoom: 6, value: 0.1 }, 7],
                  [{ zoom: 6, value: 0.2 }, 7],
                  [{ zoom: 6, value: 0.3 }, 7],
                  [{ zoom: 6, value: 0.4 }, 7],
                  [{ zoom: 6, value: 0.5 }, 7],
                  [{ zoom: 6, value: 0.6 }, 7],
                  [{ zoom: 6, value: 0.7 }, 7],
                  [{ zoom: 6, value: 0.8 }, 7],
                  [{ zoom: 6, value: 0.9 }, 7],
                  [{ zoom: 6, value: 1 }, 10],
                  [{ zoom: 6, value: 1.1 }, 10],
                  [{ zoom: 6, value: 1.2 }, 10],
                  [{ zoom: 6, value: 1.3 }, 10],
                  [{ zoom: 6, value: 1.4 }, 10],
                  [{ zoom: 6, value: 1.5 }, 10],
                  [{ zoom: 6, value: 1.6 }, 10],
                  [{ zoom: 6, value: 1.7 }, 10],
                  [{ zoom: 6, value: 1.8 }, 10],
                  [{ zoom: 6, value: 1.9 }, 10],
                  [{ zoom: 8, value: 0 }, 13],
                  [{ zoom: 8, value: 0.1 }, 13],
                  [{ zoom: 8, value: 0.2 }, 13],
                  [{ zoom: 8, value: 0.3 }, 13],
                  [{ zoom: 8, value: 0.4 }, 13],
                  [{ zoom: 8, value: 0.5 }, 13],
                  [{ zoom: 8, value: 0.6 }, 13],
                  [{ zoom: 8, value: 0.7 }, 13],
                  [{ zoom: 8, value: 0.8 }, 13],
                  [{ zoom: 8, value: 0.9 }, 13],
                  [{ zoom: 8, value: 1 }, 20],
                  [{ zoom: 8, value: 1.1 }, 20],
                  [{ zoom: 8, value: 1.2 }, 20],
                  [{ zoom: 8, value: 1.3 }, 20],
                  [{ zoom: 8, value: 1.4 }, 20],
                  [{ zoom: 8, value: 1.5 }, 20],
                  [{ zoom: 8, value: 1.6 }, 20],
                  [{ zoom: 8, value: 1.7 }, 20],
                  [{ zoom: 8, value: 1.8 }, 20],
                  [{ zoom: 8, value: 1.9 }, 20],
                  [{ zoom: 10, value: 0 }, 20],
                  [{ zoom: 10, value: 0.1 }, 20],
                  [{ zoom: 10, value: 0.2 }, 20],
                  [{ zoom: 10, value: 0.3 }, 20],
                  [{ zoom: 10, value: 0.4 }, 20],
                  [{ zoom: 10, value: 0.5 }, 20],
                  [{ zoom: 10, value: 0.6 }, 20],
                  [{ zoom: 10, value: 0.7 }, 20],
                  [{ zoom: 10, value: 0.8 }, 20],
                  [{ zoom: 10, value: 0.9 }, 20],
                  [{ zoom: 10, value: 1 }, 40],
                  [{ zoom: 10, value: 1.1 }, 40],
                  [{ zoom: 10, value: 1.2 }, 40],
                  [{ zoom: 10, value: 1.3 }, 40],
                  [{ zoom: 10, value: 1.4 }, 40],
                  [{ zoom: 10, value: 1.5 }, 40],
                  [{ zoom: 10, value: 1.6 }, 40],
                  [{ zoom: 10, value: 1.7 }, 40],
                  [{ zoom: 10, value: 1.8 }, 40],
                  [{ zoom: 10, value: 1.9 }, 40],
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
    }, 'waterway-label');

    // var bounds = new mapboxgl.LngLatBounds();
    // var features = map.queryRenderedFeatures({ layers: ['samples-heat'] });
    // // var feature = features[0];
    // features.forEach(function (e) {
    //     bounds.extend(e.geometry.coordinates);
    //     // console.log(e[0].geometry)
    // });

    // map.fitBounds(bounds);    

    // Geographic coordinates of the LineString
    // var coordinates = geojson.features[0].geometry.coordinates;

    // Pass the first coordinates in the LineString to `lngLatBounds` &
    // wrap each coordinate pair in `extend` to include them in the bounds
    // result. A variation of this technique could be applied to zooming
    // to the bounds of multiple Points or Polygon geomteries - it just
    // requires wrapping all the coordinates with the extend method.
    // var bounds = coordinates.reduce(function (bounds, coord) {
    //     return bounds.extend(coord);
    // }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

    // map.fitBounds(bounds, {
    //     padding: 20
    // });

});

map.on('click', 'samples-point', function (e) {
    new mapboxgl.Popup()

        .setLngLat(e.features[0].geometry.coordinates)

        .setHTML('<h2>' + e.features[0].properties.TypeDescription + '</h2>' +
            '<b>Concentration: </b>' + e.features[0].properties.Concentration + ' ' + e.features[0].properties.Unit +
            '<br>' + e.features[0].properties.Date +
            '<br><b>Notes: </b><br>' + e.features[0].properties.Notes)

        .addTo(map);
});