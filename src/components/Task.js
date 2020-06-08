import React from 'react'
import { 
    StyleSheet, 
    View, 
    Alert,
    Text, 
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native'
import  Swiapeable from 'react-native-gesture-handler/Swipeable'
import Icon from 'react-native-vector-icons/FontAwesome'

import moment from 'moment'
import 'moment/locale/pt-br'

import commnStyles from '../commonStyles'

export default props => {
    const doneOrNotStyle = props.doneAt != null ?
        { textDecorationLine: 'line-through'} : {}
    const date = props.doneAt ?  props.doneAt : props.estimateAt
    const formattedDate = moment(date).locale('pt-br')
        .format('ddd, D [de] MMMM [de]  YYYY')

    const getRightContent = () => {
        return( 
         
            <TouchableOpacity
            onPress={() => props.onDelete && props.onDelete(props.id)}
            style={styles.right}>
                <Icon name="trash" size={30} color="#fff" />
            </TouchableOpacity>
        )
    }
    const getLeftContent = () => {
        return( 
            <View style={styles.left}>
                <Icon name="trash" style={styles.excludeIcon} size={20} color="#fff" />
                <Text style={styles.excludeText}>Excluir</Text>
            </View>
        )
    }
    
    return (
        <Swiapeable renderRightActions={getRightContent} 
            renderLeftActions={getLeftContent}
            onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)}>

            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={() => props.onToggleTask(props.id)}
                >
                    <View style={styles.checkContainer}>
                        {getCheckView(props.doneAt)}
                    </View>
                </TouchableWithoutFeedback>
                <View >
                    <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
                    <Text style={styles.date}>{formattedDate}</Text>
                
                </View>
            </View>

        </Swiapeable>
    )
}
function getCheckView(doneAt) {
    if(doneAt) {
        return(

            <View style={styles.done}>
                <Icon name="check" size={20} color='#fff' ></Icon>  
            </View>
        )
    } else {
        return (
            <View style={styles.pending}>

            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth:1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingVertical: 10, 
    },
    checkContainer: {
        width: '20%',
        alignItems:'center',
        justifyContent: 'center'
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 13, 
        backgroundColor: '#4d7031',
        alignItems:'center',
        justifyContent:'center'       
    },
    desc: {
        color: commnStyles.colors.mainText,
        fontSize: 15
    },
    date: {
        color:commnStyles.colors.subText,
        fontSize: 12,
    },
    right: {
        backgroundColor:'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal:20
    },
    left: {
        flex:1,
        backgroundColor: 'red',
        flexDirection:'row',
        alignItems: 'center'
    },
    excludeIcon: {
        marginLeft:10,
    },
    excludeText: {
        color:'#fff',
        fontSize:20,
        margin:10
    }

})