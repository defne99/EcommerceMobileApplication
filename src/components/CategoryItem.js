// kategorideki itemlarrın özelliklerini genelledik

import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Colors from "../constants/Colors";
import PropTypes from "prop-types";

const CategoryItem = (props) => {

    const {item, onPress} = props;
    return (
        <TouchableOpacity onPress={() => {
            onPress(item.id); // basıldığında categorynin idysiyle onPress fonksiyonunu (_handleCategoryNavigate) cagirir
        }}>
        <View style={styles.container}>
            <Text style={styles.text}>{item.name}</Text>
        </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 60,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: Colors.METALIC_GRAY,
        justifyContent: "center",
        alignItems: "flex-start"
    },
    text: {
        fontSize: 20,
        color: Colors.MIDDLE_GRAY
    }
});


CategoryItem.propTypes = { // categoryitem için kullanacağımız parametrelerin tipleri
    item: PropTypes.object.isRequired, // item gelmek zorunda ve obje olmak zorunda
    onPress: PropTypes.func.isRequired
}

export default CategoryItem;
