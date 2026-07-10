import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

export default function LoginScreen() {
  const router = useRouter();
  const [infoText, setInfoText] = useState<string>('Исходный текст');
  const [inputText, setInputText] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [bgColor, setBgColor] = useState<string>('#ffffff');

  useEffect(() => {
    AsyncStorage.getItem('backgroundColor').then(color => color && setBgColor(color));
  }, []);

  const changeAndSaveColor = async (color: string) => {
    setBgColor(color);
    await AsyncStorage.setItem('backgroundColor', color);
  };

  const handleLogin = () => {
    if (password.length < 6) {
      Alert.alert('Ошибка', 'Пароль должен быть не менее 6 символов!');
      return;
    }
    Alert.alert('Подтверждение', `Вы уверены, что хотите войти как ${login}?`, [
  { text: 'Отмена', style: 'cancel' },
  { 
    text: 'ОК', 
    onPress: () => router.push({ pathname: '/details', params: { user: login } }) 
  }
]);

  };

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={styles.title}>{infoText}</Text>
      <Button title="Изменить текст" onPress={() => setInfoText('Текст успешно изменен!')} />

      <TextInput style={styles.input} placeholder="Введите текст..." value={inputText} onChangeText={setInputText} />
      <Text style={styles.previewText}>Вы ввели: {inputText}</Text>

      <View style={styles.loginForm}>
        <TextInput style={styles.input} placeholder="Логин" value={login} onChangeText={setLogin} />
        <TextInput style={styles.input} placeholder="Пароль" secureTextEntry value={password} onChangeText={setPassword} />
        <Button title="Войти" onPress={handleLogin} />
      </View>

      <Button title="Выбрать дату" onPress={() => setShowDatePicker(true)} />
      <Text style={{ textAlign: 'center', marginVertical: 5 }}>Дата: {date.toLocaleDateString()}</Text>
      {showDatePicker && (
        <DateTimePicker value={date} mode="date" display="default" onChange={onDateChange} />
      )}

      <View style={styles.row}>
        <Button title="Светлый" onPress={() => changeAndSaveColor('#ffffff')} />
        <Button title="Серый" onPress={() => changeAndSaveColor('#e0e0e0')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginTop: 10, backgroundColor: '#fff' },
  previewText: { fontStyle: 'italic', marginBottom: 10, color: '#555' },
  loginForm: { marginVertical: 15, padding: 15, borderWidth: 1, borderColor: '#ddd', borderRadius: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 },
});
