import React, { useState } from 'react';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import {
  isEmail,
  scrollToTop,
  navigateTo,
  drawPoster,
  imageToBase64,
} from '@i17hush/h5-utils';
import {
  Button,
  ConfigProvider,
  TextArea,
  Dialog,
} from '@nutui/nutui-react-taro';
import enUS from '@nutui/nutui-react-taro/dist/locales/en-US';
import zhCN from '@nutui/nutui-react-taro/dist/locales/zh-CN';
import './index.css';

function Index() {
  const [locale, setLocale] = useState(zhCN);
  const localeKey = locale === zhCN ? 'zhCN' : 'enUS';
  const [visible, setVisible] = useState(false);
  const [translated] = useState({
    zhCN: {
      welcome: '欢迎使用 NutUI React 开发 Taro 多端项目。',
      button: '使用英文',
      open: '点击打开',
    },
    enUS: {
      welcome:
        'Welcome to use NutUI React to develop Taro multi-terminal projects.',
      button: 'Use Chinese',
      open: 'Click Me',
    },
  });
  const handleSwitchLocale = () => {
    setLocale(locale === zhCN ? enUS : zhCN);
  };

  const handleDrawPoster = async () => {
    const avatar = await imageToBase64(
      'https://i1.hdslb.com/bfs/face/4e62c398447be3b12421fbb9704267151057e9ac.jpg@120w_120h_1c.avif',
    );
    const bg = await imageToBase64(
      'https://i1.hdslb.com/bfs/face/4e62c398447be3b12421fbb9704267151057e9ac.jpg@120w_120h_1c.avif',
    );
    const imageUrl = await drawPoster({
      width: 750,
      height: 1000,
      backgroundColor: '#ffffff',
      backgroundImage: bg,
      elements: [
        // 渐变背景矩形
        {
          type: 'image',
          x: 300,
          y: 50,
          width: 150,
          height: 150,
          src: avatar,
          circle: true,
        },
        {
          type: 'rect',
          x: 0,
          y: 0,
          width: 750,
          height: 300,
          gradient: {
            type: 'linear',
            colors: ['#667eea', '#764ba2'],
            direction: [0, 0, 750, 300],
          },
        },
        // 圆形头像
        {
          type: 'image',
          x: 300,
          y: 50,
          width: 150,
          height: 150,
          src: 'https://example.com/avatar.png',
          circle: true,
          borderWidth: 3,
          borderColor: '#fff',
        },
        // 带阴影的圆角矩形卡片
        {
          type: 'rect',
          x: 40,
          y: 350,
          width: 670,
          height: 200,
          backgroundColor: '#fff',
          borderRadius: 16,
          shadow: { color: 'rgba(0,0,0,0.1)', blur: 20, offsetY: 4 },
        },
        // 多行文字
        {
          type: 'text',
          x: 60,
          y: 380,
          text: '这是一段很长的描述文字...',
          fontSize: 28,
          color: '#333',
          maxWidth: 630,
          maxLines: 3,
          lineHeight: 40,
        },
        // 线条
        {
          type: 'line',
          x1: 60,
          y1: 600,
          x2: 690,
          y2: 600,
          color: '#eee',
          width: 1,
        },
        // 圆形装饰
        {
          type: 'circle',
          x: 375,
          y: 900,
          radius: 40,
          backgroundColor: '#667eea',
        },
      ],
    });
    console.log(imageUrl, 'imageUrl');
  };
  return (
    <ConfigProvider locale={locale}>
      <View className="nutui-react-demo">
        <View>{translated[localeKey].welcome}</View>
        <View
          className="w-[150px] h-[50px] bg-[#6cf]"
          onClick={handleDrawPoster}
        >
          drawPoster
        </View>
        <View
          style={{
            height: '200vh',
            width: '100%',
            backgroundColor: '#6cf',
          }}
        ></View>
        <View
          style={{
            height: '200vh',
            width: '100%',
            backgroundColor: '#6cf',
          }}
        ></View>
        <View>
          <Button
            type="info"
            onClick={() => Taro.navigateTo({ url: '/pages/user/index' })}
          >
            用户信息
          </Button>
          <Button type="primary" onClick={handleSwitchLocale}>
            {translated[localeKey].button}
          </Button>
          <Button type="success" onClick={() => setVisible(true)}>
            {translated[localeKey].open}
          </Button>
          <Dialog
            visible={visible}
            onConfirm={() => setVisible(false)}
            onCancel={() => setVisible(false)}
          >
            {translated[localeKey].welcome}
          </Dialog>
          <TextArea disabled showCount maxLength={20} />
          <View
            style={{
              width: '50px',
              height: '100px',
              backgroundColor: 'red',
            }}
            onClick={() => {
              // scrollToTop();
              navigateTo('/pages/user/index', {
                params: { id: 123, name: 'test' },
              });
            }}
          >
            top
          </View>
          <View
            className="w-[100px] h-[100px] bg-[#6cf]"
            onClick={() => {
              scrollToTop();
              // navigateTo("/pages/settings/index", {
              //   params: { id: 123, name: "test" },
              // });
            }}
          >
            H5
          </View>
        </View>
      </View>
    </ConfigProvider>
  );
}

export default Index;
