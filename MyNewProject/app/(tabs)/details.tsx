import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, Share, Image, TouchableOpacity, ToastAndroid, Platform, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

interface ListItem {
  id: string;
  title: string;
}

export default function DetailsScreen() {
  const params = useLocalSearchParams<{ user?: string }>();
  const user = params.user || 'Гость';

  const staticData: ListItem[] = [
    { id: '1', title: 'Первый элемент' },
    { id: '2', title: 'Второй элемент' },
    { id: '3', title: 'Третий элемент' },
  ];

  const handleItemPress = (title: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(`Нажат: ${title}`, ToastAndroid.SHORT);
    } else {
      Alert.alert('Toast', `Нажат: ${title}`);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({ message: `Привет! Я вошел как ${user}!` });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Добро пожаловать, {user}!</Text>

      {/* Картинка из ресурсов папки assets */}
      <Image 
  source={require('../../assets/assets.png')} 
  style={styles.imageView} 
  resizeMode="contain"
/>


      <Text style={styles.subtitle}>Статичный список:</Text>
      <FlatList
        data={staticData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.listItem} onPress={() => handleItemPress(item.title)}>
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
      />

      <Button title="Поделиться" color="#25D366" onPress={handleShare} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  subtitle: { fontSize: 16, fontWeight: '600', marginTop: 10 },
  imageView: { width: '100%', height: 120, marginBottom: 15, backgroundColor: '#eee' },
  listItem: { padding: 15, backgroundColor: '#f9f9f9', borderBottomWidth: 1, borderBottomColor: '#eee' },
});
