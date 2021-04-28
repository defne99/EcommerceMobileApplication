import React from 'react';
import {View, Text, TextInput, StyleSheet, Platform} from 'react-native';
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/Ionicons";

const SearchBar = (props) => {
    const {
        containerStyle,
        contentStyle,
        textInputStyle,
        iconStyle,
        returnKeyType,
        placeholder,
        setSearchText,
        onSubmitEditing,
        searchText
    } = props;
    return (
        <View style={[styles.container, containerStyle]}>
            <View
                style={[styles.content, contentStyle]}>
                <Icon name="ios-search" style={[styles.icon, iconStyle]} />
                <TextInput
                    placeholder={placeholder}
                    style={[styles.textInput, textInputStyle]}
                    returnKeyType={returnKeyType}
                    value={searchText}
                    onChangeText={text => setSearchText(text)}
                    onSubmitEditing={(
                        {nativeEvent: {text, eventCount, target}}
                    ) => {
                        onSubmitEditing();
                    }}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        width: '100%',
    },
    content: {
        width: "100%",
        height: 37,
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingVertical: 1,
        paddingLeft: 10,
        alignItems: 'center',
        borderRadius: 20,
    },
    textInput: {
        fontSize: 16,
        marginLeft: 10,
        width: "90%",
        height: 35
    },
    icon: {
        fontSize: 18,
        width: "5%"
    }
})


SearchBar.propTypes = {
    containerStyle: PropTypes.object,
    contentStyle: PropTypes.object,
    textInputStyle: PropTypes.object,
    iconStyle: PropTypes.object,
    placeholder: PropTypes.string,
    searchText: PropTypes.string,
    setSearchText: PropTypes.func.isRequired,
    onSubmitEditing: PropTypes.func.isRequired,
    returnKeyType:
        Platform.OS === 'ios' ?
            PropTypes.oneOf(["done", "go", "next", "search", "send", "default", "emergency-call", "google", "route", "yahoo"])
            :
            PropTypes.oneOf(["done", "go", "next", "search", "send", "none", "previous"])
}


SearchBar.defaultProps = {
    containerStyle: {},
    contentStyle: {},
    textInputStyle: {},
    iconStyle: {},
    returnKeyType: "search",
    placeholder: "Search",
    searchText: "",
}

export default SearchBar;
