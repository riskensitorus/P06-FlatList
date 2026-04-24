import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';

const SearchBar = ({ value, onChangeText, onClear }) => (
  <View style={styles.container}>
    <View style={styles.box}>
      <Text style={styles.icon}>🔍</Text>
      <TextInput
        style={styles.input}
        placeholder="Cari makanan favoritmu..."
        placeholderTextColor="#B2BEC3"
        value={value}
        onChangeText={onChangeText}
      />
      {value !== '' && (
        <TouchableOpacity onPress={onClear}>
          <Text style={styles.clear}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, marginVertical: 10 },
  box: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 15, height: 50, alignItems: 'center', paddingHorizontal: 15, elevation: 2 },
  icon: { marginRight: 10, fontSize: 16 },
  input: { flex: 1, color: '#2D3436', fontSize: 14 },
  clear: { color: '#FF7675', fontWeight: 'bold', fontSize: 16 }
});

export default SearchBar;