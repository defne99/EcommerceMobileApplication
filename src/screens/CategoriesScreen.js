import React from 'react';
import {SafeAreaView, View, Text, StyleSheet, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from "../constants/Colors";
import CategoryItem from "../components/CategoryItem";
import Categories from "../constants/Categories";
import Helper from "../services/Helper";

function CategoriesScreen({navigation}) {


    const {navigate} = navigation; // navigation.navigate yapmamak icin

    const _handleCategoryNavigate = (categoryId) => {
        let category = Categories.filter(category => { // categoryidyi filtrele
            if (category.id === categoryId) {
                return category;
            }
        })
        if (!Helper.isFalsy(category)) { // ici bos gelmediyse
            category = category[0]; // 0.elemanı al
            navigate("SubCategories", {categoryId,categoryName: category.name}); // doluysa subcategorye git
        } else {
            Alert.alert("Hata", "Böyle bir kategori bulunmamaktadır!");
        }
    }

    return <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
            {
                Categories.map(category => { // categoryitemları ekrana bastır
                    return <CategoryItem // categotyscreende categoryitema parametre
                        item={category}
                        onPress={_handleCategoryNavigate}
                        key={category.id.toString()}
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

export default CategoriesScreen;
