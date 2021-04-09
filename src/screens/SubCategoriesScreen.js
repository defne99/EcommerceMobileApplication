import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from "../constants/Colors";
import CategoryItem from "../components/CategoryItem";
import Categories from "../constants/Categories";
import Helper from "../services/Helper";

function SubCategoriesScreen({route, navigation}) {


    const [subCategories, setSubCategories] = useState([]);

    useEffect(() => {
        console.log(route);
        const {categoryId} = route.params;
        let category = Categories.filter(category => {
            if (category.id === categoryId) {
                return category;
            }
        })
        if(!Helper.isFalsy(category)){
            setSubCategories(category[0]["subCategories"]);
        } else {
            alert("Not found subcategories!");
        }

    },[])

    const _handleSubCategoryNavigate = (categoryId) => {

    }

    return <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
            {
                subCategories.map(subCategory => {
                    return <CategoryItem
                        item={subCategory}
                        onPress={_handleSubCategoryNavigate}
                        key={subCategory.id.toString()}
                    />
                })
            }

        </View>
    </SafeAreaView>
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: Colors.WHITE
    }
})

export default SubCategoriesScreen;
