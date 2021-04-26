import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import PropTypes from "prop-types";

const Base = (props) => {
    return (
        <View style={styles.container}>
            <Text>Base</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {

    }
})


Base.propTypes = {

}


Base.defaultProps = {

}

export default Base;
