import React, {
  Component,
  Text,
  TextInput,
  Switch,
  TouchableHighlight,
  Modal,
  StyleSheet,
  View
} from 'react-native';

import CustomDatePicker from './datepicker.js';

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    borderRadius: 10,
    alignItems: 'center',
  },
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
  },
  rowTitle: {
    flex: 1,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 5,
    flex: 1,
    height: 44,
    alignSelf: 'stretch',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: '#61b2a1',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white'
  },
  buttonText: {
    fontSize: 18,
    margin: 5,
    borderWidth: 1,
    borderColor: '#fff',
    textAlign: 'center',
    color: '#fff'
  },
  modalButton: {
    marginTop: 10,
  }
});

class Button extends Component{
  constructor() {
      super();
      this.state = {
        active: false,
      }
  }

  onHighlight() {
    this.setState({active: true});
  }

  onUnhighlight() {
    this.setState({active: false});
  }

  render() {
    var colorStyle = {
      color: this.state.active ? '#fff' : '#000',
    };
    return (
      <TouchableHighlight
        onHideUnderlay={this.onUnhighlight.bind(this)}
        onPress={this.props.onPress}
        onShowUnderlay={this.onHighlight.bind(this)}
        style={[styles.button, this.props.style]}
        underlayColor="#c4c4c4">
          <Text style={[styles.buttonText, colorStyle]}>{this.props.children}</Text>
      </TouchableHighlight>
    );
  }
}


export default class CreateModal extends Component{
  constructor() {
      super();

      this.state = {
        animated: true,
        modalVisible: false,
        transparent: false,
        taskName: '',
        taskDescription: '',
        dueTo: 'укажите дату...'
      }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  toggleAnimated() {
    this.setState({animated: !this.state.animated});
  }

  toggleTransparent() {
    this.setState({transparent: !this.state.transparent})
  }

  addNewTask(){
    let { realm, updateTasks } = this.props
    let { taskName, taskDescription, dueTo } = this.state

    console.log( taskName, taskDescription, dueTo )
    if ( taskName /* & taskDescription */ ){
      realm.write(() => {
        realm.create('Task', {
          name: taskName,
          description: taskDescription,
          dueTo: typeof dueTo !== 'string' ? dueTo : new Date(),
          state: 'in progress',
          visible: false
        });
      });
      this.setState({taskName: '', taskDescription: '', dueTo: 'укажите дату...' });
      updateTasks();
    }
    this.setState({taskName: '', taskDescription: '', dueTo: 'укажите дату...' })

  }

  onDateChange(dueTo){
    console.log('dateChanged: ', dueTo);
    this.setState({ dueTo });
  }


  render() {
    const modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };
    const innerContainerTransparentStyle = this.state.transparent
      ? {backgroundColor: '#fff', padding: 20}
      : null;

    const { taskName, taskDescription, dueTo } = this.state

    return (
      <View>
        <Modal
          animated={this.state.animated}
          transparent={this.state.transparent}
          visible={this.state.modalVisible}
          onRequestClose={() => {this.setModalVisible(false)}}
          >
          <View style={[styles.container, modalBackgroundStyle]}>
            <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
              <Text>Название:</Text>
              <TextInput
                  style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                  onChangeText={(taskName) => this.setState({taskName})}
                  value={taskName}
              />
              <Text>Описание:</Text>
              <TextInput
                  style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                  onChangeText={(taskDescription) => this.setState({taskDescription})}
                  value={taskDescription}
              />
              <CustomDatePicker onDone={ date => this.onDateChange(date) }>
                <View>
                  <Text>Выполнить до:</Text>
                  <Text>{dueTo.toString()}</Text>
                  </View>
              </CustomDatePicker>
              <Button
              onPress={this.addNewTask.bind(this)}
              style={styles.modalButton}>
                Добавить
              </Button>
              <Button
              onPress={this.setModalVisible.bind(this, false)}
              style={styles.modalButton}>
                Готово
              </Button>
            </View>
          </View>
        </Modal>

        <View style={styles.row}>
          <Text style={styles.rowTitle}>Animated</Text>
          <Switch value={this.state.animated} onValueChange={this.toggleAnimated.bind(this)} />
        </View>

        <View style={styles.row}>
          <Text style={styles.rowTitle}>Transparent</Text>
          <Switch value={this.state.transparent} onValueChange={this.toggleTransparent.bind(this)} />
        </View>

        <Button onPress={this.setModalVisible.bind(this, true)} style={styles.button}>
          Создать
        </Button>
      </View>
    );
  }
}
