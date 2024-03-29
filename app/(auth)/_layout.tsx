import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { TabsProvider } from "../context/TabsContext";

export const LogoutButton = () => {
  const { signOut } = useAuth();

  const doLogout = () => {
    signOut();
  };

  return (
    <Pressable onPress={doLogout} style={{ marginRight: 10 }}>
      <Ionicons name="log-out-outline" size={24} color={"#FF025B"} />
    </Pressable>
  );
};

const TabsPage = () => {
  const { isSignedIn } = useAuth();

  //if user info filled out, if not prompt for name, school, pic
  return (
    <TabsProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          headerTransparent: true,
          tabBarActiveTintColor: "#FF025B",
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
          redirect={!isSignedIn}
        />
        <Tabs.Screen
          name="scan"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="barcode" size={size} color={color} />
            ),
          }}
          redirect={!isSignedIn}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
          redirect={!isSignedIn}
        />
      </Tabs>
    </TabsProvider>
  );
};

export default TabsPage;
