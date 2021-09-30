import React from "react";
import {TextInput, StyleSheet} from "react-native";
import PropTypes from "prop-types"; // properties to input

const Input = (props) => {
    const {value, setValue, placeholderText, isSecureText, keyboardType,autoCorrect,autoCapitalize, testID} = props;
    return (
        <TextInput
            placeholder={placeholderText}
            style={styles.defaultTextInputStyle}
            onChangeText={setValue}
            secureTextEntry={isSecureText}
            keyboardType={keyboardType}
            value={value}
            autoCorrect={autoCorrect}
            autoCapitalize={autoCapitalize}
            testID={testID}
        />
    );
}

const styles = StyleSheet.create({

    defaultTextInputStyle: {
        borderWidth: 1,
        borderRadius: 8,
        height: 48,
        fontSize: 16,
        paddingLeft: 12,
        marginBottom: 16
    }
})

Input.propTypes = { // property types
    placeholderText: PropTypes.string,
    value: PropTypes.string,
    setValue: PropTypes.func.isRequired,
    isSecureText: PropTypes.bool,
    autoCorrect: PropTypes.bool,
    autoCapitalize: PropTypes.oneOf(["none","characters","words","sentences"]),
    keyboardType: PropTypes.oneOf(["default", "number-pad", "decimal-pad", "numeric", "email-address", "phone-pad"])

}

Input.defaultProps={
    placeholderText: "",
    value: "",
    isSecureText: false,
    autoCorrect: false,
    autoCapitalize: "none",
    keyboardType: "default"
}

export default Input;
