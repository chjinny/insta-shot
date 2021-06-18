import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, ProgressViewIOSComponent } from 'react-native';
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


export default function Correct(props) {
    if (!props.src){
        return(
            <></>
        )
    }
    else if (props.dst){
      return <>
      {props.src && <Image source={{ uri: props.src.uri }} style={{flex : 1, resizeMode: 'contain'}}/>}
      </>
    }

    const file = dataURLtoFile(props.src.uri)
    const data= new FormData()
    data.append("file", file)
    props.setDst(axios({
      method: "post",
      url: "http://localhost:5000/process", 
      data : data, 
    }))
    return (
      <>
      {props.src && <Image source={{ uri: props.src.uri }} style={{flex : 1, resizeMode: 'contain'}}/>}
      </>
  );
}