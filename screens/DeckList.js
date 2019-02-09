import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { getDecks } from "../utils/data";

export default class DeckList extends React.Component {
  state = {
    decks: []
  }
  componentWillMount() {
    getDecks().then(data => {
      if(data) {
        this.setState({decks: data});
      }
    })
  }
  componentDidUpdate() {
    this.props.navigation.addListener(
      'didFocus',
      payload => {
        getDecks().then(data => {
          if(data) {
            this.setState({decks: data});
          }
        })
      }
    );
  }
  render() {
    const { decks } = this.state;
    return (
      <ScrollView style={styles.container}>
        <View>
          {decks.map(deck => <TouchableOpacity 
            key={deck.title}
            onPress={() => this.props.navigation.navigate('Deck', {deckName: deck.title})} 
            style={styles.listitem}>
            <Text>{deck.title}</Text>
            <Text>{deck.questions.length} questions</Text>
          </TouchableOpacity>
          )}
        </View>
        
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 15,
  },
  listitem: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});