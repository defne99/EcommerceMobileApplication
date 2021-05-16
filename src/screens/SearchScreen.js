import React, {useEffect, useState, useLayoutEffect, useRef} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Alert,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    ScrollView,
    Dimensions
} from 'react-native';
import BookListItem from "../components/BookListItem";
import Colors from "../constants/Colors";
import Icon from 'react-native-vector-icons/FontAwesome5';
import HOCModal from "../components/HOCModal";

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const SearchScreen = ({navigation, route}) => {
    console.disableYellowBox = true;
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
    const [isSortModalVisible, setIsSortModalVisible] = useState(false);
    const [subFilterCategories, setSubFilterCategories] = useState([]);
    const [customFilterMinValue, setCustomFilterMinValue] = useState(null);
    const [customFilterMaxValue, setCustomFilterMaxValue] = useState(null);
    const paginationScrollView = useRef();
    const filterCategories = [
        {
            id: 1,
            name: 'Price',
            filters: [
                {
                    filterId: 10,
                    value: "0-5$",
                    minValue: 0.00,
                    maxValue: 5.00
                },
                {
                    filterId: 11,
                    value: "6-10$",
                    minValue: 6.00,
                    maxValue: 10.00
                },
                {
                    filterId: 12,
                    value: "11-15$",
                    minValue: 11.00,
                    maxValue: 15.00
                },
                {
                    filterId: 13,
                    value: "16-20$",
                    minValue: 16.00,
                    maxValue: 20.00
                },
                {
                    filterId: 14,
                    value: "21-25$",
                    minValue: 21.00,
                    maxValue: 25.00
                },
                {
                    filterId: 15,
                    value: "26-30$",
                    minValue: 26.00,
                    maxValue: 30.00
                }
            ]
        },
    ];


    const sortCategories = [
        {
            id: 1,
            value: 'Price: Low to High',
            sortPattern: "Lowest"
        },
        {
            id: 2,
            value: 'Price: High to Low',
            sortPattern: "Highest"
        },
        {
            id: 3,
            value: 'Most Popular',
            sortPattern: "Most Popular"
        },
        {
            id: 4,
            value: 'A-Z',
            sortPattern: "A-Z"
        },
        {
            id: 5,
            value: 'Z-A',
            sortPattern: "Z-A"
        }
    ];

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
            "currentStock": 9,
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
            "currentStock": 0,
            "imgUrl": "https://www.booktopia.com.au/covers/500/9780141366296/0000/around-the-world-in-80-days.jpg"
        }
    ];

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                borderBottomWidth: 0,
                elevation: 0,
                shadowColor: 'transparent',
            }
        })
    }, [])

    useEffect(() => {
        const {searchText} = route.params;
        console.log(searchText);
        console.log("mertmertmert");
        setIsLoading(true);
        setProducts(dummyProducts); // kapa
        setFilteredProducts(dummyProducts);  // kapa
        //https://d4ee5144-8771-4114-965b-a9fb57da56ee.mock.pstmn.io/product/getProductsBySearch?search=
        fetch("http://localhost:8080/product/getProductsBySearch?search=" + searchText, {
            method: 'GET',
            headers: {
                //'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Type': 'application/json', //json mı istiyor?
                'Authorization': 'Basic dWxhc2VyYXNsYW5Ac2FiYW5jaXVuaXYuZWR1OmFkbWludWxhcw==',
                'Accept': 'application/json',
            },
        })
            .then(response => response.json())
            .then(searchResults => {
                //console.log(searchResults);
                setProducts(searchResults); // searchResults
                setFilteredProducts(searchResults);
                setIsLoading(false);
            })
            .catch(error => {
                //console.log("SearchScreen -> useEffect ->catch:", error);
                setIsLoading(false);
                Alert("Error", "An error has occurred!");
            })

    }, [])

    const sortList = (selectSort) => {
        let sortedProducts = filteredProducts.sort((a, b) => {
            if (selectSort === "Lowest") {
                return parseFloat(a.currentPrice) - parseFloat(b.currentPrice)
            } else if (selectSort === "Highest") {
                return parseFloat(b.currentPrice) - parseFloat(a.currentPrice)
            } else if (selectSort === "Most Popular") {
                return parseInt(a.currentStock) - parseInt(b.currentStock)
            } else if (selectSort === "Least Popular") {
                return parseInt(b.currentStock) - parseInt(a.currentStock)
            } else if (selectSort === "A-Z") {
                return a.productName.localeCompare(b.productName)
            } else if (selectSort === "Z-A") {
                return b.productName.localeCompare(a.productName)
            }
        })

        setFilteredProducts([...sortedProducts]);
    }

    const _handleNavigate = (pageName, params) => {
        navigation.navigate(pageName, params);
    }

    const renderItem = ({item, index}) => {
        return <BookListItem
            bookId={item.productId}
            bookName={item.productName}
            _handleNavigate={_handleNavigate}
            authorName={item.writer}
            initialPrice={item.initialPrice}
            currentPrice={item.currentPrice}
            discount={item.discountRatio}
            currentStock={item.currentStock}
            uri={item.imgUrl}
        />
    }

    const toggleFilterModal = () => {
        setIsFilterModalVisible(!isFilterModalVisible);
    }

    const toggleSortModal = () => {
        setIsSortModalVisible(!isSortModalVisible);
    }

    useEffect(() => {

    }, [filterCategories])

    const renderFilterItem = ({item}) => {
        return (
            <TouchableOpacity
                onPress={() => {

                    let filteredCategories = filterCategories.filter((filterCategory) => {
                        if (filterCategory.id === item.id) {
                            return filterCategory;
                        }
                    })

                    setSubFilterCategories(prevState => ([...filteredCategories[0]['filters']]));
                    paginationScrollView.current.scrollTo({x: SCREEN_WIDTH, animated: true});
                }}
                style={styles.renderFilterTouchableStyle}
            >
                <Text style={{fontSize: 20, color: Colors.MIDDLE_GRAY}}>
                    {item.name}
                </Text>
                <Icon name="chevron-right" size={20} color={Colors.MIDDLE_GRAY}/>
            </TouchableOpacity>
        )
    }


    const renderSubFilterItem = ({item}) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    let filteredProductsResult = products.filter((product) => {
                        return product.currentPrice >= item.minValue && product.currentPrice <= item.maxValue;
                    });
                    setFilteredProducts(filteredProductsResult);
                    toggleFilterModal();
                }}
                style={styles.renderFilterTouchableStyle}
            >
                <Text style={{fontSize: 20, color: Colors.MIDDLE_GRAY}}>
                    {item.value}
                </Text>

            </TouchableOpacity>
        )
    }


    const renderSortCategoryItem = ({item}) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    sortList(item.sortPattern);
                    toggleSortModal();
                }}
                style={styles.renderFilterTouchableStyle}
            >

                <Text style={{fontSize: 20, color: Colors.MIDDLE_GRAY}}>
                    {item.value}
                </Text>
                <Icon name="sort" size={20} color={Colors.MIDDLE_GRAY}/>
            </TouchableOpacity>
        )
    }

    return (

        <View style={styles.container}>
            <View style={styles.filter}>
                <TouchableOpacity onPress={toggleFilterModal} style={styles.filterItem}>
                    <Icon name="filter" color={'#ff9a03'} size={24}/>
                    <Text style={styles.filterTextStyle}>Filter</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleSortModal} style={styles.filterItem}>
                    <Icon name="sort" color={'#ff9a03'} size={24}/>
                    <Text style={styles.filterTextStyle}>Sort</Text>
                </TouchableOpacity>
            </View>
            {
                isLoading ?
                    <View style={{height: "100%", width: "100%", justifyContent: "center", alignItems: "center"}}>
                        <ActivityIndicator size="large" color={Colors.DARK_MUSTARD}/>
                    </View>
                    :
                    <FlatList
                        data={filteredProducts}
                        renderItem={renderItem}
                        numColumns={2}
                        keyExtractor={(item, index) => item.productId.toString()}
                    />
            }

            <HOCModal
                isModalVisible={isFilterModalVisible}
                closeModal={toggleFilterModal}
            >
                <ScrollView
                    pagingEnabled={true}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.paginationContainer}
                    ref={paginationScrollView}
                >
                    <View style={styles.paginationPage}>
                        <FlatList
                            data={filterCategories}
                            renderItem={renderFilterItem}
                            keyExtractor={(item, index) => item.id.toString()}
                        />
                    </View>
                    <View style={styles.paginationPage}>

                        <FlatList
                            data={subFilterCategories}
                            renderItem={renderSubFilterItem}
                            keyExtractor={(item, index) => Math.random().toString()}
                            style={{maxHeight: '65%'}}
                        />
                        <View style={styles.filterCustomInputContainer}>
                            <TextInput
                                style={styles.filterCustomInput}
                                value={customFilterMinValue}
                                onChangeText={text => setCustomFilterMinValue(text)}
                                keyboardType="numeric"
                                placeholder="Min"
                            />

                            <View style={styles.gap}/>

                            <TextInput
                                style={styles.filterCustomInput}
                                value={customFilterMaxValue}
                                onChangeText={text => setCustomFilterMaxValue(text)}
                                keyboardType="numeric"
                                placeholder="Max"
                            />
                        </View>
                        <View style={{width: '100%', paddingHorizontal: 10, justifyContent: 'center'}}>
                            <TouchableOpacity
                                onPress={() => {
                                    let filteredProductsResult = products.filter((product) => {
                                        return product.currentPrice >= parseFloat(customFilterMinValue) && product.currentPrice <= parseFloat(customFilterMaxValue);
                                    });
                                    setFilteredProducts(filteredProductsResult);
                                    setCustomFilterMinValue(null);
                                    setCustomFilterMaxValue(null);
                                    toggleFilterModal();
                                }}
                                style={{
                                    width: '100%',
                                    height: 45,
                                    borderRadius: 5,
                                    alignItems: 'center',
                                    backgroundColor: '#ff9a03',
                                    justifyContent: 'center'
                                }}
                            >
                                <Text style={{color: Colors.WHITE, fontSize: 22}}>Apply</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </HOCModal>


            <HOCModal
                isModalVisible={isSortModalVisible}
                closeModal={toggleSortModal}
            >
                <ScrollView
                    style={styles.paginationContainer}
                >
                    <View style={styles.paginationPage}>
                        <FlatList
                            data={sortCategories}
                            renderItem={renderSortCategoryItem}
                            keyExtractor={(item, index) => item.id.toString()}
                        />
                    </View>
                </ScrollView>
            </HOCModal>


        </View>
    )
}


const styles = StyleSheet.create({
    container: {},
    filter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.LIGHT_1_GRAY,
        backgroundColor: Colors.WHITE

    },
    filterItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '47%',
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: Colors.LIGHT_1_GRAY,
        borderRadius: 10
    },
    filterTextStyle: {
        fontSize: 22,
        marginLeft: 5
    },
    paginationContainer: {},
    paginationPage: {
        width: SCREEN_WIDTH,
    },
    renderFilterTouchableStyle: {
        width: '100%',
        height: 50,
        backgroundColor: Colors.WHITE,
        shadowColor: Colors.DARK_GRAY,
        shadowOffset: {
            width: 0,
            height: 0.5
        },
        shadowOpacity: 0.2,
        elevation: 5,
        marginVertical: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 11
    },
    filterCustomInputContainer: {
        width: "100%",
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    filterCustomInput: {
        width: '45%',
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.LIGHT_1_GRAY,
        padding: 10,
    },
    gap: {
        width: 15,
        height: 2,
        backgroundColor: Colors.LIGHT_1_GRAY,
        borderRadius: 1
    }
})

export default SearchScreen;
