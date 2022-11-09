// Import stylesheets
import './style.css';

// Write Javascript code!
mapboxgl.accessToken =
  'pk.eyJ1IjoiZGllaGwiLCJhIjoiY2tmdWp2cGIzMGoxNTJwcWY3bjR6M3cxdSJ9.QPtJOfheB5Z2S38uVkZCCA';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [-95.71, 37.09],
  zoom: 3.5,
  projection: {
    name: 'albers',
  },
});

map.on('load', () => {
  map.addSource('land-management', {
    type: 'vector',
    tiles: ['https://api.mapbox.com/v4/diehl.93xga47s/{z}/{x}/{y}.mvt'],
    minzoom: 0,
    maxzoom: 10,
  });

  map.addLayer(
    {
      id: 'blm-national-surface-management-data (1)',
      type: 'fill',
      source: 'land-management',
      'source-layer': 'blm_national_surface_management_data',
      layout: {},
      paint: {
        'fill-color': [
          'match',
          ['get', 'ADMIN_DEPT_CODE'],
          ['PVT'],
          'hsl(5, 91%, 83%)',
          ['ST', 'LG'],
          'hsl(286, 32%, 85%)',
          ['DOD'],
          'hsl(208, 46%, 80%)',
          ['DOE'],
          'hsl(60, 100%, 90%)',
          ['DOI'],
          [
            'match',
            ['get', 'ADMIN_AGENCY_CODE'],
            ['BIA'],
            'hsl(35, 98%, 82%)',
            'hsl(41, 43%, 82%)',
          ],
          ['USDA'],
          'hsl(109, 49%, 85%)',
          [
            'OTHFE',
            'DOS',
            'DOT',
            'VA',
            'DHS',
            'HHS',
            'HUD',
            'IA',
            'DOC',
            'DOJ',
          ],
          'hsl(329, 90%, 92%)',
          ['NTVALL', 'NTVPIC'],
          'hsl(35, 98%, 82%)',
          'hsl(0, 0%, 90%)',
        ],
        'fill-outline-color': 'hsla(0, 0%, 0%, 0.07)',
      },
    },

    // This is the important part of this example: the addLayer
    // method takes 2 arguments: the layer as an object, and a string
    // representing another layer's name. If the other layer
    // exists in the style already, the new layer will be positioned
    // right before that layer in the stack, making it possible to put
    // 'overlays' anywhere in the layer stack.
    'aeroway-polygon'
  );
});
