import React from 'react';

import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { Feather } from '@expo/vector-icons'

import mapMarker from '../images/map-marker.png'
import { useNavigation } from '@react-navigation/native';

export default function OrfanatosMap() {
    const navigation = useNavigation();

    function handleNavigationOrfanatoDetalhes(){
        navigation.navigate('OrfanatoDetalhes');
    }

    function handleNavigationCreateOrfanato(){
        navigation.navigate('SelectMapPosition');
    }

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: -23.5026878,
                    longitude: -46.778004,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008,
                }}
            >
                <Marker
                    icon={mapMarker}
                    calloutAnchor={{
                        x: 2.1,
                        y: 0.8,
                    }}
                    coordinate={{
                        latitude: -23.5026878,
                        longitude: -46.778004,
                    }}
                >

                    <Callout tooltip onPress={handleNavigationOrfanatoDetalhes}>
                        <View style={styles.calloutContainer}>
                            <Text style={styles.calloutText}>Amamos</Text>
                        </View>
                    </Callout>
                </Marker>
            </MapView>

            <View style={styles.footer}>
                <Text style={styles.footerText}>2 Texto</Text>

                <TouchableOpacity style={styles.createOrfanatoButton} onPress={handleNavigationCreateOrfanato}>
                    <Feather name="plus" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },

    calloutContainer: {
        width: 160,
        height: 46,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 16,
        justifyContent: 'center',

    },

    calloutText: {
        color: '#0089a5',
        fontSize: 14,
        fontFamily: 'Nunito_700Bold',

    },
    footer: {
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 32,

        backgroundColor: '#fff',
        borderRadius: 20,
        height: 56,
        paddingLeft: 24,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        elevation: 1,

        shadowColor: "#aaaa",
        shadowOpacity: 1
    },

    footerText: {
        fontFamily: 'Nunito_700Bold',
        color: '#8fa7b3',
    },

    createOrfanatoButton: {
        width: 56,
        height: 56,
        backgroundColor: '#15c3d6',
        borderRadius: 20,

        justifyContent: 'center',
        alignItems: 'center'
    }

});
