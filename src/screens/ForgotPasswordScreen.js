import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, StyleSheet, } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Sukses', 'Email reset password telah dikirim');
    } catch (e) {
      Alert.alert('Gagal', e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lupa Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
     <TouchableOpacity style={styles.btnPrimary} onPress={handleReset}>
        <Text style={styles.btnPrimaryText}>Kirim Email Reset</Text>
      </TouchableOpacity>

     <View style={styles.footer}>
       <Text
          onPress={() => navigation.navigate("Login")}
          style={styles.link}
        >
            Kembali ke Login
          </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", paddingHorizontal: 24, backgroundColor: "#fff",},
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 32,},
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 15,},
  btnPrimary: { backgroundColor: "#2563eb", borderRadius: 8, padding: 14, alignItems: "center", marginTop: 4,},
  btnPrimaryText: { color: "#fff", fontWeight: "600", fontSize: 15, },
  footer: { marginTop: 24, gap: 10, alignItems: "center",},
  link: {color: "#2563eb", fontSize: 14,},
});