import React from 'react';

import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import OrfanatosMap from './pages/OrfanatosMap'

import SelectMapPosition from './pages/CreateOrfanato/SelectMapPosition';
import OrfanatoData from './pages/CreateOrfanato/OrfanatoData'
import Header from './components/Header';

const {Navigator, Screen} = createStackNavigator();

export default function Routes(){
    return (
        <NavigationContainer>
            <Navigator screenOptions={{headerShown: false, cardStyle:{backgroundColor: '#f2f3f5'}}}>
                <Screen name="OrfanatosMap" component={OrfanatosMap}/>

                <Screen name="OrfanatoDetalhes" component={OrfanatoDetalhes} 
                options={{
                    headerShown: true,
                    header: () => <Header showCancel={false} title="Orfanato"/>
                }}/>
                
                <Screen name="SelectMapPosition" component={SelectMapPosition}
                options={{
                    headerShown: true,
                    header: () => <Header title="Selecione no mapa"/>
                }}/>

                <Screen name="OrfanatoData" component={OrfanatoData}
                options={{
                    headerShown: true,
                    header: () => <Header title="Informe o dados"/>
                }}/>

            </Navigator>
        </NavigationContainer>
    )
}