import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet,} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import { auth } from "../config/firebase";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const token = await cred.user.getIdToken();
      await SecureStore.setItemAsync("auth_token", token);
      await SecureStore.setItemAsync("biometric_token", token);
    } catch (e) {
      Alert.alert("Login gagal", e.message);
    }
  };

  const handleBiometric = async () => {
    const token = await SecureStore.getItemAsync("biometric_token");
    if (!token || token.trim() === "") {
      Alert.alert("Belum ada session", "Silakan login dulu dengan password.");
      return;
    }
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Login dengan biometric",
      fallbackLabel: "Gunakan password",
    });
    if (result.success) {
      Alert.alert("Berhasil", "Welcome back!");
    } else {
      Alert.alert("Gagal", "Biometric tidak cocok.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

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

      <TouchableOpacity style={styles.btnPrimary} onPress={handleLogin}>
        <Text style={styles.btnPrimaryText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnSecondary} onPress={handleBiometric}>
        <Text style={styles.btnSecondaryText}>Login dengan Biometric</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text
          onPress={() => navigation.navigate("Register")}
          style={styles.link}
        >
          Belum punya akun? Daftar
        </Text>
        <Text
          onPress={() => navigation.navigate("ForgotPassword")}
          style={styles.link}
        >
          Lupa password?
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", paddingHorizontal: 24, backgroundColor: "#fff",},
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 32 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 15,},
  btnPrimary: { backgroundColor: "#2563eb", borderRadius: 8, padding: 14, alignItems: "center", marginTop: 4, },
  btnPrimaryText: { color: "#fff", fontWeight: "600", fontSize: 15 },
  btnSecondary: { borderWidth: 1, borderColor: "#2563eb", borderRadius: 8, padding: 14, alignItems: "center", marginTop: 10,},
  btnSecondaryText: { color: "#2563eb", fontWeight: "600", fontSize: 15 },
  footer: { marginTop: 24, gap: 10, alignItems: "center" },
  link: { color: "#2563eb", fontSize: 14 },
});