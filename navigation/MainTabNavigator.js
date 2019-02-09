import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import DeckList from '../screens/DeckList';
import AddDeck from '../screens/AddDeck';

export default createBottomTabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={'md-list-box'}
      />
    ),
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={'ios-add-circle'}
      />
    ),
    },
  },
},
{ initialRouteName: 'DeckList' }
);
