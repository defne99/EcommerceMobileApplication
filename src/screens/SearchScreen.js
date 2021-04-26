import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, StyleSheet, Alert, ActivityIndicator, FlatList} from 'react-native';
import PropTypes from "prop-types";
import BookListItem from "../components/BookListItem";
import Colors from "../constants/Colors";

const SearchScreen = ({navigation, route}) => {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const dummyProducts = [
        {
            "productId": 30,
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
            "productId": 31,
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
        ];

    useEffect(() => {
        const {searchText} = route.params;

        setIsLoading(true);
        fetch("https://d4ee5144-8771-4114-965b-a9fb57da56ee.mock.pstmn.io/product/getProductsBySearch?search=" + searchText, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic dWxhc2VyYXNsYW5Ac2FiYW5jaXVuaXYuZWR1OmFkbWludWxhcw=='
            },
        })
            .then(response => response.json())
            .then(searchResults => {
                console.log(searchResults);
                setProducts(dummyProducts); // searchResults
                setIsLoading(false);
            })
            .catch(error => {
                console.log("SearchScreen -> useEffect ->catch:", error);
                setIsLoading(false);
                Alert("Error", "An error has occurred!");
            })

    },[])

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


    return (
        <View style={styles.container}>
            {
                isLoading ?
                    <View style={{height: "100%", width: "100%", justifyContent: "center", alignItems: "center"}}>
                        <ActivityIndicator size="large" color={Colors.DARK_MUSTARD}/>
                    </View>
                    :
                    <FlatList
                        data={products}
                        renderItem={renderItem}
                        numColumns={2}
                        keyExtractor={(item, index) => item.productId.toString()}
                    />
            }
        </View>
    )
}


const styles = StyleSheet.create({
    container: {

    }
})

export default SearchScreen;
