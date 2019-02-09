import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements'
import { getDeck } from "../utils/data";
import { clearLocalNotification, setLocalNotification } from '../utils/notification';

const Result = ({percentage, back, restart}) => {
  return <Card style={styles.card} title="Result">
  <Text style={{fontSize: 50, textAlign: 'center'}}>{percentage}%</Text> 
  <Button 
    style={{marginTop: 10}}
    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 10}}
    title="Go Back"
    onPress={() => back()}
  />
  <Button 
    style={{marginTop: 10}}
    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 10}}
    title="Restart Quiz"
    type="outline"
    onPress={() => restart()}
  />
</Card>
}

export default class Quiz extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('deckName', 'Deck'),
    };
  };
  state = {
    showAnswer: false,
    deck: {}
  }
  constructor() {
    super();
    this.handleAnswer = this.handleAnswer.bind(this);
    this.restartQuiz = this.restartQuiz.bind(this);
    this.goBackToDeck = this.goBackToDeck.bind(this);
  }
  resetNotification() {
    clearLocalNotification()
      .then(setLocalNotification);
  }
  componentWillMount() {
    const { navigation } = this.props;
    const deckName = navigation.getParam('deckName', '');
    getDeck(deckName).then(data => {
      if(data) {
        this.setState({deck: data, questions: data.questions, current: 0, correct: 0, inCorrect: 0});
      }
    })
  }
  restartQuiz() {
    this.setState({current: 0, correct: 0, inCorrect: 0});
    this.resetNotification()
  }
  goBackToDeck() {
    this.props.navigation.goBack();
    this.resetNotification()
  }
  handleAnswer(answer) {
    const {current, correct, inCorrect} = this.state;
    this.setState({current: current + 1, correct: answer ? correct+1 : correct, inCorrect: !answer ? inCorrect+1 : inCorrect});
  }
  render() {
    const { current, questions, correct } = this.state;
    if(current && current == questions.length) {
      const percentage = ((correct/questions.length)*100).toFixed()
      return <View style={styles.container}>
        <Result percentage={percentage} back={this.goBackToDeck} restart={this.restartQuiz}/>
      </View>
    } else {
    return questions ?<View style={styles.container}>
        <Text style={{textAlign: 'center', fontWeight: 'bold'}}>Question {current+1} of {questions.length}</Text>
        <Card style={styles.card} title={questions[current].question}>
            {this.state.showAnswer ? <Text style={{fontSize: 20, textAlign: 'center'}}>{questions[current].answer}</Text> : <Button 
              title="Long Press to reveal the answer"
              type="clear"
              onLongPress={() => this.setState({showAnswer: true})}
            />}
            <Button 
              style={{marginTop: 10}}
              buttonStyle={{backgroundColor:'#66BB6A', borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 10}}
              title="Correct"
              onPress={() => this.handleAnswer(true)}
            />
            <Button
              buttonStyle={{backgroundColor:'#ef5350', borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 10}}
              title='Incorrect'
              onPress={() => this.handleAnswer(false)} />
          </Card>
      </View>
    : null;
    }
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