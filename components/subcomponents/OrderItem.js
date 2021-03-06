import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

export default function OrderItem({ oid, date, total, status, clickHandler, buttonClickHandler }) {
  const onPickupPress = () => {
    buttonClickHandler(oid)
  }

  return (
    <TouchableOpacity style={styles.container} onPress={clickHandler}>
      <View style={{flex: 3}}>
        <Text style={styles.oid}>{oid}</Text>
        <Text>{`$${total}`}</Text>
        <Text>{date}</Text>
      </View>
      <View style={styles.rightSide}>
        <Text style={styles.oid}>{status}</Text>
        <TouchableOpacity
          style={[styles.pickup, {
              backgroundColor: status === 'CONFIRMED' ? '#e91e63' : '#eeeeee'
          }]}
          disabled={status != 'CONFIRMED'}
          onPress={onPickupPress}
        >
          <Text>PICKUP</Text>
        </TouchableOpacity>
      </View>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 0.2
  },
  oid: {
    color: '#e91e63',
    fontWeight: 'bold',
    fontSize: 20
  },
  rightSide: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pickup: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10
  }
});
