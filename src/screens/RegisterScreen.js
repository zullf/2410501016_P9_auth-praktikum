import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, StyleSheet, } from 'react-native';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 const handleRegister = async () => {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(cred.user);
    Alert.alert('Sukses', 'Cek email Anda untuk verifikasi.');
  } catch (e) {
    Alert.alert('Registrasi gagal', e.message);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

     <TouchableOpacity style={styles.btnPrimary} onPress={handleRegister}>
        <Text style={styles.btnPrimaryText}>Register</Text>
      </TouchableOpacity>

     <View style={styles.footer}>
       <Text
          onPress={() => navigation.navigate("Login")}
          style={styles.link}
        >
            Sudah punya akun? Login
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