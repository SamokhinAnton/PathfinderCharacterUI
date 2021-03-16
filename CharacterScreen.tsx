import React from 'react';
import { Text, View } from 'react-native';
import {Guid} from "guid-typescript";

export default function CharacterScreen({ route }: any) {

  const { characterId } = route.params;

  return (
    <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Text>Character info screen!! Id = {characterId}</Text>
    </View>
  );
}
