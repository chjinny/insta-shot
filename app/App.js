import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Platform} from 'react-native';
import ImageSelector from './ImagePicker'
import logo from './assets/logo.png'; 
import * as Analytics from 'expo-firebase-analytics';
import AdfitWebComponent from 'react-adfit-web-component'

export default function App() {
  const [images, setImages] = useState([null, null]);
  const [isLoading, setIsLoading] = useState(false)
  const [adSize, setAdSize] = useState([728, 90])
  const add_num = 2
  console.log(images)
  useEffect(() =>{
    setAdSize(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)? [320, 50]:[728, 90]);
    (async function() {
      try {
          const anal = await Analytics.setAnalyticsCollectionEnabled(true);
      } catch (e) {
          console.error(e);
      }
    })();
  }, [])
  return (
    <View style={{flex:1}}>
      <View style={{padding : 3, minWidth: 40, alignItems : 'center',  justifyContent:'flex-start', alignItems:'center',
      shadowOffset: {width: 0, height: 10 }, shadowOpacity:0.1, shadowRadius:10,
      elevation: 10 
      }}>
        <Image source={logo} style={{width : 200, height: 100, marginTop:10,  marginBottom:10, borderRadius : 10}} /> 
      </View>
      {isLoading ? <View style={{flex:10, flexDirection:"row", justifyContent:'center', alignItems:'center'}}>
        <Text>사진을 보정하고 있어요. 잠시만 기다려주세요</Text>
      </View>
      : 
      <View style={{flex:10, flexDirection:"row"}}>
        <View style={{flex:1}}>
          {!images[0] ? 
          <View style = {{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text> 사진을 선택 해 주세요</Text>
          </View>
          : 
          <Image source={{ uri: images[0].uri }} style={{flex : 1, resizeMode: 'contain'}}/>}
        </View>
        <View style={{alignItems:"center", justifyContent:"center", padding:10}}>
          <Text>➡</Text>
        </View>
        <View style={{flex:1}}>
          {!images[1] ? 
          <View style = {{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text>보정된 사진이 여기에 나와요</Text>
          </View> 
          :
          <Image source={{ uri: images[1].uri }} style={{flex : 1, resizeMode: 'contain'}}/>}
        </View>
      </View>
      }
      <View style={{flex:2, padding : 10, alignItems:'center',
      shadowOffset: {width: 0, height: -10 }, shadowOpacity:0.1, shadowRadius:10,
      elevation: 10 
    }}>
        <Text>용량이 큰 사진은 오래 걸릴 수 있어요</Text>
        <ImageSelector setImages={setImages} setIsLoading={setIsLoading}></ImageSelector>
      </View>
      <View style={{minWidth:adSize[1]*add_num, padding : 0, justifyContent:'center', alignItems:'center'}}>
        <AdfitWebComponent adUnit="DAN-Ddms0oIocZ5WEY0G" width="320" height="50"/>
        <AdfitWebComponent adUnit="DAN-Ddms0oIocZ5WEY0G" width="320" height="50"/>
        <AdfitWebComponent adUnit="DAN-Ddms0oIocZ5WEY0G" width="320" height="50"/>
      </View>
    </View>
  );
}