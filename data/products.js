export const CATEGORIES = [
  { id: '1', name: 'Semua', emoji: '🍽️' },
  { id: '2', name: 'Menu Utama', emoji: '🍛' },
  { id: '3', name: 'Snacks', emoji: '🍟' },
  { id: '4', name: 'Minuman', emoji: '🥤' },
];

export const PRODUCTS = [
  { id: '1', name: 'Nasi Goreng Spesial', category: 'Menu Utama', price: 25000, rating: 4.9, image: '🍳' },
  { id: '2', name: 'Sate Ayam Madura', category: 'Menu Utama', price: 35000, rating: 4.8, image: '🍢' },
  { id: '3', name: 'Ayam Bakar Taliwang', category: 'Menu Utama', price: 45000, rating: 4.7, image: '🍗' },
  { id: '4', name: 'Bakso Mercon', category: 'Menu Utama', price: 20000, rating: 4.9, image: '🥣' },
  { id: '5', name: 'Kentang Goreng Keju', category: 'Snacks', price: 15000, rating: 4.5, image: '🍟' },
  { id: '6', name: 'Pisang Goreng Cokelat', category: 'Snacks', price: 12000, rating: 4.6, image: '🍌' },
  { id: '7', name: 'Cireng Bumbu Rujak', category: 'Snacks', price: 10000, rating: 4.4, image: '🍘' },
  { id: '8', name: 'Dimsum Ayam', category: 'Snacks', price: 18000, rating: 4.7, image: '🥟' },
  { id: '9', name: 'Es Teh Manis', category: 'Minuman', price: 5000, rating: 4.9, image: '🍹' },
  { id: '10', name: 'Jus Alpukat Kocok', category: 'Minuman', price: 15000, rating: 4.8, image: '🥑' },
  { id: '11', name: 'Kopi Susu Gula Aren', category: 'Minuman', price: 18000, rating: 4.7, image: '☕' },
  { id: '12', name: 'Thai Tea Ice', category: 'Minuman', price: 12000, rating: 4.6, image: '🥤' },
];

export const getSectionedData = (data) => {
  const sections = data.reduce((acc, item) => {
    const section = acc.find(s => s.title === item.category);
    if (section) section.data.push(item);
    else acc.push({ title: item.category, data: [item] });
    return acc;
  }, []);
  return sections.sort((a, b) => a.title.localeCompare(b.title));
};