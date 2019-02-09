import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Card, Button, Icon, Input } from 'react-native-elements'
import { addCardToDeck } from "../utils/data";


export default class AddCard extends React.Component {
  static navigationOptions = {
    title: 'Add Card',
  };
  state = {
    question: '',
    answer: ''
  }
  constructor() {
    super();
    this.handleInput = this.handleInput.bind(this)
    this.addToDeck = this.addToDeck.bind(this)
  }
  handleInput({nativeEvent}, name) {
    this.setState({[name]: nativeEvent.text})
  }
  addToDeck() {
    const { navigation } = this.props;
    const { question, answer } = this.state;
    const deckName = navigation.getParam('deckName', 'Deck');
    if(question.length && answer.length) {
      addCardToDeck(deckName, {question, answer}).then(data => {
        this.props.navigation.goBack();
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <Card style={styles.card} title='Add a New Card'>
          <Input placeholder='Question'name="question" onChange={(e) => this.handleInput(e, 'question')}/>
          <Input placeholder='Answer' name="answer" onChange={(e) =>this.handleInput(e, 'answer')} />
            <Button
              icon={<Icon name='code' color='#ffffff' />}
              backgroundColor='#03A9F4'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 10}}
              title='Add Card'
              disabled={!this.state.question.length || !this.state.answer.length}
              onPress={() => this.addToDeck()} />
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