import {SafeAreaView, View, Text, Image,ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
    TouchableOpacity,
    TextInput,
} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import BookListItem from "../components/BookListItem";


function ProductsScreen({navigation}) {
    function onLogOutPressed() {
        const jsonValue = JSON.stringify(false);
        AsyncStorage.setItem('isLoggedIn', jsonValue) // when isLoggedIn false we log out
            .then(() => {});
    };

    const _handleNavigate = (pageName, params) => {
        navigation.navigate(pageName, params);
    }

    return (
        <SafeAreaView>
            <View
                style={{
                    backgroundColor: '#FF8303',
                    height: 120,
                    borderBottomRightRadius: 20,
                    borderBottomLeftRadius: 20,
                    paddingHorizontal: 20,
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 10,
                        width: '100%',
                    }}>
                    <View style={{width: '65%'}}>
                        <Text
                            style={{
                                fontSize: 20,
                                color: '#FFF',
                                fontWeight: 'bold',
                            }}>
                            WELCOME
                        </Text>
                    </View>
                    <View style={{width: '50%', alignItems: 'flex-start'}}>
                        <Image
                            source={require('../constants/images/logo.jpg')}
                            style={{height: 50, width: 100}}
                        />
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 10,
                        width: '100%',
                    }}>
                    <View style={{flex: 1}}>
                        <View
                            style={{
                                height: 37,
                                backgroundColor: 'white',
                                flexDirection: 'row',
                                paddingBottom: 1,
                                paddingLeft: 5,

                                alignItems: 'center',
                                borderRadius: 20,
                            }}>
                            <Icon name="ios-search" style={{fontSize: 16}} />
                            <TextInput
                                placeholder="Search"
                                style={{fontSize: 12, marginLeft: 10}}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <ScrollView
                vertical
                showsVerticalScrollIndicator={false}
                style={{height: 550}}>
                <View
                    style={{
                        flexDirection: 'row',
                        paddingHorizontal: 20,
                        width: '100%',
                        alignItems: 'center',
                    }}>
                    <View style={{width: '50%'}}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 15,
                                color: '#FF8303',
                            }}>
                            Recommended
                        </Text>
                    </View>
                    <View
                        style={{
                            width: '50%',
                            alignItems: 'flex-end',
                            marginTop: 5,
                            paddingLeft: 5,
                        }}>
                        <View
                            style={{
                                backgroundColor: '#FF8303',
                                paddingHorizontal: 20,
                                paddingVertical: 5,
                                borderRadius: 15,
                            }}>
                            <Text
                                stytle={{
                                    fontWeight: 'bold',
                                    fontSize: 13,
                                    color: '#FFF',
                                }}>
                                MORE
                            </Text>
                        </View>
                    </View>
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{width: 400}}>


                    <BookListItem
                        uri='https://images-na.ssl-images-amazon.com/images/I/51k+lXZyJ6L._SX322_BO1,204,203,200_.jpg'
                        authorName="Amor Towles"
                        cost="$148.31"
                        bookId={1}
                        _handleNavigate={_handleNavigate}
                        bookName="A Gentleman In Moscow" />

                    <BookListItem
                        uri='https://images-na.ssl-images-amazon.com/images/I/51C-KZLZsCL._SX330_BO1,204,203,200_.jpg'
                        authorName="James Joyce"
                        cost="$76.03"
                        bookId={2}
                        _handleNavigate={_handleNavigate}
                        bookName="Ulysses" />

                    <TouchableOpacity
                        //onPress={() => navigation.navigate("Detail")}
                        style={{
                            height: 250,
                            elevation: 2,
                            backgroundColor: '#FFF',
                            marginLeft: 20,
                            marginTop: 20,
                            borderRadius: 15,
                            marginBottom: 10,
                            width: 150,
                        }}>
                        <Image
                            source={{
                                uri:
                                    'https://images-na.ssl-images-amazon.com/images/I/41dXAINKHLL._SX305_BO1,204,203,200_.jpg',
                            }}
                            style={{
                                width: 100,
                                height: 150,
                                marginLeft: 25,
                                marginRight: 25,
                                paddingTop: 10,
                            }}
                        />
                        <View
                            style={{
                                flexDirection: 'column',
                                paddingTop: 10,
                                paddingHorizontal: 10,
                            }}>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 15,
                                    textAlign: 'center',
                                }}>
                                "The Hair Carpet Weavers"
                            </Text>

                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 10,
                                    textAlign: 'center',
                                }}>
                                Andreas Eschbach
                            </Text>

                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 20,
                                    color: '#FF8303',
                                    textAlign: 'center',
                                }}>
                                $134.0
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        //onPress={() => navigation.navigate("Detail")}
                        style={{
                            height: 250,
                            elevation: 2,
                            backgroundColor: '#FFF',
                            marginLeft: 20,
                            marginTop: 20,
                            borderRadius: 15,
                            marginBottom: 10,
                            width: 150,
                        }}>
                        <Image
                            source={{
                                uri:
                                    'https://images-na.ssl-images-amazon.com/images/I/51GmzIeKdWL._SX400_BO1,204,203,200_.jpg',
                            }}
                            style={{
                                width: 100,
                                height: 150,
                                marginLeft: 25,
                                marginRight: 25,
                                paddingTop: 10,
                            }}
                        />
                        <View
                            style={{
                                flexDirection: 'column',
                                paddingTop: 10,
                                paddingHorizontal: 10,
                            }}>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 12,
                                    textAlign: 'center',
                                }}>
                                "It's Not Complicated: Simple Recipes for Every Day"
                            </Text>

                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 10,
                                    textAlign: 'center',
                                }}>
                                Katie Lee
                            </Text>

                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 20,
                                    color: '#FF8303',
                                    textAlign: 'center',
                                }}>
                                $25.0
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        //onPress={() => navigation.navigate("Detail")}
                        style={{
                            height: 250,
                            elevation: 2,
                            backgroundColor: '#FFF',
                            marginLeft: 20,
                            marginTop: 20,
                            borderRadius: 15,
                            marginBottom: 10,
                            width: 150,
                        }}>
                        <Image
                            source={{
                                uri:
                                    'https://images-na.ssl-images-amazon.com/images/I/41vN31PD7SL._SX323_BO1,204,203,200_.jpg',
                            }}
                            style={{
                                width: 100,
                                height: 150,
                                marginLeft: 25,
                                marginRight: 25,
                                paddingTop: 10,
                            }}
                        />
                        <View
                            style={{
                                flexDirection: 'column',
                                paddingTop: 10,
                                paddingHorizontal: 10,
                            }}>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 12,
                                    textAlign: 'center',
                                }}>
                                "The Lord of the Rings Illustrated Edition"
                            </Text>

                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 10,
                                    textAlign: 'center',
                                }}>
                                J.R.R. Tolkien
                            </Text>

                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 20,
                                    color: '#FF8303',
                                    textAlign: 'center',
                                }}>
                                $75.0
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        //onPress={() => navigation.navigate("Detail")}
                        style={{
                            height: 250,
                            elevation: 2,
                            backgroundColor: '#FFF',
                            marginLeft: 20,
                            marginTop: 20,
                            borderRadius: 15,
                            marginBottom: 10,
                            width: 150,
                        }}>
                        <Image
                            source={{
                                uri:
                                    'https://images-na.ssl-images-amazon.com/images/I/41g4AOaqMZL._SX322_BO1,204,203,200_.jpg',
                            }}
                            style={{
                                width: 100,
                                height: 150,
                                marginLeft: 25,
                                marginRight: 25,
                                paddingTop: 10,
                            }}
                        />
                        <View
                            style={{
                                flexDirection: 'column',
                                paddingTop: 10,
                                paddingHorizontal: 10,
                            }}>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 15,
                                    textAlign: 'center',
                                }}>
                                "One Day in December"
                            </Text>

                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 10,
                                    textAlign: 'center',
                                }}>
                                Josie Silver
                            </Text>

                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 20,
                                    color: '#FF8303',
                                    textAlign: 'center',
                                }}>
                                $7.0
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        //onPress={() => navigation.navigate("Detail")}
                        style={{
                            height: 250,
                            elevation: 2,
                            backgroundColor: '#FFF',
                            marginLeft: 20,
                            marginTop: 20,
                            borderRadius: 15,
                            marginBottom: 10,
                            width: 150,
                        }}>
                        <Image
                            source={{
                                uri:
                                    'https://images-na.ssl-images-amazon.com/images/I/61rQ28yz98L._SX417_BO1,204,203,200_.jpg',
                            }}
                            style={{
                                width: 100,
                                height: 150,
                                marginLeft: 25,
                                marginRight: 25,
                                paddingTop: 10,
                            }}
                        />
                        <View
                            style={{
                                flexDirection: 'column',
                                paddingTop: 10,
                                paddingHorizontal: 10,
                            }}>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 12,
                                    textAlign: 'center',
                                }}>
                                "Women in Science: 50 Fearless Pioneers Who Changed the World"
                            </Text>

                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 10,
                                    textAlign: 'center',
                                }}>
                                Rachel Ignotofsky
                            </Text>

                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 20,
                                    color: '#FF8303',
                                    textAlign: 'center',
                                }}>
                                $10.0
                            </Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>

                <View
                    style={{
                        flexDirection: 'row',
                        paddingHorizontal: 20,
                        width: '100%',
                        alignItems: 'center',
                    }}>
                    <View style={{width: '50%'}}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 15,
                                color: '#FF8303',
                            }}>
                            Upcoming
                        </Text>
                    </View>
                    <View style={{width: '50%', alignItems: 'flex-end', marginTop: 5}}>
                        <View
                            style={{
                                backgroundColor: '#FF8303',
                                paddingHorizontal: 20,
                                paddingVertical: 5,
                                borderRadius: 15,
                            }}>
                            <Text
                                stytle={{
                                    fontWeight: 'bold',
                                    fontSize: 13,
                                    color: '#FFF',
                                }}>
                                MORE
                            </Text>
                        </View>
                    </View>
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{height: 320}}>
                    <TouchableOpacity
                        //onPress={() => navigation.navigate("Detail")}
                        style={{
                            height: 250,
                            elevation: 2,
                            backgroundColor: '#FFF',
                            marginLeft: 20,
                            marginTop: 20,
                            borderRadius: 15,
                            marginBottom: 10,
                            width: 150,
                        }}>
                        <Image
                            source={{
                                uri:
                                    'https://images-na.ssl-images-amazon.com/images/I/914VwKCK3RL.jpg',
                            }}
                            style={{
                                width: 100,
                                height: 150,
                                marginLeft: 25,
                                marginRight: 25,
                                paddingTop: 10,
                            }}
                        />
                        <View
                            style={{
                                flexDirection: 'column',
                                paddingTop: 5,
                                paddingHorizontal: 10,
                            }}>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 13,
                                    textAlign: 'center',
                                }}>
                                "A Game of Thrones Leather Cloth Boxed Set"
                            </Text>

                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 10,
                                    textAlign: 'center',
                                }}>
                                George R. R. Martin
                            </Text>

                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 20,
                                    color: '#FF8303',
                                    textAlign: 'center',
                                }}>
                                $882.57
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        //onPress={() => navigation.navigate("Detail")}
                        style={{
                            height: 250,
                            elevation: 2,
                            backgroundColor: '#FFF',
                            marginLeft: 20,
                            marginTop: 20,
                            borderRadius: 15,
                            marginBottom: 10,
                            width: 150,
                        }}>
                        <Image
                            source={{
                                uri:
                                    'https://images-na.ssl-images-amazon.com/images/I/31BXYh6s9EL._SX342_BO1,204,203,200_.jpg',
                            }}
                            style={{
                                width: 100,
                                height: 150,
                                marginLeft: 25,
                                marginRight: 25,
                                paddingTop: 10,
                            }}
                        />
                        <View
                            style={{
                                flexDirection: 'column',
                                paddingTop: 10,
                                paddingHorizontal: 10,
                            }}>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 15,
                                    textAlign: 'center',
                                }}>
                                "Helium"
                            </Text>

                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 10,
                                    textAlign: 'center',
                                }}>
                                Ruby Francisco
                            </Text>

                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 20,
                                    color: '#FF8303',
                                    textAlign: 'center',
                                }}>
                                $158.0
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        //onPress={() => navigation.navigate("Detail")}
                        style={{
                            height: 250,
                            elevation: 2,
                            backgroundColor: '#FFF',
                            marginLeft: 20,
                            marginTop: 20,
                            borderRadius: 15,
                            marginBottom: 10,
                            width: 150,
                        }}>
                        <Image
                            source={{
                                uri:
                                    'https://images-na.ssl-images-amazon.com/images/I/51hzREF2dJL._SX322_BO1,204,203,200_.jpg',
                            }}
                            style={{
                                width: 100,
                                height: 150,
                                marginLeft: 25,
                                marginRight: 25,
                                paddingTop: 10,
                            }}
                        />
                        <View
                            style={{
                                flexDirection: 'column',
                                paddingTop: 10,
                                paddingHorizontal: 10,
                            }}>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 15,
                                    textAlign: 'center',
                                }}>
                                "It Ends with Us"
                            </Text>

                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 10,
                                    textAlign: 'center',
                                }}>
                                Colleen Hoover
                            </Text>

                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 20,
                                    color: '#FF8303',
                                    textAlign: 'center',
                                }}>
                                $16.99
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        //onPress={() => navigation.navigate("Detail")}
                        style={{
                            height: 250,
                            elevation: 2,
                            backgroundColor: '#FFF',
                            marginLeft: 20,
                            marginTop: 20,
                            borderRadius: 15,
                            marginBottom: 10,
                            width: 150,
                        }}>
                        <Image
                            source={{
                                uri:
                                    'https://i.dr.com.tr/cache/600x600-0/originals/0000000330969-1.jpg',
                            }}
                            style={{
                                width: 100,
                                height: 150,
                                marginLeft: 25,
                                marginRight: 25,
                                paddingTop: 10,
                            }}
                        />
                        <View
                            style={{
                                flexDirection: 'column',
                                paddingTop: 10,
                                paddingHorizontal: 10,
                            }}>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 12,
                                    textAlign: 'center',
                                }}>
                                "Dokuza Kadar On"
                            </Text>

                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 10,
                                    textAlign: 'center',
                                }}>
                                Özdemir Asaf
                            </Text>

                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 20,
                                    color: '#FF8303',
                                    textAlign: 'center',
                                }}>
                                $10.0
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        //onPress={() => navigation.navigate("Detail")}
                        style={{
                            height: 250,
                            elevation: 2,
                            backgroundColor: '#FFF',
                            marginLeft: 20,
                            marginTop: 20,
                            borderRadius: 15,
                            marginBottom: 10,
                            width: 150,
                        }}>
                        <Image
                            source={{
                                uri:
                                    'https://www.booktopia.com.au/covers/500/9780141366296/0000/around-the-world-in-80-days.jpg',
                            }}
                            style={{
                                width: 100,
                                height: 150,
                                marginLeft: 25,
                                marginRight: 25,
                                paddingTop: 10,
                            }}
                        />
                        <View
                            style={{
                                flexDirection: 'column',
                                paddingTop: 10,
                                paddingHorizontal: 10,
                            }}>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 12,
                                    textAlign: 'center',
                                }}>
                                "Around the World in Eighty Days"
                            </Text>

                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 10,
                                    textAlign: 'center',
                                }}>
                                Jules Verne
                            </Text>

                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 20,
                                    color: '#FF8303',
                                    textAlign: 'center',
                                }}>
                                $75.0
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        //onPress={() => navigation.navigate("Detail")}
                        style={{
                            height: 250,
                            elevation: 2,
                            backgroundColor: '#FFF',
                            marginLeft: 20,
                            marginTop: 20,
                            borderRadius: 15,
                            marginBottom: 10,
                            width: 150,
                        }}>
                        <Image
                            source={{
                                uri:
                                    'https://images.booksense.com/images/464/700/9781538700464.jpg',
                            }}
                            style={{
                                width: 100,
                                height: 150,
                                marginLeft: 25,
                                marginRight: 25,
                                paddingTop: 10,
                            }}
                        />
                        <View
                            style={{
                                flexDirection: 'column',
                                paddingTop: 10,
                                paddingHorizontal: 10,
                            }}>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 12,
                                    textAlign: 'center',
                                }}>
                                "Elizabeth & Margaret: The Intimate World of the Windsor
                                Sisters"
                            </Text>

                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 10,
                                    textAlign: 'center',
                                }}>
                                Andrew Morton
                            </Text>

                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 20,
                                    color: '#FF8303',
                                    textAlign: 'center',
                                }}>
                                $200.0
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        //onPress={() => navigation.navigate("Detail")}
                        style={{
                            height: 250,
                            elevation: 2,
                            backgroundColor: '#FFF',
                            marginLeft: 20,
                            marginTop: 20,
                            borderRadius: 15,
                            marginBottom: 10,
                            width: 150,
                        }}>
                        <Image
                            source={{
                                uri:
                                    'https://i5.walmartimages.com/asr/78d7fe13-ecde-4003-9a8e-3ac1de7c387b_1.037cb7f19f37b2292040df4c932613fb.jpeg?odnWidth=612&odnHeight=612&odnBg=ffffff',
                            }}
                            style={{
                                width: 100,
                                height: 150,
                                marginLeft: 25,
                                marginRight: 25,
                                paddingTop: 10,
                            }}
                        />
                        <View
                            style={{
                                flexDirection: 'column',
                                paddingTop: 10,
                                paddingHorizontal: 10,
                            }}>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 10,
                                    textAlign: 'center',
                                }}>
                                "The Essential New York Times Cookbook: Classic Recipes for a
                                New Century"
                            </Text>

                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 10,
                                    textAlign: 'center',
                                }}>
                                Amanda Hesser
                            </Text>

                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 20,
                                    color: '#FF8303',
                                    textAlign: 'center',
                                }}>
                                $210.0
                            </Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
                <TouchableOpacity
                    style={{
                        height: 200,
                        width: 120,
                        marginBottom: 5,
                        marginTop: 5,
                        alignItems: 'center',
                    }}
                    onPress={() => onLogOutPressed()}>
                    <View
                        style={{
                            backgroundColor: '#FF8303',
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            borderRadius: 15,
                            alignItems: 'center',
                        }}>
                        <Text
                            stytle={{
                                fontWeight: 'bold',
                                fontSize: 13,
                                color: 'white',
                                textAlign: 'center',
                            }}>
                            LogOut
                        </Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

export default ProductsScreen;
