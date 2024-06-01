import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";
import Home from "../pages/Home";
import Search from "../pages/Search";
import Inbox from "../pages/Inbox";
import New from "../pages/New";
import Profile from "../pages/Profile";

import { ButtonNew } from "../components/ButtonNew";
import { getDataProps } from "../types/getData";

const Tab = createBottomTabNavigator();

export function Routes({ getData }: getDataProps) {
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
              return <Ionicons name="home" size={size} color={color} />;
            }

            return <Ionicons name="home-outline" size={size} color={color} />;
          }
        }}
      />
      {/* <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            if (focused) {
              return (
                <Ionicons name="search" size={size} color={color} />
              );
            }

            return (
              <Ionicons
                name="search-outline"
                size={size}
                color={color}
               />
            );
          }
        }}
      /> */}
      <Tab.Screen
        name="New"
        component={New}
        options={{
          tabBarIcon: ({ size }) => <ButtonNew size={size} />
        }}
      />
      {/* <Tab.Screen
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
                 />
              );
            }

            return (
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={size}
                color={color}
               />
            );
          }
        }}
      /> */}
      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            if (focused) {
              return <Ionicons name="person" size={size} color={color} />;
            }

            return <Ionicons name="person-outline" size={size} color={color} />;
          }
        }}
      >
        {(props) => <Profile {...props} getData={getData} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
