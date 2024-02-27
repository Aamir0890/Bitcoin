import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import "./shim";

import Transfer from './Wallet/Transfer';

import { useEffect } from 'react';
let bip39 = require('bip39')
let bip32 = require('bip32')
let bitcoin = require('bitcoinjs-lib')

    let seed = bip39.mnemonicToSeedSync("mnemonic goes here")
    let hdNode = bip32.fromSeed(seed)

    let childNode = hdNode.deriveHardened(0)
    let external = childNode.derive(1)
    console.log(bitcoin.payments.p2pkh({pubkey: external.publicKey}))
    
export default function App() {
   const press=async()=>{
    let address='n3zTfZe28CP83fCs558JxqaR57qMz2STkg'
    const response = await axios.get(`https://api.blockcypher.com/v1/btc/test3/addrs/${address}/balance`);
    let data = response.data
   
    console.log(data.final_balance)  // Convert satoshis to BTC
   }
    
    const fun=async()=>{
      const  headers= {
        'X-CMC_PRO_API_KEY': 'dd67e15a-1474-42b0-8db2-ffa3728eeb93'
      }
      const response = await axios.get('https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',headers)
      console.log(response.data)
    }
    
    useEffect(()=>{
   fun()
   press()
    },[])
  
  
  return (
    <View style={styles.container}>
  

     <Transfer/>
  {/* <Test/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
