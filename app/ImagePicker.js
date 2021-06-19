import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import FormData from 'form-data'

const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n) {
    u8arr[n - 1] = bstr.charCodeAt(n - 1)
    n -= 1 // to make eslint happy
  }
  return new File([u8arr], filename, { type: mime })
}


export default function ImageSelector(props) {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('앱에서 사진에 접근할 수 있도록 권한을 허가해 주세요');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      const file = dataURLtoFile(result.uri)
      const data= new FormData()
      data.append("file", file)
      props.setIsLoading(true)
      axios({
        method: "post",
        url: "https://chjinny.duckdns.org:5000/process", 
        data : data, 
      }).then((res) => {
        props.setImages([result, res.data]);
        props.setIsLoading(false)
      })
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button title="사진 선택하기" onPress={pickImage}/>
    </View>
  );
}
//{image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}