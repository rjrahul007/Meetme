import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  const handleMeetMe = () => {
    console.log("Meet me button pressed");
  };

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
      </Stack>

      {/* Floating Meet Me Button */}
      {/* <View className="absolute bottom-10 left-5 right-5 items-center">
        <TouchableOpacity
          onPress={handleMeetMe}
          className="bg-white rounded-lg px-5 py-5 shadow-md shadow-black/20"
        >
          <Text className="bg-black text-white rounded-lg px-6 py-3 text-base font-bold">
            Meet me
          </Text>
        </TouchableOpacity>
      </View> */}
    </>
  );
};

export default Layout;
