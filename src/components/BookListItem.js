import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, Dimensions} from 'react-native';
import PropTypes from "prop-types";
import Colors from "../constants/Colors";

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get("window");

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
        initialPrice,
        discount,
        currentPrice,
        priceStyle,
        navigatePage,
        currency
    } = props;

    let priced = currency+initialPrice;
    if(discount > 0){
        priced = <Text>
            <Text style={styles.initialPriceOverLine}>{currency+initialPrice}</Text>
            {currency+currentPrice}
        </Text>;
    }

    return (
        <TouchableOpacity
            onPress={() => _handleNavigate(navigatePage, {params: {bookId}})}
            style={[styles.container, containerStyle]}>
            <Image
                source={{uri}}
                style={[styles.image, imageStyle]}
            />
            <View
                style={[styles.detail, detailStyle]}>
                <Text
                    style={[styles.bookNameText, bookNameTextStyle]}>
                    {bookName}
                </Text>

                <Text
                    style={[styles.authorText,authorTextStyle]}>
                    {authorName}
                </Text>

                <Text
                    style={[styles.priceStyle, priceStyle]}>
                    {priced}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container : {
        height: SCREEN_HEIGHT / 4,
        elevation: 2,
        backgroundColor: '#FFF',
        marginTop: 20,
        borderRadius: 15,
        marginBottom: 10,
        width: (SCREEN_WIDTH - 20) / 2.1,
        paddingVertical: 10,
        marginHorizontal: 10
    },
    image: {
        width: "100%",
        height: "60%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        resizeMode: "contain"
    },
    detail:{
        flexDirection: 'column',
        paddingTop: 15,
        paddingHorizontal: 10,
        height: "40%"
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
    priceStyle:{
        fontWeight: 'bold',
        fontSize: 20,
        color: '#FF8303',
        textAlign: 'center',
    },
    initialPriceOverLine: {
        textDecorationLine: "line-through",
        fontSize: 16,
        color: Colors.MIDDLE_GRAY
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
    currency: PropTypes.string,
    bookId: PropTypes.number.isRequired,
    initialPrice: PropTypes.number.isRequired,
    discount: PropTypes.number,
    currentPrice: PropTypes.number.isRequired,
    priceStyle: PropTypes.object
}

BookListItem.defaultProps = {
    containerStyle: {},
    imageStyle: {},
    detailStyle: {},
    bookNameTextStyle: {},
    authorTextStyle: {},
    priceStyle: {},
    navigatePage: "Detail",
    currency: "$",
    discount: 0
}


export default BookListItem;
