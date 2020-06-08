import React from 'react'

import {
  StyleSheet, 
  View, 
  Text, 
  ImageBackground, 
  FlatList, 
  TouchableOpacity, 
  Alert,
  AsyncStorage,
  Platform} from 'react-native' 

import Task from '../components/Task'
import Addtask from './Addtask'
import commonStyles from '../commonStyles'
import todayImage from '../../assets/imgs/today.jpg'

import Icon from 'react-native-vector-icons/FontAwesome'


import moment from 'moment'
import 'moment/locale/pt-br'
const initialState = { 
  showDoneTasks: true,
  showAddTask: false,
  visibleTasks: [],
  tasks: []
}


export default class TasksList extends React.Component { 
    state = {
      ...initialState
    }
    
    componentDidMount = async () => {
      const stateString = await AsyncStorage.getItem('tasksState')
      const state = JSON.parse(stateString) || initialState
      this.setState(state, this.filterTasks)
    }
    
    toggleFilter = () => {
      this.setState({showDoneTasks: !this.state.showDoneTasks}, this.filterTasks)
    }
    filterTasks = () => {
      let visibleTasks = null
      if(this.state.showDoneTasks) {
        visibleTasks = [...this.state.tasks]

      } else {
        const pending = task => task.doneAt === null
        visibleTasks = this.state.tasks.filter(pending)
      }

      this.setState({visibleTasks})

      AsyncStorage.setItem('tasksState', JSON.stringify(this.state))
    }


    addTask = newTask => {
      if(!newTask.desc || !newTask.desc.trim()) {
        Alert.alert('Dados inválidos', 'Descrição não informada!')
        return
      }

      const tasks = [...this.state.tasks]
      tasks.push({
        id: Math.random(),
        desc: newTask.desc,
        estimateAt: newTask.date,
        doneAt: null
      })

      this.setState({tasks, showAddTask: false}, this.filterTasks)
    }


    toggleTask = taskId => {
      const tasks = [...this.state.tasks]
      tasks.forEach( task => {
        if(task.id === taskId ) {
            task.doneAt = task.doneAt ? null : new Date()
        }
      })
      Alert.alert = 
      this.setState({tasks}, this.filterTasks)
    }


    deleteTask = id => {
      const tasks = this.state.tasks.filter(task => task.id !== id)
      this.setState({ tasks }, this.filterTasks)
    }

    render() { 
      const today = moment().locale('pt-br').format('ddd, D [de] MMMM [de]  YYYY')
        return (
         <View style={styles.container}>
            <Addtask isVisible={this.state.showAddTask}
                onCancel={() => this.setState({ showAddTask: false })}
                onSave={this.addTask} />
            <ImageBackground style={styles.background} source={todayImage}>
              <View style={styles.iconBar} >
                 <TouchableOpacity onPress={this.toggleFilter}>
                   <Icon name={this.state.showDoneTasks ? 'eye' :  'eye-slash'} 
                      size={20} color={ commonStyles.colors.secondary}
                   />
                 </TouchableOpacity>
              </View>
              <View style={styles.titleBar}>
                <Text style={styles.title}>Hoje</Text>
                <Text style={styles.subtitle}>{today}</Text>
              </View>

          </ImageBackground>
          <View style={styles.tasksList} >
            <FlatList data={this.state.visibleTasks} 
              keyExtractor={item => `${item.id}`}
              renderItem={({item}) => <Task {...item} onToggleTask={this.toggleTask} onDelete={this.deleteTask} />} /> 
          </View>
          <TouchableOpacity 
            onPress={() => this.setState({showAddTask : true})}
            activeOpacity={0.7}
            style={styles.addButton}>
            <Icon name="plus" size={20} color={commonStyles.colors.secondary} />
          </TouchableOpacity>
         </View>
       );
     }
   }
   
const styles = StyleSheet.create({
    container: {
    flex: 1,

    },
    background: {
      flex:3
    },
    tasksList: {
      flex:7
    },
    titleBar: {
      flex:1,
      justifyContent:'flex-end',

    },
    title: {
        fontSize: 50,
    
        color: commonStyles.colors.secondary,
        marginLeft:20,
        marginBottom:20,
    
    },
    subtitle: {
      fontSize: 20,
    
      color: commonStyles.colors.secondary,
      marginLeft:20,
      marginBottom:30,
    },
    iconBar: {
      flexDirection: 'row',
      marginHorizontal: 20,
      justifyContent: 'flex-end',
      marginTop: Platform.OS === 'ios' ? 40 : 30
    },
    addButton: {
      position: 'absolute',
      right:30,
      bottom: 30,
      width: 50,
      height: 50,
      borderRadius:25,
      backgroundColor:commonStyles.colors.today,
      justifyContent:'center',
      alignItems:'center'
    }

});
