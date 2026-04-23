// App.js 
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Alert,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform, // Tambahkan ini
} from 'react-native';

import { PRODUCTS } from './data/products';
import ProductCard from './components/ProductCard';
import ContactsScreen from './screens/ContactsScreen'; 

export default function App() {
  const [activeTab, setActiveTab] = useState('shop');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return PRODUCTS;
    const query = searchQuery.toLowerCase().trim();
    return PRODUCTS.filter(
      (p) => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleProductPress = (product) => {
    Alert.alert(
      product.name, 
      `Harga: Rp ${product.price.toLocaleString('id-ID')}`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Mengatur StatusBar agar tetap kontras */}
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        {/* Row Utama: Judul dan Tabs */}
        <View style={styles.topRow}>
          <Text style={styles.headerTitle}>🛍️ Toko Kita</Text>
          
          <View style={styles.topTabs}>
            <TouchableOpacity 
              style={[styles.tabButton, activeTab === 'shop' && styles.activeTab]}
              onPress={() => setActiveTab('shop')}
            >
              <Text style={[styles.tabText, activeTab === 'shop' && styles.activeTabText]}>Shop</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.tabButton, activeTab === 'contacts' && styles.activeTab]}
              onPress={() => setActiveTab('contacts')}
            >
              <Text style={[styles.tabText, activeTab === 'contacts' && styles.activeTabText]}>Kontak</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        {activeTab === 'shop' && (
          <View style={styles.searchSection}>
            <View style={styles.searchContainer}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Cari produk..."
                placeholderTextColor="#9ca3af"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <Text style={styles.clearButton} onPress={() => setSearchQuery('')}>✕</Text>
              )}
            </View>
            <Text style={styles.resultInfo}>
              {searchQuery 
                ? `${filteredProducts.length} hasil ditemukan` 
                : `${PRODUCTS.length} produk tersedia`}
            </Text>
          </View>
        )}
      </View>

      {/* ===== ISI KONTEN ===== */}
      <View style={{ flex: 1 }}>
        {activeTab === 'shop' ? (
          <FlatList
            data={filteredProducts}
            renderItem={({ item }) => (
                <ProductCard 
                    item={item} 
                    onPress={() => handleProductPress(item)} 
                    onFavoritePress={() => {}} 
                />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyIcon}>🔍</Text>
                <Text style={styles.emptyText}>Produk tidak ditemukan</Text>
              </View>
            )}
          />
        ) : (
          <ContactsScreen />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f9fafb',
    // Memberikan padding atas ekstra khusus untuk Android agar tidak nempel status bar
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 0 
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 20, // Menambah padding atas agar navigasi lebih turun
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    // Efek bayangan agar header terlihat terpisah
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20, // Memberi jarak lebih lebar ke bawah
  },
  headerTitle: { 
    fontSize: 22, // Ukuran sedikit diperbesar agar jelas
    fontWeight: '800', 
    color: '#111827' 
  },
  topTabs: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    padding: 4,
  },
  tabButton: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#ffffff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#6366f1',
  },
  searchSection: {
    marginTop: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, paddingVertical: 12, fontSize: 15, color: '#111827' },
  clearButton: { padding: 4, color: '#9ca3af', fontSize: 18 },
  resultInfo: { fontSize: 12, color: '#6b7280', marginTop: 10 },
  listContent: { paddingVertical: 12, paddingBottom: 32 },
  emptyContainer: { alignItems: 'center', paddingVertical: 60 },
  emptyIcon: { fontSize: 56, marginBottom: 12 },
  emptyText: { fontSize: 16, color: '#374151', fontWeight: '600' },
});