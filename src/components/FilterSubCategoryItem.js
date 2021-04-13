// scrollviewdaki itemlar

import React from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import Colors from "../constants/Colors";
import PropTypes from "prop-types";

const FilterSubCategoryItem = (props) => {
    const {_handleFilter, subCategory} = props;
    const subCategoryId = Object.keys(subCategory).length > 0 ? subCategory.id : 0;
    const subCategoryName = Object.keys(subCategory).length > 0  ? subCategory.name : "All";
    return (
        <TouchableOpacity
            onPress={() => {_handleFilter(subCategoryId)}}
            key={subCategoryId.toString()}
        >
            <View
                style={styles.filterSubCategoryNames}
            >
                <Text style={styles.subCategoryNameText}>
                    {subCategoryName}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    filterSubCategoryNames: {
        width: "auto",
        height: 36,
        borderRadius: 18,
        marginHorizontal: 5,
        backgroundColor: Colors.DARK_MUSTARD,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10
    },
    subCategoryNameText: {
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.WHITE,
        textAlign: "center"
    }
});


FilterSubCategoryItem.propTypes = { // componentin propsları
    _handleFilter: PropTypes.func.isRequired,
    subCategory: PropTypes.object.isRequired,
}


export default FilterSubCategoryItem;
