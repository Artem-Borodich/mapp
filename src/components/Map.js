import React, { useState, useEffect } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

const MapComponent = () => {
  const [userLocation, setUserLocation] = useState(null); // Состояние для хранения геопозиции
  const [isLocationLoaded, setIsLocationLoaded] = useState(false); // Флаг для проверки загрузки геопозиции

  useEffect(() => {
    // Запрашиваем геолокацию только один раз при монтировании компонента
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          setIsLocationLoaded(true); // Устанавливаем флаг, что геолокация получена
        },
        (error) => {
          console.error('Ошибка получения геолокации:', error);
        }
      );
    }
  }, []); // Пустой массив зависимостей гарантирует, что запрос геолокации будет только один раз

  // Если геолокация еще не получена, показываем текст загрузки
  if (!isLocationLoaded) {
    return <div>Загрузка карты...</div>;
  }

  return (
    <YMaps query={{ apikey: 'a278b858-a869-49d7-b1dd-365c6befa654' }}>
      <Map
        defaultState={{
          center: [userLocation.latitude, userLocation.longitude],
          zoom: 12,
        }}
        width="100%"
        height="400px"
      >
        {/* Мета отображается только если есть геопозиция */}
        {userLocation && (
          <Placemark
            geometry={[userLocation.latitude, userLocation.longitude]}
            properties={{
              balloonContent: "Ваше местоположение",
            }}
          />
        )}
      </Map>
    </YMaps>
  );
};

export default MapComponent;