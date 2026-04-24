import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

const ProductCard = ({ item, isGrid, onAdd }) => {
  return (
    <View style={[styles.card, isGrid ? styles.cardGrid : styles.cardList]}>
      <View style={styles.imageContainer}>
        <Text style={styles.imageEmoji}>{item.image}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <Text style={styles.category}>{item.category.toUpperCase()}</Text>
          <Text style={styles.rating}>★ {item.rating}</Text>
        </View>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.price}>Rp {item.price.toLocaleString('id-ID')}</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => onAdd(item)} // Memanggil fungsi dari props
        activeOpacity={0.7}
      >
        <Text style={styles.addText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles tetap sama dengan kodingan sebelumnya...
const styles = StyleSheet.create({
  card: { backgroundColor: '#FFF', borderRadius: 20, margin: 10, padding: 12, elevation: 4, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, flexDirection: 'row', alignItems: 'center' },
  cardGrid: { flexDirection: 'column', width: width / 2 - 25, alignItems: 'flex-start' },
  cardList: { marginHorizontal: 20 },
  imageContainer: { backgroundColor: '#F8F9FA', borderRadius: 15, width: 70, height: 70, justifyContent: 'center', alignItems: 'center' },
  imageEmoji: { fontSize: 35 },
  infoContainer: { flex: 1, marginLeft: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  category: { color: '#FF7675', fontSize: 10, fontWeight: 'bold' },
  rating: { color: '#FAB1A0', fontSize: 11, fontWeight: 'bold' },
  name: { fontSize: 16, fontWeight: 'bold', color: '#2D3436', marginTop: 2 },
  price: { fontSize: 14, color: '#636E72', marginTop: 4 },
  addButton: { backgroundColor: '#55E6C1', width: 35, height: 35, borderRadius: 10, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 12, right: 12 },
  addText: { color: '#FFF', fontSize: 20, fontWeight: 'bold' }
});

export default ProductCard;