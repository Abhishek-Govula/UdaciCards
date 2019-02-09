import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements'
import { getDeck } from "../utils/data";


export default class Deck extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('deckName', 'Deck'),
    };
  };
  state = {
    deck: undefined
  }
  componentWillMount() {
    const { navigation } = this.props;
    const deckName = navigation.getParam('deckName', '');
    getDeck(deckName).then(data => {
      if(data) {
        this.setState({deck: data});
      }
    })
  }
  componentDidUpdate() {
    const { navigation } = this.props;
const deckName = navigation.getParam('deckName', '');
    this.props.navigation.addListener(
      'didFocus',
      payload => {
        getDeck(deckName).then(data => {
          if(data) {
            this.setState({deck: data});
          }
        })
      }
    );
  }
  render() {
    const {deck} = this.state;
    const { navigation } = this.props;
    const deckName = navigation.getParam('deckName', 'Deck');
    return deck ? <View style={styles.container}>
        <Card style={styles.card} title={deck.title}>
            <Text style={{fontSize: 46, color: '#ccc', textAlign: 'center', marginVertical: 10}}>{deck.questions.length} cards</Text>
            <Button 
              style={{marginTop: 10}}
              title="Add Card"
              type="outline"
              onPress={() => this.props.navigation.navigate('AddCard', {deckName: deckName})}
            />
            <Button
              icon={<Icon name='code' color='#ffffff' />}
              backgroundColor='#03A9F4'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 10}}
              title='Start Quiz' 
              disabled={!deck.questions.length}
              onPress={() => this.props.navigation.navigate('Quiz', {deckName: deckName})}
              />
          </Card>
      </View>: null
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 15,
    justifyContent: 'center'
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
});