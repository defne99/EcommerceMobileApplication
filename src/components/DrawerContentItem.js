import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import PropTypes from "prop-types";

const DrawerContentItem = (props) => {
    const { icon, menuTitle, onPress, iconSize } = props;

    return (

        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.leftPart}>
                    <Icon name={icon} size={iconSize} color={Colors.MIDDLE_GRAY} solid={true} />
                </View>
                <View style={styles.rightPart}>
                    <Text style={styles.menuTitle}>{menuTitle}</Text>
                </View>
            </View>
        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 40,
        paddingLeft: 10,
        flexDirection: "row",
        marginBottom: 10
    },
    leftPart: {
        width: "20%",
        justifyContent: "center",
        alignItems: "center",
    },
    rightPart: {
        width: "80%",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    menuTitle: {
        fontSize: 18,
    },
});

DrawerContentItem.propTypes = {
    icon: PropTypes.string.isRequired,
    menuTitle: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    iconSize: PropTypes.number.isRequired,
};

DrawerContentItem.defaultProps = {};

export default DrawerContentItem;
