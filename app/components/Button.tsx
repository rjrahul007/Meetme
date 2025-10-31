import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { cn } from "../lib/utils";

type Props = {
  toggleVisibility: () => void;
  isVisible: boolean;
  isDark: boolean;
  mapType: "standard" | "satellite" | "hybrid" | undefined;
  toggleMapType: () => void;
};

const Button: React.FC<Props> = ({
  toggleVisibility,
  isVisible,
  isDark,
  mapType,
  toggleMapType,
}) => {
  const buttonBg = isVisible
    ? isDark
      ? "bg-emerald-500/90"
      : "bg-emerald-400"
    : isDark
      ? "bg-slate-800/90"
      : "bg-slate-100";
  const buttonBorder = isVisible
    ? isDark
      ? "border-emerald-400/50"
      : "border-emerald-300"
    : isDark
      ? "border-orange-700/50"
      : "border-orange-300";

  const translateX = useSharedValue(isVisible ? 20 : 0);

  useEffect(() => {
    translateX.value = withTiming(isVisible ? 20 : 0, { duration: 300 });
  }, [isVisible, translateX]);

  const animatedCircle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <>
      <View className="absolute top-16 left-0 right-0 items-center z-10 px-6">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={toggleVisibility}
            activeOpacity={0.8}
            className={`rounded-full px-4 py-2 flex-row items-center justify-between shadow-xl border-2 ${buttonBg} ${buttonBorder}`}
          >
            <View className="w-10 h-10 rounded-full items-center justify-center">
              <Ionicons
                name={isVisible ? "eye" : "eye-off"}
                size={20}
                color={isDark ? "white" : "black"}
              />
            </View>

            <Text
              className={cn(
                isDark ? "text-white" : "text-gray-500",
                "font-bold text-base tracking-wide mx-3"
              )}
            >
              {isVisible ? "Visible" : "Hidden"}
            </Text>

            {/* Modern Toggle Switch */}
            <View
              className={cn(
                isVisible
                  ? isDark
                    ? "bg-white/50"
                    : "bg-white/30"
                  : isDark
                    ? "bg-black/20"
                    : "bg-black/10",
                "w-12 h-7 rounded-full p-1"
              )}
            >
              <Animated.View
                style={[
                  animatedCircle,
                  {
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: isDark ? "white" : "black",
                  },
                ]}
              />
            </View>
          </TouchableOpacity>
          {/* NOTE: the map switcher button has been moved to a floating button on the right-middle of the screen */}
        </View>

        {/* Status Pill */}
        {mapType === "standard" && (
          <View
            className={`mt-3 rounded-full px-4 py-2 flex-row items-center gap-2 ${
              isVisible ? "bg-emerald-500/20" : "bg-orange-500/20"
            }`}
          >
            <View
              className={`w-2 h-2 rounded-full ${
                isVisible ? "bg-emerald-400" : "bg-orange-400"
              }`}
            />
            <Text
              className={cn(
                isVisible
                  ? isDark
                    ? "text-emerald-100"
                    : "text-emerald-800"
                  : isDark
                    ? "text-orange-100"
                    : "text-orange-800",
                "text-xs font-semibold"
              )}
            >
              {isVisible ? "Others can see you" : "You're hidden from others"}
            </Text>
          </View>
        )}
      </View>

      {/* Floating Map Switcher - right middle of the screen */}
      <TouchableOpacity
        onPress={toggleMapType}
        activeOpacity={0.85}
        style={{
          position: "absolute",
          right: 20,
          top: "30%",
          transform: [{ translateY: -24 }],
        }}
        className={`w-12 h-12 rounded-full items-center justify-center shadow-md border-2 ${isDark ? "bg-slate-800/90 border-slate-700/50" : "bg-white border-slate-200"}`}
      >
        <Ionicons
          name={mapType === "satellite" ? "layers" : "map"}
          size={18}
          color={isDark ? "white" : "black"}
        />
      </TouchableOpacity>
    </>
  );
};

export default Button;
