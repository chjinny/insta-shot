import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import ImageSelector from './ImagePicker'
import logo from './assets/logo.png'; 
import Correct from './Correct';

export default function App() {
  const [images, setImages] = useState([null, null]);
  console.log(images)
  return (
    <View style={{flex:1}}>
      <View style={{minWidth: 40, alignItems : 'center'}}>
        <Image source={logo} style={{ width : 200, height: 100, marginTop:10,  marginBottom:10, borderRadius : 10}} /> 
      </View>
      <View style={{flex:10, flexDirection:"row"}}>
        <View style={{flex:1}}>
          {images[0] && <Image source={{ uri: images[0].uri }} style={{flex : 1, resizeMode: 'contain'}}/>}
        </View>
        <View style={{flex:1}}>
          {images[1] && <Image source={{ uri: images[1].uri }} style={{flex : 1, resizeMode: 'contain'}}/>}
        </View>
      </View>
      <View style={{flex:1, padding : 10}}>
        <ImageSelector setImages={setImages}></ImageSelector>
      </View>
    </View>
  );
}