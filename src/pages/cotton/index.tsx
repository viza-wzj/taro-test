import { View, Text } from '@tarojs/components';
import { useRequest } from 'ahooks';
import { getPageDetail } from '../../server';
import './index.css';

export default function Cotton() {
  const { data, loading, error } = useRequest(() =>
    getPageDetail('page_1776442988855_sbc1vi2'),
  );

  return (
    <View className="about-page">
      <Text className="about-title">cotton</Text>
      {loading && <Text>加载中...</Text>}
      {error && <Text>请求失败</Text>}
      {data && <Text>{JSON.stringify(data)}</Text>}
    </View>
  );
}
