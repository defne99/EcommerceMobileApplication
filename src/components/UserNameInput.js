import React from "react";
import {TextInput, StyleSheet} from "react-native";
import PropTypes from "prop-types"; // properties to input

const UserNameInput = (props) => {
    const {value, setValue} = props;
    return (
        <TextInput
            style={styles.defaultTextInputStyle}
            onChangeText={setValue}
            value={value}
        />
    );
}

const styles = StyleSheet.create({

    defaultTextInputStyle: {
        height: 40,
        fontSize: 20,
        top:60,
        paddingRight:90,
    }
})

UserNameInput.propTypes = { // property types
    value: PropTypes.string,
    setValue: PropTypes.func.isRequired,

}

UserNameInput.defaultProps={
    value: "",
}

export default UserNameInput;
