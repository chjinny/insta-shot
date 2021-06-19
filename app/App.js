import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import ImageSelector from './ImagePicker'
import logo from './assets/logo.png'; 
import Correct from './Correct';
import { WebView } from 'react-native-webview';

export default function App() {
  const [images, setImages] = useState([null, null]);
  const [isLoading, setIsLoading] = useState(false)
  console.log(images)
  return (
    <View style={{flex:1}}>
      <View style={{minWidth: 40, alignItems : 'center'}}>
        <Image source={logo} style={{ width : 200, height: 100, marginTop:10,  marginBottom:10, borderRadius : 10}} /> 
      </View>
      <View style={{flex:2, padding : 10, justifyContent:'flex-start', alignItems:'center'}}>
        <iframe  allowtransparency="true" src="https://tab2.clickmon.co.kr/pop/wp_ad_728.php?PopAd=CM_M_1003067%7C%5E%7CCM_A_1093475%7C%5E%7CAdver_M_1046207&mon_rf=REFERRER_URL" frameborder="0" scrolling="no"></iframe>
      </View>
      {isLoading ? <View style={{flex:10, flexDirection:"row", justifyContent:'center', alignItems:'center'}}>
        사진을 보정하고 있어요. 잠시만 기다려주세요
      </View>
      : 
      <View style={{flex:10, flexDirection:"row"}}>
        <View style={{flex:1}}>
          {!images[0] ? 
          <View style = {{flex:1, alignItems:'center', justifyContent:'center'}}>
            사진을 선택 해 주세요
          </View>
          : 
          <Image source={{ uri: images[0].uri }} style={{flex : 1, resizeMode: 'contain'}}/>}
        </View>
        <View style={{flex:1}}>
          {!images[1] ? 
          <View style = {{flex:1, alignItems:'center', justifyContent:'center'}}>
            보정된 사진이 여기에 나와요
          </View> 
          :
          <Image source={{ uri: images[1].uri }} style={{flex : 1, resizeMode: 'contain'}}/>}
        </View>
      </View>
      }
      <View style={{flex:2, padding : 10, alignItems:'center'}}>
        <Text>용량이 큰 사진은 오래 걸릴 수 있어요</Text>
        <ImageSelector setImages={setImages} setIsLoading={setIsLoading}></ImageSelector>
      </View>
      <View style={{flex:1, padding : 10, justifyContent:'flex-start', alignItems:'center'}}>
        <iframe allowtransparency="true" src="https://tab2.clickmon.co.kr/pop/wp_ad_728.php?PopAd=CM_M_1003067%7C%5E%7CCM_A_1093475%7C%5E%7CAdver_M_1046207&mon_rf=REFERRER_URL" frameborder="0" scrolling="no"></iframe>
      </View>
    </View>
  );
}