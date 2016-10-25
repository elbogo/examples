import React, {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3B3738',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 50,
    color: '#ffffff',
  },
  instructions: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 18,
    marginBottom: 5,
  },
  btnWhite: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 20,
    borderWidth: 2,
    borderColor: '#ffffff',
    margin: 5,
  },
  task: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 18,
    marginBottom: 5,
  },
  button: {
    height: 44,
    textAlign: 'center',
    overflow: 'hidden',
    backgroundColor: 'gray',
    borderWidth: 1,
    borderColor: 'white',
    color: '#ffffff'
  },
  scrollView: {
    backgroundColor: '#61b2a7',
    height: 200,
  },
  card: {
    position: 'absolute'
  }

});

module.exports = styles;
