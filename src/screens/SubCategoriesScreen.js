import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from "../constants/Colors";
import CategoryItem from "../components/CategoryItem";
import Categories from "../constants/Categories";
import Helper from "../services/Helper";
import FilterSubCategoryItem from "../components/FilterSubCategoryItem";

function SubCategoriesScreen({route, navigation}) {


    const [subCategories, setSubCategories] = useState([]);
    const [isFiltered, setIsFiltered] = useState(false);
    const [currentFilteredSubCategory, setCurrentFilteredSubCategory] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [books, setBooks] = useState([]);

    useEffect(() => {
        console.log(route);
        const {categoryId} = route.params;

        let category = Categories.filter(category => {
            if (category.id === categoryId) {
                navigation.setOptions({title: category.name});
                setCategoryName(category.name);
                return category;
            }
        })

        // localhost:8080/products/1/category
/*        fetch("localhost:8080/getProductsByCategory?category=" + categoryName, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(result => {

        }).catch(error => {
            console.log("subCategoryScreen -> useEffect ->catch:", error);
        })*/



        if (!Helper.isFalsy(category)) {
            setSubCategories(category[0]["subCategories"]);
        } else {
            alert("Not found subcategories!");
        }

    }, [])

    const _handleSubCategoryNavigate = (categoryId) => {

    }


    const _handleFilter = (subCategoryId) => { // updates states
        if(subCategoryId === 0){ // for "All"
            setIsFiltered(false);
            setCurrentFilteredSubCategory(categoryName);
            navigation.setOptions({title: categoryName}); // all oldugunda title genre adi
        } else {
            subCategories.filter(subCategory => { // subcateg id ye gore filtreleme
                if(subCategory.id === subCategoryId){
                    setIsFiltered(true);
                    setCurrentFilteredSubCategory(subCategory.name);
                    navigation.setOptions({title: subCategory.name});
                }
            })
        }

    }

    return <SafeAreaView style={{flex: 1, backgroundColor: Colors.WHITE}}>
        <View style={styles.container}>
            <ScrollView
                pagingEnabled={true}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.topScrollViewStyle}
            >

                <FilterSubCategoryItem
                    _handleFilter={_handleFilter}
                    subCategory={{}}
                />
                {
                    subCategories.map(subCategory => { // subcategories arrayi icinde doner
                        return (
                            <FilterSubCategoryItem
                                _handleFilter={_handleFilter}
                                subCategory={subCategory}
                            />
                        )
                    })
                }


            </ScrollView>

            <View style={styles.bookContentWrapper}>
                {
                    isFiltered ?
                        <Text style={styles.text}>{currentFilteredSubCategory} books</Text>
                        :
                        <Text style={styles.text}>All {categoryName} books</Text>
                }

            </View>
        </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: 5,
        paddingVertical: 10,
        backgroundColor: Colors.WHITE
    },
    topScrollViewStyle: {
        width: "100%",
        height: 46,
        marginBottom: 10,
    },
    bookContentWrapper: {
        width: "100%",
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 20,
        fontWeight: "bold"
    }
})


export default SubCategoriesScreen;
