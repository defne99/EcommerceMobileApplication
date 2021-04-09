import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import PropTypes from "prop-types";

const BooksListScreen = (props) => {

    return (
        <View style={styles.container}>
            <Text>BooksList</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%"
    }
});


BooksListScreen.propTypes = {

}


export default BooksListScreen;
