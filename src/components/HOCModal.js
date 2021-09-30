import React from "react";
import {View, StyleSheet, Modal, Dimensions, TouchableOpacity} from "react-native";
import Colors from "../constants/Colors";

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const HOCModal = props => {

    const{isModalVisible, closeModal, children} = props;


    return (
        <Modal visible={isModalVisible}
               animated='slide'
               transparent={true}
        >
            <View style={styles.container}>
                <View style={styles.outer}>
                    <View style={styles.inner}>
                        <TouchableOpacity onPress={closeModal} style={styles.closerTouch}>
                            <View style={styles.close}></View>
                        </TouchableOpacity>

                        {children}

                    </View>
                </View>

            </View>

        </Modal>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    outer: {
        width: '100%',
        height: (SCREEN_HEIGHT/1.5) + 5,
        backgroundColor: Colors.LIGHT_1_GRAY,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        position: 'absolute',
        bottom: 0
    },
    inner: {
        width: '100%',
        height: (SCREEN_HEIGHT/1.5),
        backgroundColor: Colors.WHITE,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        position: 'absolute',
        bottom: 0
    },
    closerTouch: {
        width: '100%',
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    close:{
        width: 70,
        height: 12,
        backgroundColor: Colors.METALIC_GRAY,
        borderRadius: 6

    }
});

export default HOCModal;
