// mapTemplate.ts
export const getMapHTML = (MAPTILER_KEY: string) => `
<!doctype html>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <link href="https://unpkg.com/maplibre-gl@3.6.2/dist/maplibre-gl.css" rel="stylesheet" />
    <script src="https://unpkg.com/maplibre-gl@3.6.2/dist/maplibre-gl.js"></script>
    <style>
      html, body, #map { height:100%; width:100%; margin:0; padding:0 }
      .marker-container { position:relative; width:84px; height:84px; display:flex; align-items:center; justify-content:center }
      .pulse { position:absolute; width:34px; height:34px; border-radius:50%; background:#7c3aed; animation:pulse 1.6s ease-in-out infinite; pointer-events:none; filter:blur(0.4px); }
      @keyframes pulse { 0%{transform:scale(1);opacity:0.7} 100%{transform:scale(2.6);opacity:0} }
      .maplibregl-ctrl { display:none; }
      #darkOverlay { position:absolute; inset:0; background:rgba(6,10,20,0.5); pointer-events:none; z-index:6; opacity:0; transition:opacity 280ms ease; }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <div id="darkOverlay"></div>

    <script>
      const MAPTILER_KEY = '${MAPTILER_KEY}';
      let state = { lat:0, lng:0, visible:false, isDark:false, style:'streets-v4', name:'H' };
      let initialView = null;

      const styleFor = (type) => {
        if (type === 'satellite') return 'https://api.maptiler.com/maps/hybrid/style.json?key=' + MAPTILER_KEY;
        return 'https://api.maptiler.com/maps/streets-v4/style.json?key=' + MAPTILER_KEY;
      }

      const map = new maplibregl.Map({
        container: 'map',
        style: styleFor(state.style),
        center: [0, 0],
        zoom: 16.5,
        pitch: 45,
        bearing: 0,
        attributionControl: false,
        interactive: true
      });

      const DEFAULT_ZOOM = 16.5;
      const ZOOM_THRESHOLD = 14;

      // Marker setup
      const markerContainer = document.createElement('div');
      markerContainer.className = 'marker-container';
      markerContainer.style.cursor = 'pointer';
      markerContainer.style.pointerEvents = 'auto';
      markerContainer.style.zIndex = '10000';

      const pulse = document.createElement('div');
      pulse.className = 'pulse';

      const img = document.createElement('img');
      img.id = 'markerImg';
      img.src = 'https://api.dicebear.com/9.x/avataaars/svg?seed=Nolan';
      img.style.width = '58px';
      img.style.height = '58px';
      img.style.transform = 'translateY(6px)';
      img.style.zIndex = '10001';
      img.style.pointerEvents = 'auto';

      markerContainer.appendChild(pulse);
      markerContainer.appendChild(img);

      const marker = new maplibregl.Marker({ element: markerContainer, anchor: 'center' })
        .setLngLat([0, 0])
        .addTo(map);

      markerContainer.style.display = 'none';
      pulse.style.display = 'none';

      // Reset map view when marker is clicked and notify React Native
      const postMarkerTapped = () => {
        try {
          const avatar = document.getElementById('markerImg')?.src || null;
          const payload = { name: state.name || null, avatar, latitude: state.lat || null, longitude: state.lng || null };
          const msg = JSON.stringify({ type: 'markerTapped', payload });
          if (window.ReactNativeWebView && typeof window.ReactNativeWebView.postMessage === 'function') {
            window.ReactNativeWebView.postMessage(msg);
          } else if (window.parent && typeof window.parent.postMessage === 'function') {
            // fallback for some WebView setups
            window.parent.postMessage(msg, '*');
          }
        } catch (e) {}
      };

      const handleMarkerClick = () => {
        try {
          const currentZoom = map.getZoom?.() ?? DEFAULT_ZOOM;
          if (currentZoom < ZOOM_THRESHOLD) {
            const center = initialView?.center || [state.lng, state.lat];
            const zoom = initialView?.zoom || DEFAULT_ZOOM;
            if (center[0] && center[1]) {
              map.easeTo({ center, zoom, duration: 500 });
            }
          }
        } catch (err) {}
        // always post message so RN can open the sheet regardless of reset
        postMarkerTapped();
      };

      ['click', 'touchend'].forEach(evt => {
        markerContainer.addEventListener(evt, handleMarkerClick);
        img.addEventListener(evt, handleMarkerClick);
      });

      // Overlay for dark mode
      const darkOverlay = document.getElementById('darkOverlay');
      const mapEl = document.getElementById('map');

      function updateMarker({ lat, lng, visible, name }) {
        if (typeof lat === 'number' && typeof lng === 'number') {
          marker.setLngLat([lng, lat]);
          map.easeTo({ center: [lng, lat], duration: 300 });
        }
        markerContainer.style.display = visible ? 'flex' : 'none';
        pulse.style.display = visible ? 'block' : 'none';
      }

      function handleMessage(msg) {
        try {
          const data = typeof msg === 'string' ? JSON.parse(msg) : msg;
          if (data.type === 'update' && data.payload) {
            const p = data.payload;

            if (p.mapType && p.mapType !== state.style) {
              state.style = p.mapType;
              map.setStyle(styleFor(state.style));
            }

            if (typeof p.isDark === 'boolean') {
              state.isDark = p.isDark;
              darkOverlay.style.opacity = p.isDark ? '0.18' : '0';
              mapEl.style.filter = p.isDark ? 'brightness(0.95) contrast(1.02)' : '';
            }

            if (typeof p.latitude === 'number' && typeof p.longitude === 'number') {
              state.lat = p.latitude;
              state.lng = p.longitude;
              if (!initialView) {
                const currentZoom = map.getZoom?.() ?? DEFAULT_ZOOM;
                initialView = { center: [p.longitude, p.latitude], zoom: currentZoom };
              }
            }

            if (typeof p.isVisible === 'boolean') state.visible = p.isVisible;
            if (p.name) state.name = p.name.charAt(0).toUpperCase();

            updateMarker({ lat: state.lat, lng: state.lng, visible: state.visible, name: state.name });
          }
        } catch (e) {
          console.warn('Invalid message', e);
        }
      }

      window.addEventListener('message', e => handleMessage(e.data));
      document.addEventListener('message', e => handleMessage(e.data));
      window.handleMapMessage = handleMessage;
    </script>
  </body>
</html>
`;
