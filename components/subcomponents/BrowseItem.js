import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, Platform } from 'react-native'

import { LoadImage } from './LoadImage'

export default function BrowseItem({ name, desc, price, photo, clickHandler }) {
  const [url, setUrl] = useState('')

  const getImage = async () => {
    let image = await LoadImage(photo)
    setUrl(image)
  }

  useEffect(() => {
    getImage()
  }, [])

  return (
    <TouchableOpacity style={styles.container} onPress={clickHandler}>
      <Image style={styles.image} source={{uri: url}} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.desc}>{desc}</Text>
      <Text style={styles.price}>{`$${price}`}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.2
  },
  image: {
    resizeMode: 'contain',
    width: 400,
    height: 400,
  },
  name: {
    paddingTop: 5,
    paddingBottom: 5,
    color: '#333333',
    fontWeight: '500',
    fontSize: 25
  },
  price: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#e91e63',
  },
  desc: {
    color: '#888888',
    fontSize: 12
  }
});
