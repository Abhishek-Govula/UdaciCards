import { AsyncStorage } from 'react-native';

const allData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}
AsyncStorage.getItem('data').then((data) => {
  if(!data) {
    AsyncStorage.setItem('data', JSON.stringify(allData));
  }
})
// AsyncStorage.setItem('data', '')
export function getDecks() {
  return AsyncStorage.getItem('data').then(returnedData => {
    if(returnedData) {
      const d = JSON.parse(returnedData);
      return Object.keys(d).map(item => {
        return d[item];
      })
    } else {
      return undefined;
    }
  })
}
export function getDeck(title) {
  return AsyncStorage.getItem('data').then(returnedData => {
    if(returnedData) {
      const d = JSON.parse(returnedData);
      return d[title];
    } else {
      return undefined;
    }
  })
}
export async function saveDeckTitle(title) {
  const returnedData = await AsyncStorage.getItem('data');
    if(returnedData) {
      const d = JSON.parse(returnedData);
      const joinTitle = title.split(" ").join("")
      const newTitle = { title: title, questions: []}
      const updatedObj = { ...d}
      updatedObj[joinTitle] = {...newTitle}
      return AsyncStorage.setItem('data', JSON.stringify(updatedObj));
    } else {
      return undefined;
    }
}
export async function addCardToDeck(title, card) {
  const returnedData = await AsyncStorage.getItem('data');
    if(returnedData) {
      const d = JSON.parse(returnedData);
      d[title].questions.push(card);
      const updatedObj = { ...d}
      return AsyncStorage.setItem('data', JSON.stringify(updatedObj));
    } else {
      return undefined;
    }
}