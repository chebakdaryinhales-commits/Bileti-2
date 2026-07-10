import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true, // Включаем верхний заголовок (ActionBar)
      }}>
      {/* Главная вкладка — экран логина */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Авторизация',
          tabBarLabel: 'Вход',
        }}
      />
      {/* Экран деталей скрываем из нижнего меню вкладок */}
      <Tabs.Screen
        name="details"
        options={{
          title: 'Второй экран',
          href: null, // Это свойство полностью скрывает вкладку с панели
        }}
      />
    </Tabs>
  );
}
