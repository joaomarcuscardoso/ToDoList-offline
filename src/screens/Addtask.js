import React from 'react'
import {
    Modal,
    View,
    Text,
    Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native'
import commonStyles from '../commonStyles'

import DateTimePicker from '@react-native-community/datetimepicker'

import moment from 'moment'

const initialState = { desc: '', date: new Date(), showDatePicker: false}

export default class Addtask extends React.Component {
    state = {
        ...initialState
    }

    save = () => {
        const newTask = {
            desc: this.state.desc,
            date: this.state.date
        }

        this.props.onSave && this.props.onSave(newTask)
        
        this.setState({ ...initialState})

    }

    getDatePicker = () => {

        let datePicker=  <DateTimePicker mode="date"
            value={this.state.date}
            onChange={(_, date) => {
              date = date ? date : new Date()
              this.setState({date, showDatePicker: false})
            }}
          />

        const dateString = moment(this.state.date).format('ddd, D [de] MMMM [de]  YYYY')

        if(Platform.OS === 'android' ) {
            datePicker= (
                <View>
                    <TouchableOpacity onPress={() => this.setState({showDatePicker: true})}>
                            <Text style={styles.date}>
                                {dateString}
                            </Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker &&  datePicker}
                </View>
            )
        }
        return datePicker
    }
    
    render() {
         return(
            <Modal transparent={true} visible={this.props.isVisible}
            onRequestClose={this.props.onCancel}
            
            animationType='slide'>
            <TouchableWithoutFeedback
                onPress={this.props.onCancel}>
                <View style={styles.background}></View>
            </TouchableWithoutFeedback>
            <View style={styles.container}>
                <Text style={styles.header}>Nova Tarefa</Text>
                <TextInput style={styles.input} 
                        placeholder="Informe a Descrição..."
                        onChangeText={desc => this.setState({ desc })}
                        value={this.state.desc} />
                    {this.getDatePicker()}
                
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={this.props.onCancel}>
                        <Text style={styles.button}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.save}>
                        <Text style={styles.button}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableWithoutFeedback
                onPress={this.props.onCancel}>
                <View style={styles.background}></View>
            </TouchableWithoutFeedback>
            </Modal>
         )
     }
}

const styles = StyleSheet.create({
    background: {
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.7)',

    },
    container: {
        
        backgroundColor:'#fff',

    },
    header:{
        backgroundColor: commonStyles.colors.today,
        color:commonStyles.colors.secondary,
        padding:15,
        textAlign: 'center',
        fontSize: 18,
    },
    input:{
        width:'95%',
        padding:5,
        height:45,
        margin:10,
        backgroundColor:'#fff',
        borderWidth:1,
        borderColor:'#e3e3e3',
        borderRadius:6,
    },
    buttons: {
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    button: {
        margin:20,
        marginLeft:0,
        marginRight:30,
        color:commonStyles.colors.today
    },
    date: {
        fontSize:20,
        margin:10,
        padding:5

    }
})