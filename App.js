/*
TODO: Add arrow graphic in, and make it correspond to background
TODO: Sort landscape view


#efc680
#e3993d

#fba238
#ffc592

#212577
#910528

#910528
#212577
*/

import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Font from 'expo-font';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true, randomQuote: 'Fetching quote...', chosenColor: 0, fontLoaded: false }
  };

  getQuote = () => {
    return fetch('https://tronalddump.io/random/quote')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          randomQuote: responseJson.value,
        });

        this.assignColor();

      })
      .catch((error) =>{
        this.setState({
          randomQuote: 'Problem loading quote, please retry.'
        });
        console.error(error);
      });
  }

  assignColor = () => {
    // All color options
    let colorOptions = [
      '#efc680', '#fba238', '#212577', '#910528'
    ];

    // Create new array of colors except the existing one
    let colorChoices = [];
    colorOptions.forEach((color, index) => {
      if(index !== this.state.chosenColor) {
        colorChoices.push(color);
      }
    });

    // Pick a color at random from new array
    let randomNewColor = colorChoices[Math.floor(Math.random()*colorChoices.length)];

    // Update state to say which color is being used
    let thisColor = colorOptions.indexOf(randomNewColor);
    this.setState({
      chosenColor: thisColor
    });

    // Update background to the new color
    styles.container = {
      ...styles.container,
      backgroundColor: randomNewColor
    }
  }

  async componentDidMount() {
    // load in fonts
    await Font.loadAsync({
      'hiragino-minsho-proN': require('./assets/fonts/hiragino-mincho-pron-w3.otf'),
    }).then(() => {
      this.setState({
        fontLoaded: true
      });
    });
    // pick a background color
    this.assignColor();
    // get a quote
    this.getQuote();
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.layoutBox}></View>
        { this.state.fontLoaded ? <Text style={styles.quoteMarkFirst}>“</Text> : null }
        <View style={styles.textContainer}>
          <Text style={styles.quote}>{this.state.randomQuote}</Text>
        </View>
        { this.state.fontLoaded ? <Text style={styles.quoteMarkSecond}>”</Text> : null }
        <View style={styles.layoutBox}></View>
        <View style={styles.buttonContainer}>
          <Button
            title="New Quote"
            style={styles.button}
            onPress={this.getQuote}
            />
        </View>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  layoutBox: {
    flex: 3
  },
  textContainer: {
    flex: 5,
    justifyContent:'center',
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    textAlign: 'right'
  },
  quote: {
    color: '#ffffff',
    fontSize: 20,
    padding: 50,
    textAlign: 'center',
    justifyContent:'center'
  },
  quoteMarkFirst: {
    flex: 2,
    color: '#ffffff',
    fontSize: 200,
    textAlign: 'left',
    fontFamily: 'hiragino-minsho-proN'
  },
  quoteMarkSecond: {
    flex: 2,
    color: '#ffffff',
    fontSize: 200,
    textAlign: 'right',
    fontFamily: 'hiragino-minsho-proN'
  }
});
