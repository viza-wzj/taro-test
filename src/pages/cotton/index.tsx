import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
import './index.css';

export default function Cotton() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    Taro.request({
      url: '/api/pages/page_1776442988855_sbc1vi2',
      method: 'GET',
    }).then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <View className="about-page">
      <Text className="about-title">cotton</Text>
      {data && <Text>{JSON.stringify(data)}</Text>}
    </View>
  );
}
