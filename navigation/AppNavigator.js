import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import Deck from '../screens/Deck';
import AddCard from '../screens/AddCard';
import Quiz from '../screens/Quiz';


export default createAppContainer(createStackNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Home: {
    screen: MainTabNavigator,
    navigationOptions: {
      title: "Flash Cards",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "white"
      },
      headerTitleStyle: {
        color: 'black',
      },
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: () => ({
      headerBackTitle: null
    })
  },
  AddCard: {
    screen: AddCard
  },
  Quiz: {
    screen: Quiz
  }
}, {
  initialRouteName: 'Home'
})
);