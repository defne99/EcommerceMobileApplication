import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import PropTypes from "prop-types";

const BookListItem = (props) => {
    const {
        _handleNavigate,
        uri,
        containerStyle,
        imageStyle,
        detailStyle,
        bookName,
        bookNameTextStyle,
        authorTextStyle,
        authorName,
        bookId,
        cost,
        costStyle,
        navigatePage
    } = props;
    return (
        <TouchableOpacity
            onPress={() => _handleNavigate(navigatePage, {params: {bookId}})}
            style={[styles.container, containerStyle]}>
            <Image
                source={{uri}}
                style={[styles.image, imageStyle]}
            />
            <View
                style={[styles.detail,detailStyle]}>
                <Text
                    style={[styles.bookNameText, bookNameTextStyle]}>
                    {bookName}
                </Text>

                <Text
                    style={[styles.authorText,authorTextStyle]}>
                    {authorName}
                </Text>

                <Text
                    style={[styles.costStyle, costStyle]}>
                    {cost}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container : {
        height: 250,
        elevation: 2,
        backgroundColor: '#FFF',
        marginLeft: 20,
        marginTop: 20,
        borderRadius: 15,
        marginBottom: 10,
        width: 150,
    },
    image: {
        width: 100,
        height: 150,
        marginLeft: 25,
        marginRight: 25,
        paddingTop: 10,
    },
    detail:{
        flexDirection: 'column',
        paddingTop: 5,
        paddingHorizontal: 10,
    },
    bookNameText: {
        fontWeight: 'bold',
        fontSize: 13,
        textAlign: 'center',
    },
    authorText: {
        fontWeight: 'bold',
        fontSize: 10,
        textAlign: 'center',
    },
    costStyle:{
        fontWeight: 'bold',
        fontSize: 20,
        color: '#FF8303',
        textAlign: 'center',
    }
})


BookListItem.propTypes = {
    _handleNavigate: PropTypes.func.isRequired,
    uri: PropTypes.string.isRequired,
    containerStyle: PropTypes.object,
    imageStyle: PropTypes.object,
    detailStyle: PropTypes.object,
    bookName: PropTypes.string.isRequired,
    bookNameTextStyle: PropTypes.object,
    authorTextStyle: PropTypes.object,
    authorName: PropTypes.string.isRequired,
    navigatePage: PropTypes.string,
    bookId: PropTypes.number.isRequired,
    cost: PropTypes.string.isRequired,
    costStyle: PropTypes.object
}

BookListItem.defaultProps = {
    containerStyle: {},
    imageStyle: {},
    detailStyle: {},
    bookNameTextStyle: {},
    authorTextStyle: {},
    costStyle: {},
    navigatePage: "Detail",
}


export default BookListItem;
