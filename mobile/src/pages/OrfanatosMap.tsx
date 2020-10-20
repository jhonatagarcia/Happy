import React, {useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { Feather } from '@expo/vector-icons'

import mapMarker from '../images/map-marker.png'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import api from '../services/api';

interface Orfanato {
    id: number,
    name: string,
    latitude: number,
    longitude: number
}

export default function OrfanatosMap() {
    const [orfanatos, setOrfanatos] = useState<Orfanato[]>([]);
    const navigation = useNavigation();

    useFocusEffect(() => {
        api.get('orfanatos').then(response => {
            setOrfanatos(response.data)
        });
    }, []);

    function handleNavigationOrfanatoDetalhes(id: number) {
        navigation.navigate('OrfanatoDetalhes', {id});
    }

    function handleNavigationCreateOrfanato() {
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
                {orfanatos.map(orfanato => {
                    return (
                        <Marker
                            key={orfanato.id}
                            icon={mapMarker}
                            calloutAnchor={{
                                x: 2.1,
                                y: 0.8,
                            }}
                            coordinate={{
                                latitude: orfanato.latitude,
                                longitude: orfanato.longitude
                            }}
                        >

                            <Callout tooltip onPress={() => handleNavigationOrfanatoDetalhes(orfanato.id)}>
                                <View style={styles.calloutContainer}>
                                    <Text style={styles.calloutText}>{orfanato.name}</Text>
                                </View>
                            </Callout>
                        </Marker>
                    )
                })}

            </MapView>

            <View style={styles.footer}>
            <Text style={styles.footerText}>{orfanatos.length} Orfanato(s) encontrados</Text>

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
