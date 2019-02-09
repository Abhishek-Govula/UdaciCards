import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Card, Button, Icon, Input } from 'react-native-elements'
import { saveDeckTitle } from "../utils/data";



export default class AddDeck extends React.Component {
  state = {
    title: ''
  }
  constructor() {
    super();
    this.addDeck = this.addDeck.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  handleInput({nativeEvent}) {
    this.setState({title: nativeEvent.text})
  }
  addDeck() {
    const {title} = this.state;
    if(title.length) {
      saveDeckTitle(title).then(data => {
        this.props.navigation.navigate('DeckList');
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <Card style={styles.card} title='Add a New Deck'>
          <Input
                placeholder='Deck Title'
                onChange={this.handleInput}
              />
            <Button
              backgroundColor='#03A9F4'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 10}}
              title='Add'
              disabled={!this.state.title.length}
              onPress={() => this.addDeck()} />
          </Card>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 15,
    // alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
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