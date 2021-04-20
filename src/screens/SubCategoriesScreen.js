import React, {useEffect, useState} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
    ActivityIndicator,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from "../constants/Colors";
import CategoryItem from "../components/CategoryItem";
import Categories from "../constants/Categories";
import Helper from "../services/Helper";
import FilterSubCategoryItem from "../components/FilterSubCategoryItem";
import BookListItem from "../components/BookListItem";

function SubCategoriesScreen({route, navigation}) {


    const products = [
        {
            "productName": "Dokuza Kadar On",
            "category": "Poetry",
            "genre": "Turkish Poetry",
            "year": "2017",
            "description": "Yalnızlık paylaşılmaz Paylaşılsa yalnızlık olmaz.(Tanıtım Bülteninden)",
            "writer": "Özdemir Asaf",
            "distributor": "Yapı Kredi Yayınları",
            "warrantyDaysLeft": 30,
            "initialPrice": 10.0,
            "currentPrice": 10.0,
            "discountRatio": 0,
            "initialStock": 35,
            "currentStock": 27,
            "imgUrl": "https://i.dr.com.tr/cache/600x600-0/originals/0000000330969-1.jpg"
        }
        ,
        {
            "productName": "Around the World in Eighty Days",
            "category": "Novel",
            "genre": "Adventure",
            "year": "2016",
            "description": "One night Phileas Fogg bets his companions that he can travel across the world in just eighty days and the very next day sets out from the port of Dover with his servant Passeportout to achieve his aim. Passing through exotic lands and dangerous places, they seize whatever transportation is at hand - whether train or elephant - always racing against the clock.There are many alarms and surprises along the way - and a last minute setback that makes all the difference between winning and losing.",
            "writer": "Jules Verne",
            "distributor": "Puffin Classics",
            "warrantyDaysLeft": 30,
            "initialPrice": 75.0,
            "currentPrice": 30.0,
            "discountStart": "2021-05-08",
            "discountEnd": "2021-06-04",
            "discountRatio": 40,
            "initialStock": 60,
            "currentStock": 27,
            "imgUrl": "https://www.booktopia.com.au/covers/500/9780141366296/0000/around-the-world-in-80-days.jpg"
        }
        ,
        {
            "productName": "Elizabeth & Margaret: The Intimate World of the Windsor Sisters",
            "category": "Biography",
            "year": "2021",
            "description": "Perfect for fans of The Crown, this captivating biography from a New York Times bestselling author follows Queen Elizabeth II and her sister Margaret as they navigate life in the royal spotlight. ",
            "writer": "Andrew Morton",
            "distributor": "Grand Central Publishing",
            "warrantyDaysLeft": 30,
            "initialPrice": 200.0,
            "currentPrice": 180.0,
            "discountStart": "2021-04-01",
            "discountEnd": "2021-05-01",
            "discountRatio": 10,
            "initialStock": 30,
            "currentStock": 3,
            "imgUrl": "https://images.booksense.com/images/464/700/9781538700464.jpg"
        }
        ,
        {
            "productName": "The Essential New York Times Cookbook: Classic Recipes for a New Century",
            "category": "Cookbook",
            "year": "2010",
            "description": "A New York Times bestseller and Winner of the James Beard Award All the best recipes from 150 years of distinguished food journalism—a volume to take its place in America's kitchens alongside Mastering the Art of French Cooking and How to Cook Everything.",
            "writer": "Amanda Hesser",
            "distributor": "W. W. Norton Company",
            "warrantyDaysLeft": 30,
            "initialPrice": 210.0,
            "currentPrice": 210.0,
            "discountRatio": 0,
            "initialStock": 35,
            "currentStock": 17,
            "imgUrl": "https://i5.walmartimages.com/asr/78d7fe13-ecde-4003-9a8e-3ac1de7c387b_1.037cb7f19f37b2292040df4c932613fb.jpeg?odnWidth=612&odnHeight=612&odnBg=ffffff"
        }
        ,
        {
            "productName": "Who Fears Death",
            "category": "Novel",
            "genre": "Fantasy",
            "year": "2014",
            "description": "An award-winning literary author enters the world of magical realism with her World Fantasy Award-winning novel of a remarkable woman in post-apocalyptic Africa. ",
            "writer": "Nnedi Okorafor",
            "distributor": "DAW/Penguin",
            "warrantyDaysLeft": 30,
            "initialPrice": 99.9,
            "currentPrice": 99.9,
            "discountRatio": 0,
            "initialStock": 50,
            "currentStock": 25,
            "imgUrl": "https://images-na.ssl-images-amazon.com/images/I/51C5dkC4H+L._SX326_BO1,204,203,200_.jpg"
        }
    ];

    const [subCategories, setSubCategories] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        //console.log(route);
        const {categoryId} = route.params;

        let category = Categories.filter(category => {
            if (category.id === categoryId) {
                navigation.setOptions({title: category.name}); // bardaki ismi verir
                return category;
            }
        })

        if (!Helper.isFalsy(category)) {
            setSubCategories(category[0]["subCategories"]); // subcategoryitemları verir
        } else {
            Alert.alert("Error","Not found subcategories!");
        }

        setBooks(products); // fetchi acinca sil
        //setIsLoading(true);
        // localhost:8080/products/1/category
        /*      fetch("localhost:8080/getProductsByCategory?category=" + categoryName, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }).then(products => {
                    if(products){
                        setBooks(products);
                    } else {
                        Alert.alert("Error","Couldn't fetch products!")
                    }

                    setIsLoading(false);
                }).catch(error => {
                    console.log("subCategoryScreen -> useEffect ->catch:", error);
                    setIsLoading(false);
                    Alert("Error","An error has occurred!");
                })*/


    }, [])

    const _handleSubCategoryNavigate = (categoryId) => {

    }

    const _handleFilter = (subCategoryId, subCategoryName) => { // updates states
        //setIsLoading(true);
        if (subCategoryId === 0) { // for "All"
            navigation.setOptions({title: categoryName}); // all oldugunda title genre adi
            /*fetch("localhost:8080/getProductsByCategory?category=" + categoryName, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(products => {
                if(products){
                    setBooks(products);
                } else {
                    Alert.alert("Error","Couldn't fetch products!")
                }

                setIsLoading(false);
            }).catch(error => {
                console.log("subCategoryScreen -> useEffect ->catch:", error);
                setIsLoading(false);
                Alert("Error","An error has occurred!");
            })*/
        } else {
            subCategories.filter(subCategory => { // subcateg id ye gore filtreleme
                if (subCategory.id === subCategoryId) {
                    navigation.setOptions({title: subCategory.name});
                }
            })

            /*fetch("localhost:8080/getProductsByGenre?genre=" + subCategoryName, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(products => {
            if(products){
                setBooks(products);
            } else {
                Alert.alert("Error","Couldn't fetch products!")
            }

            setIsLoading(false);
        }).catch(error => {
            console.log("subCategoryScreen -> useEffect ->catch:", error);
            setIsLoading(false);
            Alert("Error","An error has occurred!");
        })*/
        }

    }

    const _handleNavigate = (pageName, params) => {
        navigation.navigate(pageName, params);
    }

    const renderItem = ({item, index}) => {
        return <BookListItem
            bookId={Math.random()}
            bookName={item.productName}
            _handleNavigate={_handleNavigate}
            authorName={item.writer}
            price={item.initialPrice}
            uri={item.imgUrl}
        />
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

            {
                isLoading ?
                    <View style={{height: "70%", width: "100%", justifyContent: "center", alignItems: "center"}}>
                        <ActivityIndicator size="large" color={Colors.DARK_MUSTARD}/>
                    </View>
                    :
                    <FlatList
                        data={books}
                        renderItem={renderItem}
                        numColumns={2}
                    />
            }

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
    text: {
        fontSize: 20,
        fontWeight: "bold"
    }
})


export default SubCategoriesScreen;
