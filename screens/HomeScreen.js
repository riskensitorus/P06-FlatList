import React, { useState, useMemo } from 'react';
import { StyleSheet, Text, View, FlatList, SectionList, ScrollView, TouchableOpacity, SafeAreaView, RefreshControl, Alert, Modal } from 'react-native';
import { PRODUCTS, CATEGORIES, getSectionedData } from '../data/products';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

const HomeScreen = () => {
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('Semua');
  const [isGrid, setIsGrid] = useState(false);
  const [isSection, setIsSection] = useState(false);
  const [sortType, setSortType] = useState('Reset');
  const [refreshing, setRefreshing] = useState(false);

  const [cartItems, setCartItems] = useState([]); 
  const [isModalVisible, setIsModalVisible] = useState(false); 

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
    Alert.alert("Berhasil", `${item.name} ditambah ke keranjang!`);
  };

  const filteredData = useMemo(() => {
    let data = PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) && 
      (activeCat === 'Semua' || p.category === activeCat)
    );
    if (sortType === 'Harga ↓') data.sort((a, b) => b.price - a.price);
    if (sortType === 'Harga ↑') data.sort((a, b) => a.price - b.price);
    if (sortType === 'Rating ★') data.sort((a, b) => b.rating - a.rating);
    return data;
  }, [search, activeCat, sortType]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <SafeAreaView style={styles.container}>
      
      {/* MODAL KERANJANG */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Daftar Pesanan 🛒</Text>
            
            <FlatList
              data={cartItems}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.cartItem}>
                  <Text style={{fontSize: 24}}>{item.image}</Text>
                  <View style={{flex: 1, marginLeft: 15}}>
                    <Text style={styles.cartItemName}>{item.name}</Text>
                    <Text style={styles.cartItemPrice}>Rp {item.price.toLocaleString('id-ID')}</Text>
                  </View>
                </View>
              )}
              ListEmptyComponent={<Text style={styles.emptyCart}>Belum ada pesanan nih...</Text>}
            />

            {cartItems.length > 0 && (
              <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Total Pembayaran:</Text>
                <Text style={styles.totalAmount}>Rp {totalPrice.toLocaleString('id-ID')}</Text>
              </View>
            )}

            <TouchableOpacity style={styles.closeBtn} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.closeBtnText}>Kembali Belanja</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.brandContainer}>
          <Text style={styles.logo}>RASA<Text style={{color:'#55E6C1'}}>•</Text>LOKAL</Text>
          <Text style={styles.subLogo}>Cita Rasa Nusantara</Text>
        </View>
        
        <View style={styles.navIcons}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => setIsModalVisible(true)}>
            <Text style={{fontSize: 22}}>🛒</Text>
            {cartItems.length > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartItems.length}</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconBtn} onPress={() => {setIsSection(!isSection); setIsGrid(false)}}>
            <Text style={{fontSize: 18}}>{isSection ? '📋' : '📁'}</Text>
          </TouchableOpacity>
          
          {!isSection && (
            <TouchableOpacity style={styles.iconBtn} onPress={() => setIsGrid(!isGrid)}>
              <Text style={{fontSize: 18}}>{isGrid ? '☰' : '▦'}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <SearchBar value={search} onChangeText={setSearch} onClear={() => setSearch('')} />

      <View style={styles.sortContainer}>
        {['Harga ↓', 'Harga ↑', 'Rating ★', 'Reset'].map(s => (
          <TouchableOpacity key={s} onPress={() => setSortType(s)} style={[styles.sortBtn, sortType === s && styles.sortActive]}>
            <Text style={[styles.sortBtnText, sortType === s && styles.sortTextActive]}>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{marginBottom: 10}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingLeft: 20}}>
          {CATEGORIES.map(c => (
            <TouchableOpacity key={c.id} onPress={() => setActiveCat(c.name)} style={[styles.chip, activeCat === c.name && styles.chipActive]}>
              <Text style={[styles.chipText, activeCat === c.name && styles.chipTextActive]}>{c.emoji} {c.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {isSection ? (
        <SectionList
          sections={getSectionedData(filteredData)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProductCard item={item} isGrid={false} onAdd={handleAddToCart} />}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionTitle}>{title}</Text>
          )}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#55E6C1']} />}
        />
      ) : (
        <FlatList
          key={isGrid ? 'G' : 'L'}
          data={filteredData}
          numColumns={isGrid ? 2 : 1}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProductCard item={item} isGrid={isGrid} onAdd={handleAddToCart} />}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={{fontSize: 50}}>🍜</Text>
              <Text style={styles.emptyText}>Menu tidak ditemukan...</Text>
            </View>
          }
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#55E6C1']} />}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDFBF7' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    marginTop: 20, 
    paddingTop: 50, 
    paddingBottom: 20,
    alignItems: 'center' 
  },
  brandContainer: { flex: 1 },
  logo: { fontSize: 26, fontWeight: 'bold', color: '#2D3436' },
  subLogo: { fontSize: 12, color: '#A0A0A0', fontWeight: '600' },
  navIcons: { flexDirection: 'row', alignItems: 'center' },
  iconBtn: { backgroundColor: '#FFF', padding: 11, borderRadius: 14, marginLeft: 10, elevation: 4 },
  badge: { position: 'absolute', top: -5, right: -5, backgroundColor: '#FF7675', borderRadius: 10, width: 20, height: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FFF' },
  badgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#FFF', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, maxHeight: '80%' },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#2D3436', marginBottom: 20, textAlign: 'center' },
  cartItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, backgroundColor: '#F9F9F9', padding: 12, borderRadius: 15 },
  cartItemName: { fontSize: 16, fontWeight: 'bold', color: '#2D3436' },
  cartItemPrice: { fontSize: 14, color: '#55E6C1', fontWeight: 'bold', marginTop: 2 },
  emptyCart: { textAlign: 'center', color: '#A0A0A0', marginVertical: 30, fontSize: 16 },
  totalContainer: { borderTopWidth: 1, borderColor: '#EEE', paddingTop: 15, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { fontSize: 14, color: '#636E72' },
  totalAmount: { fontSize: 18, fontWeight: 'bold', color: '#2D3436' },
  closeBtn: { backgroundColor: '#55E6C1', padding: 15, borderRadius: 15, marginTop: 20, alignItems: 'center' },
  closeBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  sortContainer: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 12 },
  sortBtn: { backgroundColor: '#FFF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, marginRight: 8, elevation: 1 },
  sortActive: { backgroundColor: '#2D3436' },
  sortBtnText: { fontSize: 11, color: '#2D3436' },
  sortTextActive: { color: '#FFF' },
  chip: { backgroundColor: '#FFF', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 16, marginRight: 10, elevation: 2 },
  chipActive: { backgroundColor: '#55E6C1' },
  chipText: { color: '#2D3436', fontWeight: 'bold' },
  chipTextActive: { color: '#FFF' },
  sectionTitle: { padding: 15, fontSize: 17, fontWeight: 'bold', color: '#FF7675', backgroundColor: '#FDFBF7' },
  empty: { alignItems: 'center', marginTop: 60 },
  emptyText: { fontSize: 15, color: '#636E72', marginTop: 10 }
});

export default HomeScreen;