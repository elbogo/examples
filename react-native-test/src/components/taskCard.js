import React, {
  Component,
  Text,
  Image,
  StyleSheet,
  View,
  Dimensions
} from 'react-native';
import { Card, Button } from 'react-native-material-design';
// import { Toolbar as MaterialToolbar } from 'react-native-material-design';

var WIN = Dimensions.get('window');

const styles = StyleSheet.create({
  card: {
    // flex: 0,
    position: 'absolute',
    width: WIN.width,
    height: WIN.height,
    // alignSelf: "stretch",
    top: -230,
    // left: -12
  },
  image: {
    width: WIN.width*0.8,
    height: 200
  }
});

export default class TaskCard extends Component {
  constructor(props){

    super(props);

  }

  render() {

    const { visible, toggleCard, task } = this.props;

      return (
               visible && <View onPress={ () => { toggleCard(task) } } style={ styles.card }>
                  <Card>
                      <Card.Media
                          image={<Image source={require('./../images/bear-catching-fish.jpg')} style={ styles.image } />}
                          overlay
                      />
                      <Card.Body>
                          <Text>Some text to go in the body.</Text>
                      </Card.Body>
                      <Card.Actions position="right">
                          <Button onPress={ () => { toggleCard(task) }} text="ЗАКРЫТЬ" />
                      </Card.Actions>
                  </Card>
              </View>

      );
  }

}
