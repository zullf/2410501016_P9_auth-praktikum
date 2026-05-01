import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { reload } from 'firebase/auth';
import { useAuth } from '../contexts/AuthContext';

export default function HomeScreen() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      Alert.alert('Logout gagal', e.message);
    }
  };
  
  const handleRefreshVerification = async () => {
    try {
      await reload(user);
      Alert.alert('Info', user.emailVerified ? 'Email sudah terverifikasi!' : 'Email belum terverifikasi, cek inbox kamu.');
    } catch (e) {
      Alert.alert('Gagal', e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.info}>Email: {user?.email}</Text>
      <Text style={styles.info}>
        Status: {user?.emailVerified ? 'Terverifikasi' : 'Belum terverifikasi'}
      </Text>

      {!user?.emailVerified && (
        <Button title="Cek Status Verifikasi" onPress={handleRefreshVerification} />
      )}

      <View style={styles.gap} />
      <Button title="Logout" color="red" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 24, backgroundColor: '#fff',},
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, },
  info: { fontSize: 15, marginBottom: 8, color: '#444', },
  gap: { marginTop: 16,},
});