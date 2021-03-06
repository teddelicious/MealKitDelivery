import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity } from 'react-native'

import { ItemView } from '../subcomponents/ItemView'
import dollar from '../subcomponents/dollar'

export default function OrderSummary({ route, navigation }) {
  let closeStatus = false
  const order = route.params.order

  const Row = ({ label, value }) => (
    <View style={styles.row}>
      <Text style={styles.labelLeft}>{label}</Text>
      <Text style={styles.valueRight}>{value}</Text>
    </View>
  )

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault()

      if (closeStatus) {
        navigation.dispatch(e.data.action)
      }
    })
  }, [navigation])

  return (
    <View style={styles.container}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={styles.oid}>{order.oid}</Text>
        <Text style={styles.date}>{order.date}</Text>
        <Row label='status:' value={order.status} />
        <FlatList
          data={order.orderItems}
          renderItem={({ item }) => (
            <ItemView item={item} onDelete={null} />
          )}
          keyExtractor={item => item.sku}
        />
        <Row label='subtotal:' value={`$${dollar(order.subtotal)}`} />
        <Row label='tax(13%):' value={`$${dollar(order.tax)}`} />
        <Row label='tips:' value={`$${dollar(order.tips)}`} />
        <Row label='total:' value={`$${dollar(order.total)}`} />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => {
        closeStatus = true
        navigation.popToTop()
      }}>
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
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
    justifyContent: 'space-between',
    height: '100%'
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 10,
  },
  labelLeft: {
    width: '50%',
    textAlign: 'left',
    fontSize: 20,
    textTransform: 'uppercase',
    color: '#333333'
  },
  valueRight: {
    width: '50%',
    textAlign: 'right',
    fontSize: 18,
    fontStyle: 'italic',
    color: '#e91e63'
  },
  oid: {
    paddingTop: 5,
    paddingBottom: 5,
    color: '#e91e63',
    fontWeight: '500',
    fontSize: 25
  },
  date: {
    paddingTop: 5,
    paddingBottom: 5,
    color: '#333333',
    fontWeight: '500',
    fontSize: 20
  },
  price: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#e91e63',
  },
  desc: {
    color: '#888888',
    fontSize: 12
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#e91e63',
    borderRadius: 5
  }
});
