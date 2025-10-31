// import React, { useState } from "react";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import { useLocation } from "../hooks/useLocation";

// export default function Index() {
//   const [isVisible, setIsVisible] = useState(false);
//   const { location, error } = useLocation();

//   // Default location (Tinsukia, Assam)
//   const initialRegion = {
//     latitude: location?.coords.latitude || 27.4924,
//     longitude: location?.coords.longitude || 95.3647,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   };

//   const toggleVisibility = () => {
//     setIsVisible(!isVisible);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Map - Full Screen */}
//       <MapView
//         style={styles.map}
//         initialRegion={initialRegion}
//         showsUserLocation={isVisible}
//         showsMyLocationButton={false}
//         showsCompass={true}
//         showsBuildings={true}
//         showsTraffic={false}
//         loadingEnabled={true}
//       >
//         {/* Add markers for other users here */}
//         {isVisible && location && (
//           <Marker
//             coordinate={{
//               latitude: location.coords.latitude,
//               longitude: location.coords.longitude,
//             }}
//             title="You"
//             pinColor="red"
//           />
//         )}
//       </MapView>

//       {/* Toggle Button at Top Center */}
//       <View style={styles.toggleContainer}>
//         <TouchableOpacity
//           style={[
//             styles.toggleButton,
//             isVisible ? styles.toggleActive : styles.toggleInactive,
//           ]}
//           onPress={toggleVisibility}
//           activeOpacity={0.8}
//         >
//           <View style={styles.toggleContent}>
//             <View
//               style={[
//                 styles.indicator,
//                 isVisible ? styles.indicatorActive : styles.indicatorInactive,
//               ]}
//             />
//             <Text style={styles.toggleText}>
//               {isVisible ? "Visible" : "Invisible"}
//             </Text>
//           </View>
//           <Text style={styles.subText}>
//             {isVisible ? "Others can see you" : "You're hidden from others"}
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* Status Info Card */}
//       {!isVisible && (
//         <TouchableOpacity style={styles.infoCard}>
//           <Text style={styles.infoText}>
//             Turn on visibility to match with people you cross paths with
//           </Text>
//         </TouchableOpacity>
//       )}

//       {/* Error Display */}
//       {error && (
//         <View style={styles.errorCard}>
//           <Text style={styles.errorText}>{error}</Text>
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//   },
//   map: {
//     width: "100%",
//     height: "100%",
//   },
//   toggleContainer: {
//     position: "absolute",
//     top: 60,
//     left: 0,
//     right: 0,
//     alignItems: "center",
//     zIndex: 10,
//   },
//   toggleButton: {
//     borderRadius: 25,
//     paddingVertical: 14,
//     paddingHorizontal: 24,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     elevation: 8,
//     minWidth: 200,
//   },
//   toggleActive: {
//     backgroundColor: "#10b981",
//   },
//   toggleInactive: {
//     backgroundColor: "#ef4444",
//   },
//   toggleContent: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 4,
//   },
//   indicator: {
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     marginRight: 8,
//   },
//   indicatorActive: {
//     backgroundColor: "#ffffff",
//   },
//   indicatorInactive: {
//     backgroundColor: "rgba(255, 255, 255, 0.8)",
//   },
//   toggleText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#ffffff",
//   },
//   subText: {
//     fontSize: 12,
//     color: "rgba(255, 255, 255, 0.9)",
//     textAlign: "center",
//   },
//   infoCard: {
//     position: "absolute",
//     bottom: 140,
//     left: 20,
//     right: 20,
//     backgroundColor: "white",
//     borderRadius: 16,
//     padding: 16,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   infoText: {
//     fontSize: 14,
//     color: "#374151",
//     textAlign: "center",
//     lineHeight: 20,
//   },
//   errorCard: {
//     position: "absolute",
//     top: 140,
//     left: 20,
//     right: 20,
//     backgroundColor: "#fee2e2",
//     borderRadius: 12,
//     padding: 12,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   errorText: {
//     fontSize: 13,
//     color: "#991b1b",
//     textAlign: "center",
//   },
// });

// version 3 - with nativewind

// import { Ionicons } from "@expo/vector-icons";
// import React, { useState } from "react";
// import { Text, TouchableOpacity, View } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming,
// } from "react-native-reanimated";
// import { useLocation } from "../hooks/useLocation";

// export default function Index() {
//   const [isVisible, setIsVisible] = useState(false);
//   const { location, error, loading } = useLocation();
//   const translateX = useSharedValue(0);

//   const toggleVisibility = () => {
//     setIsVisible(!isVisible);
//     translateX.value = withTiming(isVisible ? 0 : 24, { duration: 200 });
//   };

//   // Animated circle style
//   const animatedCircle = useAnimatedStyle(() => ({
//     transform: [{ translateX: translateX.value }],
//   }));

//   // Loading shimmer while location is being fetched
//   if (loading) {
//     return (
//       <View className="flex-1 bg-gray-100 items-center justify-center">
//         <View className="w-64 h-40 rounded-2xl bg-gray-300 mb-4" />
//         <Text className="text-gray-600 text-base">
//           Fetching your location...
//         </Text>
//       </View>
//     );
//   }

//   if (!location) {
//     return (
//       <View className="flex-1 items-center justify-center bg-gray-100">
//         <Text className="text-gray-700 text-base">
//           Unable to fetch location. Please enable GPS.
//         </Text>
//       </View>
//     );
//   }

//   const currentRegion = {
//     latitude: location.coords.latitude,
//     longitude: location.coords.longitude,
//     latitudeDelta: 0.01,
//     longitudeDelta: 0.01,
//   };

//   return (
//     <View className="flex-1 bg-gray-100">
//       {/* Map - MapView doesn't support className, must use style */}
//       <MapView
//         style={{ width: "100%", height: "100%" }}
//         region={currentRegion}
//         showsUserLocation={isVisible}
//         showsMyLocationButton={false}
//         showsCompass={true}
//         showsBuildings={true}
//         showsTraffic={false}
//         loadingEnabled={true}
//       >
//         {isVisible && (
//           <Marker
//             coordinate={{
//               latitude: location.coords.latitude,
//               longitude: location.coords.longitude,
//             }}
//             title="You"
//             pinColor="red"
//           />
//         )}
//       </MapView>

//       {/* Toggle Layout */}
//       <View className="absolute top-16 left-0 right-0 items-center z-10">
//         <TouchableOpacity
//           onPress={toggleVisibility}
//           activeOpacity={0.9}
//           className={`w-52 rounded-full flex-row items-center justify-between px-3 py-2 shadow-lg ${
//             isVisible ? "bg-green-500" : "bg-red-500"
//           }`}
//         >
//           <Ionicons
//             name={isVisible ? "eye" : "eye-off"}
//             size={20}
//             color="white"
//           />

//           {/* Toggle Slider */}
//           <View className="flex-row items-center gap-2">
//             <Text className="text-white font-bold">
//               {isVisible ? "Visible" : "Hidden"}
//             </Text>

//             <View className="w-12 h-6 bg-white/30 rounded-full p-1">
//               <Animated.View
//                 style={animatedCircle}
//                 className="w-4 h-4 bg-white rounded-full"
//               />
//             </View>
//           </View>
//         </TouchableOpacity>

//         <Text className="mt-2 text-white text-xs text-center bg-black/40 px-3 py-1 rounded-full">
//           {isVisible ? "Others can see you" : "You're hidden from others"}
//         </Text>
//       </View>

//       {/* Info Card */}
//       {!isVisible && (
//         <View className="absolute bottom-36 left-5 right-5 bg-white rounded-2xl p-4 shadow-md">
//           <Text className="text-center text-gray-700 text-sm leading-5">
//             Turn on visibility to match with people you cross paths with
//           </Text>
//         </View>
//       )}

//       {/* Error Card */}
//       {error && (
//         <View className="absolute top-36 left-5 right-5 bg-red-100 rounded-xl p-3 shadow">
//           <Text className="text-red-700 text-center text-sm">{error}</Text>
//         </View>
//       )}
//     </View>
//   );
// }

// version 4

// import { Ionicons } from "@expo/vector-icons";
// import React, { useState } from "react";
// import { Text, TouchableOpacity, View } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming,
// } from "react-native-reanimated";
// import { useLocation } from "../hooks/useLocation";

// export default function Index() {
//   const [isVisible, setIsVisible] = useState(false);
//   const { location, error, loading } = useLocation();
//   const translateX = useSharedValue(0);

//   const toggleVisibility = () => {
//     setIsVisible(!isVisible);
//     translateX.value = withTiming(isVisible ? 0 : 20, { duration: 300 });
//   };

//   // Animated toggle circle
//   const animatedCircle = useAnimatedStyle(() => ({
//     transform: [{ translateX: translateX.value }],
//   }));

//   // Loading state with premium shimmer
//   if (loading) {
//     return (
//       <View className="flex-1 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">
//         <View className="flex-1 items-center justify-center px-6">
//           <View className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-600/30 items-center justify-center mb-6">
//             <Ionicons
//               name="location"
//               size={32}
//               color="rgba(139, 92, 246, 0.8)"
//             />
//           </View>
//           <View className="w-48 h-3 rounded-full bg-white/10 overflow-hidden mb-3">
//             <View className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
//           </View>
//           <Text className="text-gray-300 text-base font-medium">
//             Locating you...
//           </Text>
//         </View>
//       </View>
//     );
//   }

//   // Error state
//   if (!location) {
//     return (
//       <View className="flex-1 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">
//         <View className="flex-1 items-center justify-center px-8">
//           <View className="w-20 h-20 rounded-full bg-red-500/20 items-center justify-center mb-6">
//             <Ionicons
//               name="location-outline"
//               size={40}
//               color="rgba(239, 68, 68, 0.8)"
//             />
//           </View>
//           <Text className="text-white text-lg font-semibold mb-2 text-center">
//             Location Access Required
//           </Text>
//           <Text className="text-gray-400 text-sm text-center leading-relaxed">
//             Please enable GPS to start discovering people nearby
//           </Text>
//         </View>
//       </View>
//     );
//   }

//   const currentRegion = {
//     latitude: location.coords.latitude,
//     longitude: location.coords.longitude,
//     latitudeDelta: 0.01,
//     longitudeDelta: 0.01,
//   };

//   return (
//     <View className="flex-1">
//       {/* Premium Map with custom styling */}
//       <MapView
//         style={{ width: "100%", height: "100%" }}
//         region={currentRegion}
//         showsUserLocation={isVisible}
//         showsMyLocationButton={false}
//         showsCompass={false}
//         showsBuildings={true}
//         showsTraffic={false}
//         loadingEnabled={true}
//         customMapStyle={[
//           {
//             featureType: "all",
//             elementType: "geometry",
//             stylers: [{ color: "#1a1d29" }],
//           },
//           {
//             featureType: "water",
//             elementType: "geometry",
//             stylers: [{ color: "#0f1419" }],
//           },
//           {
//             featureType: "road",
//             elementType: "geometry",
//             stylers: [{ color: "#2d3142" }],
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
//           >
//             <View className="items-center justify-center">
//               {/* Pulse rings */}
//               <View className="absolute w-20 h-20 rounded-full bg-indigo-500/20 animate-pulse" />
//               <View className="absolute w-14 h-14 rounded-full bg-indigo-500/30 animate-pulse" />
//               {/* Center marker */}
//               <View className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border-4 border-white shadow-lg items-center justify-center">
//                 <View className="w-3 h-3 rounded-full bg-white" />
//               </View>
//             </View>
//           </Marker>
//         )}
//       </MapView>

//       {/* Top Control - Glassmorphism Toggle */}
//       <View className="absolute top-16 left-0 right-0 items-center z-10 px-6">
//         <TouchableOpacity
//           onPress={toggleVisibility}
//           activeOpacity={0.8}
//           className={`rounded-full px-6 py-4 flex-row items-center justify-between shadow-2xl border ${
//             isVisible
//               ? "bg-emerald-500/90 border-emerald-400/50"
//               : "bg-slate-800/90 border-slate-700/50"
//           }`}
//           style={{
//             minWidth: 220,
//             shadowColor: isVisible ? "#10b981" : "#000",
//             shadowOffset: { width: 0, height: 8 },
//             shadowOpacity: 0.3,
//             shadowRadius: 16,
//             elevation: 12,
//           }}
//         >
//           {/* Icon */}
//           <View
//             className={`w-10 h-10 rounded-full items-center justify-center ${
//               isVisible ? "bg-white/20" : "bg-slate-700/50"
//             }`}
//           >
//             <Ionicons
//               name={isVisible ? "eye" : "eye-off"}
//               size={20}
//               color="white"
//             />
//           </View>

//           {/* Text & Toggle */}
//           <View className="flex-row items-center gap-3">
//             <Text className="text-white font-bold text-base tracking-wide">
//               {isVisible ? "Visible" : "Hidden"}
//             </Text>

//             {/* Modern Toggle Switch */}
//             <View
//               className={`w-11 h-6 rounded-full p-0.5 ${
//                 isVisible ? "bg-white/30" : "bg-white/10"
//               }`}
//             >
//               <Animated.View
//                 style={[
//                   animatedCircle,
//                   {
//                     width: 20,
//                     height: 20,
//                     borderRadius: 10,
//                     backgroundColor: "white",
//                   },
//                 ]}
//               />
//             </View>
//           </View>
//         </TouchableOpacity>

//         {/* Status Pill */}
//         <View
//           className={`mt-3 rounded-full px-4 py-2 flex-row items-center gap-2 ${
//             isVisible ? "bg-emerald-500/20" : "bg-orange-500/20"
//           }`}
//         >
//           <View
//             className={`w-2 h-2 rounded-full ${
//               isVisible ? "bg-emerald-400" : "bg-orange-400"
//             }`}
//           />
//           <Text
//             className={`text-xs font-semibold ${
//               isVisible ? "text-emerald-100" : "text-orange-100"
//             }`}
//           >
//             {isVisible ? "Others can see you" : "You're hidden from others"}
//           </Text>
//         </View>
//       </View>

//       {/* Bottom Info Card - Premium Glassmorphism */}
//       {!isVisible && (
//         <View className="absolute bottom-8 left-6 right-6 z-10">
//           <View
//             className="bg-slate-900/95 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50 shadow-2xl"
//             style={{
//               shadowColor: "#6366f1",
//               shadowOffset: { width: 0, height: 8 },
//               shadowOpacity: 0.2,
//               shadowRadius: 20,
//               elevation: 10,
//             }}
//           >
//             <View className="flex-row items-start gap-4">
//               {/* Icon Container */}
//               <View className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 items-center justify-center">
//                 <Ionicons name="flash" size={24} color="white" />
//               </View>

//               {/* Text Content */}
//               <View className="flex-1">
//                 <Text className="text-white font-bold text-base mb-1.5">
//                   Start Matching
//                 </Text>
//                 <Text className="text-gray-400 text-sm leading-5">
//                   Turn on visibility to connect with people you cross paths with
//                   in real-time
//                 </Text>
//               </View>
//             </View>
//           </View>
//         </View>
//       )}

//       {/* Error Toast */}
//       {error && (
//         <View className="absolute top-32 left-6 right-6 z-20">
//           <View
//             className="bg-red-500/95 backdrop-blur-xl rounded-2xl p-4 flex-row items-center gap-3 border border-red-400/50 shadow-xl"
//             style={{
//               shadowColor: "#ef4444",
//               shadowOffset: { width: 0, height: 4 },
//               shadowOpacity: 0.3,
//               shadowRadius: 12,
//               elevation: 8,
//             }}
//           >
//             <Ionicons name="alert-circle" size={24} color="white" />
//             <Text className="text-white text-sm font-medium flex-1">
//               {error}
//             </Text>
//           </View>
//         </View>
//       )}
//     </View>
//   );
// }

// version 5 - with dark mode support

import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Text, View, useColorScheme } from "react-native";
import Button from "../components/Button";
import Map from "../components/Map";
import { useLocation } from "../hooks/useLocation";

export default function Index() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [isVisible, setIsVisible] = useState(false);
  const [showInfoCard, setShowInfoCard] = useState(true);
  const { location, error, loading } = useLocation();
  const [mapType, setMapType] = useState<"standard" | "satellite">("standard");

  // Hide info card after 15 seconds
  useEffect(() => {
    if (showInfoCard) {
      const timer = setTimeout(() => {
        setShowInfoCard(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showInfoCard]);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    setShowInfoCard(true);
  };

  const toggleMapType = () => {
    setMapType((t) => (t === "satellite" ? "standard" : "satellite"));
  };

  // Animated toggle circle is handled inside the Button component now

  // Loading state
  if (loading) {
    return (
      <View
        className={`flex-1 ${isDark ? "bg-slate-950" : "bg-white"} items-center justify-center px-6`}
      >
        <View
          className={`w-16 h-16 rounded-full ${isDark ? "bg-indigo-500/30" : "bg-indigo-200"} items-center justify-center mb-6`}
        >
          <Ionicons
            name="location"
            size={32}
            color={isDark ? "#818cf8" : "#4f46e5"}
          />
        </View>
        <Text
          className={`${isDark ? "text-gray-300" : "text-gray-700"} text-base font-medium`}
        >
          Locating you...
        </Text>
      </View>
    );
  }

  // Error state
  if (!location) {
    return (
      <View
        className={`flex-1 ${isDark ? "bg-slate-950" : "bg-white"} items-center justify-center px-8`}
      >
        <View
          className={`w-20 h-20 rounded-full ${isDark ? "bg-red-500/20" : "bg-red-100"} items-center justify-center mb-6`}
        >
          <Ionicons name="location-outline" size={40} color="#ef4444" />
        </View>
        <Text
          className={`${isDark ? "text-white" : "text-slate-950"} text-lg font-semibold mb-2 text-center`}
        >
          Location Access Required
        </Text>
        <Text
          className={`${isDark ? "text-gray-400" : "text-gray-600"} text-sm text-center leading-relaxed`}
        >
          Please enable GPS to start discovering people nearby
        </Text>
      </View>
    );
  }

  // visual appearance for Button handled inside component
  const cardBg = isDark ? "bg-slate-900/95" : "bg-slate-50/95";
  const borderColor = isDark ? "border-slate-700/50" : "border-slate-200";

  return (
    <View className="flex-1">
      {/* Map (extracted) */}
      <Map
        location={location}
        isVisible={isVisible}
        mapType={mapType}
        isDark={isDark}
      />

      {/* Top Control */}
      <Button
        toggleVisibility={toggleVisibility}
        isVisible={isVisible}
        isDark={isDark}
        mapType={mapType}
        toggleMapType={toggleMapType}
      />

      {/* Bottom Info Card - Disappears after 15 seconds */}
      {!isVisible && showInfoCard && (
        <View className="absolute bottom-8 left-6 right-6 z-10">
          <View
            className={`${cardBg} backdrop-blur-xl rounded-3xl p-6 border ${borderColor} shadow-2xl`}
            style={{
              shadowColor: "#6366f1",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.2,
              shadowRadius: 20,
              elevation: 10,
            }}
          >
            <View className="flex-row items-start gap-4">
              {/* Icon Container */}
              <View className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 items-center justify-center">
                <Ionicons
                  name="flash"
                  size={24}
                  color={isDark ? "white" : "black"}
                />
              </View>

              {/* Text Content */}
              <View className="flex-1">
                <Text
                  className={`${isDark ? "text-white" : "text-slate-950"} font-bold text-base mb-1.5`}
                >
                  Start Matching
                </Text>
                <Text className={isDark ? "text-gray-400" : "text-gray-600"}>
                  Turn on visibility to connect with people you cross paths with
                  in real-time
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* Error Toast */}
      {error && (
        <View className="absolute top-32 left-6 right-6 z-20">
          <View
            className="bg-red-500/95 backdrop-blur-xl rounded-2xl p-4 flex-row items-center gap-3 border border-red-400/50 shadow-xl"
            style={{
              shadowColor: "#ef4444",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 8,
            }}
          >
            <Ionicons name="alert-circle" size={24} color="white" />
            <Text className="text-white text-sm font-medium flex-1">
              {error}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
