import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Alert} from 'react-native';
import PropTypes from "prop-types";
import Colors from "../constants/Colors";
import Icon from 'react-native-vector-icons/Ionicons';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get("window");

const SavedAllCommentsListItem = (props) => {
    const {
        containerStyle,
        detailStyle,
        comment,
        commentId,
        full_name,
        productName,
        uri,
        commentProductId,
        imageStyle,
        commentTextStyle,
        full_nameTextStyle,
        productNameTextStyle,
        status
    } = props;

    function onDeleteOneCommentPressed() {
        console.log(commentId);
        fetch("http://10.0.2.2:8080/comments/deleteComment?id=" + commentId, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
            },

        }).then((result) => {
            console.log(result,"buradayım");
            if(result.ok){
                console.log("One Comment Deleted");
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
                <View style={{
                    flexDirection:'row',
                    marginTop:5,
                }}>
                    <View style={[styles.detail,detailStyle]}>
                        <Image source={{uri}} style={[styles.image, imageStyle]}></Image>
                    </View>
                    <View style={[styles.detail,detailStyle]}>
                        <Text style={[styles.productNameTextStyle, productNameTextStyle]}>{productName}</Text>
                        <View style={{
                            flexDirection:'row',
                            marginTop:5,
                        }}>
                            <Text style={{fontWeight: 'bold',
                                fontSize: 13,
                                textAlign: 'center',
                                color:Colors.DARK_MUSTARD, textDecorationLine:'underline'}}> My Comment:</Text>
                            <Text style={[styles.commentTextStyle,commentTextStyle]}> {comment}</Text>
                        </View>
                        <View style={{
                            flexDirection:'row'
                        }}>
                            <Text style={{fontWeight: 'bold',
                                fontSize: 13,
                                textAlign: 'center',
                                color:Colors.DARK_MUSTARD, textDecorationLine:'underline'}}> Status:</Text>
                            <Text style={[styles.commentTextStyle,commentTextStyle]}> {status}</Text>
                        </View>
                        <View style={{
                            flexDirection:'row',
                            left:100,
                            right:15,
                            marginTop:25,
                        }}>
                            <TouchableOpacity onPress={() => onDeleteOneCommentPressed()}>
                                <Icon name="ios-trash" style={styles.add_remove_style} />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </View>
        </View>




    )
}

const styles = StyleSheet.create({
    container : {
        flex:0.99,
        height: 140,
        elevation: 2,
        backgroundColor: '#FFF',
        marginTop: 15,
        borderRadius: 15,
        marginBottom: 10,
        width: 500,
        paddingVertical: 10,

    },
    detail:{
        flexDirection: 'column',
        paddingTop: 10,
        height: "100%"
    },
    add_remove_style:{
        flexDirection: 'row',
        paddingHorizontal:10,
        fontSize:20
    },

    full_nameTextStyle: {
        color: Colors.DARK_MUSTARD,
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'left',
    },
    commentTextStyle: {
        fontWeight: 'bold',
        fontSize: 13,
        textAlign: 'center',
    },
    productNameTextStyle: {
        color: Colors.DARK_MUSTARD,
        fontWeight: 'bold',
        fontSize: 10,
        textAlign:'left',
        textDecorationLine:'underline'
    },
    image: {
        width: 90,
        height: 90,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        resizeMode: "contain",
    },
})


SavedAllCommentsListItem.propTypes = {
    containerStyle: PropTypes.object,
    detailStyle: PropTypes.object,
    comment: PropTypes.string.isRequired,
    full_nameTextStyle: PropTypes.object,
    commentTextStyle: PropTypes.object,
    full_name: PropTypes.string.isRequired,
    commentId: PropTypes.number.isRequired,
    commentProductId: PropTypes.number.isRequired,
    productName:PropTypes.string.isRequired,
    status:PropTypes.string.isRequired,
    url:PropTypes.string.isRequired,
    productNameTextStyle:PropTypes.object,
    imageStyle: PropTypes.object,
}

SavedAllCommentsListItem.defaultProps = {
    containerStyle: {},
    detailStyle: {},
    full_nameTextStyle: {},
    commentTextStyle: {},
    productNameTextStyle:{},
    imageStyle: {},


}


export default SavedAllCommentsListItem;
