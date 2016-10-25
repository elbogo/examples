import React, {
  Component,
  Text,
  ToolbarAndroid,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';

import { Button } from 'react-native-material-design';

import moment from 'moment'
import realm from './database.js';
import styles from './view.styles.js';


import CreateModal from './create.js';
import TaskCard from './taskCard';

export default class MainView extends Component {
  constructor(){
    super();
    this.state = {
      tasks: this.getAndSortTasks()
    }
  }

  /*
   * @returns tasks sorted by dueTo field descending
  */
  getAndSortTasks(){
    return realm.objects('Task')
                       .map( task => { return task; })
                       .sort( (a,b) => { return b.dueTo.getTime() - a.dueTo.getTime() });
  }

  /*
   * updates state with sorted tasks
  */
  updateTasks(){

    this.setState( { tasks: this.getAndSortTasks() });
  }

  toggleCard(task){
      console.log('card: ', task);

      realm.write(() => {
        task.visible = !task.visible;
      });
      this.updateTasks();
  }

  render() {

    const { tasks } = this.state;

    let _scrollView: ScrollView;

    const buttonOverrides = {
      textColor: "#ffffff",
      backgroundColor: "#61b555",
      rippleColor: "#61b"
    };

     return <View>

        <Text style={styles.welcome}>
          List:
        </Text>
        <CreateModal realm={realm} updateTasks={ this.updateTasks.bind(this) } />
        <Text style={styles.instructions}>
          Задач: {tasks.length}
        </Text>
        <ScrollView
          ref={(scrollView) => { _scrollView = scrollView; }}
          style={styles.scrollView}
          automaticallyAdjustContentInsets={false}
          onScroll={() => { console.log('onScroll!!!'); }}
          scrollEventThrottle={200}>
            { tasks.map( (task,i) => {

              const dateFormatted = moment(task.dueTo).format('MMMM Do');

              return <View key={i} >

                  <Button
                          style={ styles.buttonText }
                          overrides={ buttonOverrides }
                          onPress={ () => { this.toggleCard(task) }}
                          text={ task.name +'('+ dateFormatted +')'+ '\n' }>
                  </Button>

                  <TaskCard
                        visible={task.visible}
                        toggleCard={ this.toggleCard.bind(this) }
                        task={ task }
                        onPress={ () => { this.toggleCard(task) } }
                  />

                </View>
              })
            }
        </ScrollView>
        <TouchableOpacity
          onPress={() => { _scrollView.scrollTo({y: 0}); }}>
          <Text style={styles.button}>Top</Text>
        </TouchableOpacity>
      </View>
  }
}
