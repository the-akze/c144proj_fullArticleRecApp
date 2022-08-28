import React from "react";
import HomeScreen from "./screens/Home";
import RecommendedMoviesScreen from "./screens/Recommendation";
import PopularMoviesScreen from "./screens/Popular";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { RFValue } from "react-native-responsive-fontsize";

export default function App() {
  return <AppContainer />;
}

const AppTopNavigation = createMaterialTopTabNavigator({
  RecommendedMovies: {
    screen: RecommendedMoviesScreen,
    navigationOptions: {
      tabBarLabel: "Recommended",
      tabBarOptions: {
        tabStyle: { backgroundColor: "#fff" },
        labelStyle: { color: "#000" },
        indicatorStyle: { backgroundColor: "#000" }
      }
    }
  },
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: "All Movies",
      tabBarOptions: {
        tabStyle: { backgroundColor: "#fff" },
        labelStyle: { color: "#000" },
        indicatorStyle: { backgroundColor: "#000" }
      }
    }
  },
  PopularMovies: {
    screen: PopularMoviesScreen,
    navigationOptions: {
      tabBarLabel: "Popular",
      tabBarOptions: {
        tabStyle: { backgroundColor: "#fff" },
        labelStyle: { color: "#000" },
        indicatorStyle: { backgroundColor: "#000" }
      }
    }
  },
}, {
  initialRouteName: "HomeScreen"
});

const AppContainer = createAppContainer(AppTopNavigation);