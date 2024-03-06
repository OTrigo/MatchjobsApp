import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../pages/home";
import Search from "../pages/search";
import Inbox from "../pages/inbox";
import New from "../pages/new";
import Profile from "../pages/profile";

import { Ionicons } from "@expo/vector-icons";
import { ButtonNew } from "../components/ButtonNew";

const Tab = createBottomTabNavigator();

export function Routes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#000",
          borderTopWidth: 0
        },
        tabBarActiveTintColor: "#fff"
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            if (focused) {
              return (
                <Ionicons name="home" size={size} color={color}></Ionicons>
              );
            }

            return (
              <Ionicons
                name="home-outline"
                size={size}
                color={color}
              ></Ionicons>
            );
          }
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            if (focused) {
              return (
                <Ionicons name="search" size={size} color={color}></Ionicons>
              );
            }

            return (
              <Ionicons
                name="search-outline"
                size={size}
                color={color}
              ></Ionicons>
            );
          }
        }}
      />
      <Tab.Screen
        name="New"
        component={New}
        options={{
          tabBarIcon: ({ size }) => {
            return <ButtonNew size={size} />;
          }
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={Inbox}
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            if (focused) {
              return (
                <Ionicons
                  name="chatbubble-ellipses"
                  size={size}
                  color={color}
                ></Ionicons>
              );
            }

            return (
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={size}
                color={color}
              ></Ionicons>
            );
          }
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            if (focused) {
              return (
                <Ionicons name="person" size={size} color={color}></Ionicons>
              );
            }

            return (
              <Ionicons
                name="person-outline"
                size={size}
                color={color}
              ></Ionicons>
            );
          }
        }}
      />
    </Tab.Navigator>
  );
}
