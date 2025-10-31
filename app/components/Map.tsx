// import React from "react";
// import { View } from "react-native";
// import MapView, { MapViewProps, Marker } from "react-native-maps";

// type Props = {
//   location: any; // leave loose — comes from hook
//   isVisible: boolean;
//   mapType: MapViewProps["mapType"];
//   isDark: boolean;
// };

// const Map: React.FC<Props> = ({ location, isVisible, mapType, isDark }) => {
//   const currentRegion = {
//     latitude: location.coords.latitude,
//     longitude: location.coords.longitude,
//     latitudeDelta: 0.01,
//     longitudeDelta: 0.01,
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <MapView
//         style={{ width: "100%", height: "100%" }}
//         region={currentRegion}
//         showsUserLocation={isVisible}
//         showsMyLocationButton={false}
//         showsCompass={!isDark}
//         showsBuildings={true}
//         showsTraffic={false}
//         loadingEnabled={true}
//         mapType={mapType}
//         customMapStyle={[
//           {
//             featureType: "all",
//             elementType: "geometry",
//             stylers: [{ color: isDark ? "#1a1d29" : "#f5f5f5" }],
//           },
//           {
//             featureType: "water",
//             elementType: "geometry",
//             stylers: [{ color: isDark ? "#0f1419" : "#e0f2fe" }],
//           },
//           {
//             featureType: "road",
//             elementType: "geometry",
//             stylers: [{ color: isDark ? "#2d3142" : "#e5e7eb" }],
//           },
//         ]}
//       >
//         {isVisible && (
//           <Marker
//             coordinate={{
//               latitude: location.coords.latitude,
//               longitude: location.coords.longitude,
//             }}
//             title="You"
//           />
//         )}
//       </MapView>
//     </View>
//   );
// };

// export default Map;

// import React, { useEffect, useRef } from "react";
// import { Animated, Text, View } from "react-native";
// import MapView, { MapViewProps, Marker } from "react-native-maps";
// import { cn } from "../lib/utils";

// type Props = {
//   location: any;
//   isVisible: boolean;
//   mapType: MapViewProps["mapType"];
//   isDark: boolean;
//   name?: string;
// };

// const Map: React.FC<Props> = ({
//   location,
//   isVisible,
//   mapType,
//   isDark,
//   name = "H",
// }) => {
//   const pulseAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(pulseAnim, {
//           toValue: 1,
//           duration: 1200,
//           useNativeDriver: true,
//         }),
//         Animated.timing(pulseAnim, {
//           toValue: 0,
//           duration: 1200,
//           useNativeDriver: true,
//         }),
//       ])
//     ).start();
//   }, []);

//   const scale = pulseAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: [1, 2],
//   });

//   const opacity = pulseAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0.8, 0],
//   });

//   const currentRegion = {
//     latitude: location.coords.latitude,
//     longitude: location.coords.longitude,
//     latitudeDelta: 0.01,
//     longitudeDelta: 0.01,
//   };

//   return (
//     <View className="flex-1">
//       <MapView
//         style={{ width: "100%", height: "100%" }}
//         region={currentRegion}
//         showsUserLocation={isVisible}
//         showsMyLocationButton={false}
//         showsCompass={!isDark}
//         showsBuildings
//         showsTraffic={false}
//         loadingEnabled
//         mapType={mapType}
//         customMapStyle={[
//           {
//             featureType: "all",
//             elementType: "geometry",
//             stylers: [{ color: isDark ? "#1a1d29" : "#f5f5f5" }],
//           },
//           {
//             featureType: "water",
//             elementType: "geometry",
//             stylers: [{ color: isDark ? "#0f1419" : "#e0f2fe" }],
//           },
//           {
//             featureType: "road",
//             elementType: "geometry",
//             stylers: [{ color: isDark ? "#2d3142" : "#e5e7eb" }],
//           },
//         ]}
//       >
//         {isVisible && (
//           <Marker
//             coordinate={{
//               latitude: location.coords.latitude,
//               longitude: location.coords.longitude,
//             }}
//           >
//             <View className="items-center justify-center">
//               {/* Glow Pulse */}
//               <Animated.View
//                 style={{
//                   opacity,
//                   transform: [{ scale }],
//                 }}
//                 className={cn(
//                   "absolute w-10 h-10 rounded-full",
//                   isDark ? "bg-blue-400" : "bg-blue-500"
//                 )}
//               />
//               {/* Inner Marker */}
//               <View
//                 className={cn(
//                   "w-8 h-8 rounded-full items-center justify-center border-2 border-white",
//                   isDark ? "bg-blue-800" : "bg-blue-600"
//                 )}
//               >
//                 <Text className="text-white font-bold text-base">
//                   {name.charAt(0).toUpperCase()}
//                 </Text>
//               </View>
//             </View>
//           </Marker>
//         )}
//       </MapView>
//     </View>
//   );
// };

// export default Map;

// import React, { useEffect, useRef } from "react";
// import { Animated, StyleSheet, Text, View } from "react-native";
// import MapView, {
//   MapViewProps,
//   Marker,
//   PROVIDER_DEFAULT,
// } from "react-native-maps";
// import { cn } from "../lib/utils";

// type Props = {
//   location: any;
//   isVisible: boolean;
//   mapType: MapViewProps["mapType"];
//   isDark: boolean;
//   name?: string;
// };

// const Map: React.FC<Props> = ({
//   location,
//   isVisible,
//   mapType,
//   isDark,
//   name = "H",
// }) => {
//   const pulseAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     const animation = Animated.loop(
//       Animated.sequence([
//         Animated.timing(pulseAnim, {
//           toValue: 1,
//           duration: 1500,
//           useNativeDriver: true,
//         }),
//         Animated.timing(pulseAnim, {
//           toValue: 0,
//           duration: 1500,
//           useNativeDriver: true,
//         }),
//       ])
//     );
//     animation.start();
//     return () => animation.stop();
//   }, []);

//   const scale1 = pulseAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: [1, 2.5],
//   });

//   const scale2 = pulseAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: [1, 2],
//   });

//   const opacity1 = pulseAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0.6, 0],
//   });

//   const opacity2 = pulseAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0.4, 0],
//   });

//   const currentRegion = {
//     latitude: location.coords.latitude,
//     longitude: location.coords.longitude,
//     latitudeDelta: 0.01,
//     longitudeDelta: 0.01,
//   };

//   const customMapStyle = [
//     {
//       featureType: "all",
//       elementType: "geometry",
//       stylers: [{ color: isDark ? "#0f172a" : "#f8fafc" }],
//     },
//     {
//       featureType: "water",
//       elementType: "geometry",
//       stylers: [{ color: isDark ? "#1e3a8a" : "#bae6fd" }],
//     },
//     {
//       featureType: "road",
//       elementType: "geometry",
//       stylers: [{ color: isDark ? "#1e293b" : "#e2e8f0" }],
//     },
//     {
//       featureType: "road",
//       elementType: "labels.text.fill",
//       stylers: [{ color: isDark ? "#cbd5e1" : "#475569" }],
//     },
//     {
//       featureType: "poi.business",
//       stylers: [{ visibility: "on" }],
//     },
//     {
//       featureType: "poi.park",
//       elementType: "geometry",
//       stylers: [{ color: isDark ? "#065f46" : "#6ee7b7" }],
//     },
//     {
//       featureType: "landscape",
//       elementType: "geometry",
//       stylers: [{ color: isDark ? "#1e293b" : "#f1f5f9" }],
//     },
//   ];

//   return (
//     <View className="flex-1">
//       <MapView
//         style={StyleSheet.absoluteFillObject}
//         provider={PROVIDER_DEFAULT}
//         region={currentRegion}
//         showsUserLocation={false}
//         showsMyLocationButton={false}
//         showsCompass={false}
//         showsBuildings={true}
//         showsTraffic={false}
//         showsIndoors={true}
//         showsPointsOfInterest={true}
//         loadingEnabled={true}
//         mapType={mapType}
//         customMapStyle={customMapStyle}
//       >
//         {isVisible && (
//           <Marker
//             coordinate={{
//               latitude: location.coords.latitude,
//               longitude: location.coords.longitude,
//             }}
//           >
//             <View className="items-center justify-center">
//               {/* Glow Pulse */}
//               <Animated.View
//                 style={{
//                   opacity: opacity2,
//                   transform: [{ scale: scale2 }],
//                 }}
//                 className={cn(
//                   "absolute w-10 h-10 rounded-full",
//                   isDark ? "bg-blue-400" : "bg-blue-500"
//                 )}
//               />
//               {/* Inner Marker */}
//               <View
//                 className={cn(
//                   "w-8 h-8 rounded-full items-center justify-center border-2 border-white",
//                   isDark ? "bg-blue-800" : "bg-blue-600"
//                 )}
//               >
//                 <Text className="text-white font-bold text-base">
//                   {name.charAt(0).toUpperCase()}
//                 </Text>
//               </View>
//             </View>
//           </Marker>
//         )}
//       </MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   markerContainer: {
//     width: 150,
//     height: 150,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// export default Map;

import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

type Props = {
  location: any;
  isVisible: boolean;
  isDark: boolean;
  mapType?: "standard" | "satellite" | "hybrid" | undefined;
  name?: string;
};

const MAPTILER_KEY = "qS0xgMLsgLjhkms1aPKb"; // get free key from https://cloud.maptiler.com

const Map: React.FC<Props> = ({
  location,
  isVisible,
  isDark,
  mapType,
  name = "H",
}) => {
  const latitude = location.coords.latitude;
  const longitude = location.coords.longitude;
  const webviewRef = useRef<any | null>(null);

  // Keep the HTML static so WebView doesn't reload on every prop change.
  // All dynamic updates are sent via postMessage.
  const html = `
    <!doctype html>
    <html>
      <head>
        <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <style>
          html,body,#map{height:100%;width:100%;margin:0;padding:0}
          .marker-container{position:relative; width:84px; height:84px; display:flex;align-items:center;justify-content:center}
          .pulse{position:absolute;width:34px;height:34px;border-radius:50%;background:#7c3aed;animation:pulse 1.6s ease-in-out infinite;pointer-events:none;filter:blur(0.4px);}
          @keyframes pulse{0%{transform:scale(1);opacity:0.7}100%{transform:scale(2.6);opacity:0}}
          .marker{position:relative;width:30px;height:30px;border:4px solid white;border-radius:50%;background:#06b6d4;display:flex;align-items:center;justify-content:center;color:white;font-weight:900;font-size:24px;box-shadow:0 10px 24px rgba(0,0,0,0.3);z-index:2}
          /* hide MapLibre controls we don't want */
          .maplibregl-ctrl { display: none; }
          /* but keep navigation control container available when needed */
          .nav-custom { position:absolute; top:10px; right:10px; z-index:5 }
          /* dark overlay to tint the map in dark mode (semi-transparent so labels remain readable) */
          #darkOverlay { position:absolute; inset:0; background: rgba(6,10,20,0.5); pointer-events:none; z-index:6; opacity:0; transition: opacity 280ms ease; }
        </style>
        <link href="https://unpkg.com/maplibre-gl@3.6.2/dist/maplibre-gl.css" rel="stylesheet" />
        <script src="https://unpkg.com/maplibre-gl@3.6.2/dist/maplibre-gl.js"></script>
      </head>
      <body>
        <div id="map"></div>
        <div id="darkOverlay"></div>
        <script>
          const MAPTILER_KEY = '${MAPTILER_KEY}';

          // initial state (will be updated by React Native via postMessage)
          let state = {
            lat: 0,
            lng: 0,
            visible: false,
            isDark: false,
            style: 'streets-v4',
            name: 'H'
          };

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

          // Create the marker element
          const markerContainer = document.createElement('div');
          markerContainer.className = 'marker-container';

          const pulse = document.createElement('div');
          pulse.className = 'pulse';

          const img = document.createElement('img');
          img.id = 'markerImg';
          img.src = 'assets/icons/Smile-Cody_3D.png';
          img.style.width = '48px';
          img.style.height = '48px';
          img.style.display = 'block';
          img.style.transform = 'translateY(6px)';
          img.style.zIndex = '9999';

          markerContainer.appendChild(pulse);
          markerContainer.appendChild(img);

          const marker = new maplibregl.Marker({ element: markerContainer, anchor: 'center' })
            .setLngLat([0, 0])
            .addTo(map);

          markerContainer.style.display = 'none';
          pulse.style.display = 'none';

          const darkOverlay = document.getElementById('darkOverlay');
          const mapEl = document.getElementById('map');

          function updateMarker({ lat, lng, visible, name }) {
            if (typeof lat === 'number' && typeof lng === 'number') {
              marker.setLngLat([lng, lat]);
              map.easeTo({ center: [lng, lat], duration: 300 });
            }
            if (typeof visible === 'boolean') {
              markerContainer.style.display = visible ? 'flex' : 'none';
              pulse.style.display = visible ? 'block' : 'none';
            }
            if (typeof name === 'string') {
              const imgEl = document.getElementById('markerImg');
              if (imgEl) imgEl.setAttribute('data-name', name.charAt(0).toUpperCase());
            }
          }

          function handleMessage(msg) {
            try {
              const data = typeof msg === 'string' ? JSON.parse(msg) : msg;
              if (data.type === 'update' && data.payload) {
                const p = data.payload;
                if (p.mapType) {
                  const newStyle = p.mapType === 'satellite' ? 'satellite' : 'streets-v4';
                  if (newStyle !== state.style) {
                    state.style = newStyle;
                    map.setStyle(styleFor(state.style));
                  }
                }
                if (typeof p.isDark === 'boolean') {
                  state.isDark = p.isDark;
                  if (darkOverlay) darkOverlay.style.opacity = state.isDark ? '0.18' : '0';
                  if (mapEl) mapEl.style.filter = state.isDark ? 'brightness(0.95) contrast(1.02)' : '';
                  if (state.style !== 'satellite') {
                    map.setStyle(styleFor(state.style));
                  }
                }
                if (typeof p.latitude === 'number' && typeof p.longitude === 'number') {
                  state.lat = p.latitude;
                  state.lng = p.longitude;
                }
                if (typeof p.isVisible === 'boolean') state.visible = p.isVisible;
                if (p.name) state.name = p.name.charAt(0).toUpperCase();
                updateMarker({ lat: state.lat, lng: state.lng, visible: state.visible, name: state.name });
              }
            } catch (e) {
              console.warn('Invalid message', e);
            }
          }

          window.addEventListener('message', (e) => handleMessage(e.data));
          document.addEventListener('message', (e) => handleMessage(e.data));
          window.handleMapMessage = handleMessage;
        </script>
      </body>
    </html>
  `;

  // Send updates to the WebView. Keep the HTML static to avoid reloads.
  const sendUpdate = (payloadObj: any) => {
    try {
      if (
        webviewRef.current &&
        typeof webviewRef.current.postMessage === "function"
      ) {
        webviewRef.current.postMessage(
          JSON.stringify({ type: "update", payload: payloadObj })
        );
      }
    } catch {
      /* ignore */
    }
  };

  // Post initial state on load end to ensure the webview has mounted
  const initialPayload = {
    latitude,
    longitude,
    isVisible,
    isDark,
    // always send explicit mapType so WebView can switch back to streets-v4
    mapType: mapType === "satellite" ? "satellite" : "streets-v4",
    name,
  };

  useEffect(() => {
    // Whenever relevant props change, send an update to the webview.
    sendUpdate({
      latitude,
      longitude,
      isVisible,
      isDark,
      // always send an explicit style identifier
      mapType: mapType === "satellite" ? "satellite" : "streets-v4",
      name,
    });
  }, [latitude, longitude, isVisible, isDark, mapType, name]);

  return (
    <View className="flex-1">
      <WebView
        originWhitelist={["*"]}
        source={{ html }}
        style={{ flex: 1 }}
        scrollEnabled={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        injectedJavaScriptBeforeContentLoaded={``}
        ref={webviewRef}
        onLoadEnd={() => sendUpdate(initialPayload)}
        onMessage={() => {
          /* reserved for future */
        }}
      />
    </View>
  );
};

export default Map;
