import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Alert} from 'react-native';
import PropTypes from "prop-types";
import Colors from "../constants/Colors";
import Icon from 'react-native-vector-icons/Ionicons';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get("window");

const SavedAllCreditCardItem = (props) => {
    const {
        containerStyle,
        detailStyle,
        cardType,
        cardTypeTextStyle,
        creditCardNumber,
        Name,
        cvv,
        creditCardId,
        _handleNavigate,
        navigatePage,
        expire_Date,
        NameTextStyle,
        creditCardNumberTextStyle,
    } = props;

    function onEditCreditPressed() {
        _handleNavigate(navigatePage, {
            creditCardId: creditCardId,
            cardName: Name,
            cardType: cardType,
            cardNumber: creditCardNumber,
            date:expire_Date,
            cvv:cvv
        })
    };


    function onDeletePressed() {
        fetch("http://10.0.2.2:8080/creditCard/remove?id=" + creditCardId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },

        }).then((result) => {
            console.log(result,"buradayım");
            if(result.ok){
                console.log("Credit Card Removed");
            } else {
                if(status === 400){
                    Alert.alert("Error","Wrong operation");
                } else {
                    Alert.alert("Error","Something went wrong!");
                }
            }
        });
    }
    function onDeleteAllPressed() {
        fetch("http://10.0.2.2:8080/creditCard/removeAll?id=" + creditCardId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },

        }).then((result) => {
            console.log(result,"buradayım");
            if(result.ok){
                console.log("Credit Card Removed");
            } else {
                if(status === 400){
                    Alert.alert("Error","Wrong operation");
                } else {
                    Alert.alert("Error","Something went wrong!");
                }
            }
        });
    }
    return (
        <View style={{
            flexDirection:'row',
        }}>
            <View style={[styles.container,containerStyle]}>
                <View style={[styles.detail,detailStyle]}>
                    <View style={{
                        flexDirection:'row',
                        justifyContent:'space-evenly',

                    }}>
                        <Text
                            style={[styles.cardTypeTextStyle, cardTypeTextStyle]}>
                            {cardType}
                        </Text>
                        <Text
                            style={[styles.cardTypeTextStyle,cardTypeTextStyle]}>
                            {Name}
                        </Text>
                    </View>
                    <Text
                        style={[styles.creditCardNumberTextStyle,creditCardNumberTextStyle]}>
                        {creditCardNumber}
                    </Text>
                    <View style={{
                        flexDirection:'row',
                        justifyContent:'space-evenly',

                    }}>

                        <Text
                            style={[styles.NameStyleTextStyle,NameTextStyle]}>
                            {expire_Date}
                        </Text>
                        <Text
                            style={[styles.NameStyleTextStyle,NameTextStyle]}>
                            {cvv}
                        </Text>
                    </View>
                    <View style={{
                        flexDirection:'row',
                        marginTop:5,

                    }}>
                        <TouchableOpacity onPress={() => onEditCreditPressed()}>
                            <Icon name="ios-brush" style={styles.add_remove_style} />
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => onDeletePressed()}>
                            <Icon name="ios-trash" style={styles.add_remove_style} />
                        </TouchableOpacity>
                    </View>


                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        height: 120,
        elevation: 2,
        backgroundColor: '#FFF',
        marginTop: 20,
        borderRadius: 15,
        marginBottom: 10,
        width: 500,
        paddingVertical: 10,
        marginHorizontal: 10
    },
    detail:{
        flexDirection: 'column',
        paddingTop: 15,
        paddingHorizontal: 10,
        height: "40%"
    },
    cardTypeTextStyle: {
        color: Colors.DARK_MUSTARD,
        fontWeight: 'bold',
        fontSize: 13,
        textAlign: 'center',
    },
    creditCardNumberTextStyle: {
        fontWeight: 'bold',
        top:6,
        fontSize: 12,
        textAlign: 'center',
    },NameStyleTextStyle: {
        top:8,
        fontWeight: 'bold',
        fontSize: 13,
        color: Colors.DARK_MUSTARD,
        textAlign: 'center',
    },
    add_remove_style:{
        flexDirection: 'row',
        paddingHorizontal:15,
        left:30,
        fontSize:20,
        top:10

    },

})


SavedAllCreditCardItem.propTypes = {
    containerStyle: PropTypes.object,
    detailStyle: PropTypes.object,
    cardType: PropTypes.string.isRequired,
    cardTypeTextStyle: PropTypes.object,
    creditCardNumberTextStyle: PropTypes.object,
    creditCardNumber: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired,
    navigatePage: PropTypes.string,
}

SavedAllCreditCardItem.defaultProps = {
    containerStyle: {},
    detailStyle: {},
    cardTypeTextStyle: {},
    creditCardNumberTextStyle: {},
    NameTextStyle: {},
    navigatePage: "ChangeCreditCard",

}


export default SavedAllCreditCardItem;
