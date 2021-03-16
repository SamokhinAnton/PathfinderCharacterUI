import 'react-native-gesture-handler';
import React from 'react';
import CharactersScreen from './CharactersScreen';
import { NavigationContainer } from '@react-navigation/native';
import CharacterScreen from './CharacterScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { Guid } from 'guid-typescript';
import { Alert } from 'react-native'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import InventoryScreen from "./Inventory";

const myErrorHandler = (e: any, isFatal: boolean | undefined) => {
  if (isFatal) {
    Alert.alert(
        'Unexpected error occurred',
        `
        Error: ${(isFatal) ? 'Fatal:' : ''} ${e.name} ${e.message}

        We will need to restart the app.
        `
    );
  } else {
    Alert.alert(e); // So that we can see it in the ADB logs in case of Android if needed
  }
}

//ErrorUtils.setGlobalHandler(myErrorHandler)

type RootStackParamList = {
  Characters: undefined;
  Character: { characterId: Guid };
};

const RootStack = createStackNavigator<RootStackParamList>();

const CharacterTab = createBottomTabNavigator();

function CharacterStackScreen({ route } : any){

  const { characterId } = route.params;
  return(
    <CharacterTab.Navigator>
      <CharacterTab.Screen name="Character" component={CharacterScreen} initialParams={{ characterId: characterId} } />
      <CharacterTab.Screen name="Inventory" component={InventoryScreen} />
    </CharacterTab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Characters">
        <RootStack.Screen
          name="Characters"
          component={CharactersScreen}
          options={{ title: 'Welcome' }}
        />
        <RootStack.Screen 
          name="Character"
          component={CharacterStackScreen}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}