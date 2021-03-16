import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, TouchableOpacity, ListRenderItemInfo } from 'react-native';
import  Carousel from 'react-native-snap-carousel';
import { Character } from './Models/Character'
import { CharacterService } from './CharacterService';
import { Constants } from "./Constants"

const SLIDER_WIDTH = Dimensions.get('window').width;
const SLIDER_HEIGHT = Dimensions.get('window').height;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT * 0.7);

function useGetCharacters(){
  const [characters, setCharacters] = useState<Character[]>(Array<Character>());
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      try {
        CharacterService.getAll()
        .then((d) => {
          setCharacters(d.data);
          setLoading(d.loading);
          // if(d.error)
          //   setError(d.error)
          //fwfwfwf test git push
        });
      } catch (error) {
        setError(error)
      }
  }, []);
      
    return { characters, loading, error }
}

function _renderItem( { item , index } : ListRenderItemInfo<Character>, navigation: any) {
    
    let image = {
      uri: `${Constants.host}/api/Image?characterId=${item.id}`,
      method: 'GET',
      headers: {
        Pragma: 'no-cache'
      }
    };
    return (
      <View style={styles.itemContainer}>
          <TouchableOpacity style={styles.itemContainer} 
                 onPress={() => navigation.navigate('Character', { characterId: item.id })}>
                   <ImageBackground 
                    style={styles.imgBackground}
                    imageStyle={styles.imgBackgroundStyle}
                    source={image} >
                </ImageBackground>
                <Text style={styles.counter}>
                        {item.name}
                      </Text>
            </TouchableOpacity>
      </View>
    );
  }

export default function CharactersScreen({navigation}: any) {
  const [name, setName] = useState("");
  
  var chars = useGetCharacters();
  
  return (
    <View>
        
      <Carousel
        //ref={(c) => carousel = c}
        data={chars.characters}
        renderItem={ (ri: ListRenderItemInfo<Character>) => _renderItem(ri, navigation)}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        containerCustomStyle={styles.carouselContainer}
        inactiveSlideShift={0}
        onSnapToItem={(index) => setName(chars.characters[index].name) }
        useScrollView={true}       
      />
    </View>
  );
}

const styles = StyleSheet.create({
    carouselContainer: {
      marginTop: 50
    },
    itemContainer: {
      width: ITEM_WIDTH,
      height: ITEM_HEIGHT,
      alignItems: 'center',
      justifyContent: 'center',
      //backgroundColor: 'white',
      borderRadius: 15
    },
    itemLabel: {
      color: 'white',
      fontSize: 24
    },
    counter: {
      marginTop: 25,
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    imgBackground: {
      width: '100%',
      height: '100%',
      flex: 1      
    },
    imgBackgroundStyle:{
      borderRadius: 15,
      borderColor: "black",
      borderWidth: 10
    }
  });
