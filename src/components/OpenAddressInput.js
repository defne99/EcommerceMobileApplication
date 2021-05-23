import React from "react";
import {TextInput, StyleSheet} from "react-native";
import PropTypes from "prop-types";
import Colors from '../constants/Colors'; // properties to input

const OpenAddressInput = (props) => {
    const {value, setValue, placeholderText, isSecureText, keyboardType,autoCorrect,autoCapitalize} = props;
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
        />
    );
}

const styles = StyleSheet.create({

    defaultTextInputStyle: {
        borderWidth: 1,
        borderRadius: 8,
        height: 100,
        width:330,
        fontSize: 16,
        left:30,
        paddingLeft: 30,
        alignItems:'flex-start',
        borderColor:Colors.METALIC_GRAY
    }
})

OpenAddressInput.propTypes = { // property types
    placeholderText: PropTypes.string,
    value: PropTypes.string,
    setValue: PropTypes.func.isRequired,
    isSecureText: PropTypes.bool,
    autoCorrect: PropTypes.bool,
    autoCapitalize: PropTypes.oneOf(["none","characters","words","sentences"]),
    keyboardType: PropTypes.oneOf(["default", "number-pad", "decimal-pad", "numeric", "email-address", "phone-pad"])

}

OpenAddressInput.defaultProps={
    placeholderText: "",
    value: "",
    isSecureText: false,
    autoCorrect: false,
    autoCapitalize: "none",
    keyboardType: "default"
}

export default OpenAddressInput;
