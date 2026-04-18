import { useState } from 'react';
import { View, Text, Input, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Button } from '@nutui/nutui-react-taro';

interface UserInfo {
  avatar: string;
  nickname: string;
  phone: string;
}

export default function User() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(0);

  const isH5 = process.env.TARO_ENV === 'h5';

  // 模拟登录
  const handleLogin = (info: UserInfo) => {
    setUserInfo(info);
    Taro.showToast({ title: '登录成功', icon: 'success' });
  };

  // H5: 发送验证码
  const handleSendCode = () => {
    if (!phone || phone.length !== 11) {
      Taro.showToast({ title: '请输入正确的手机号', icon: 'none' });
      return;
    }
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    Taro.showToast({ title: '验证码已发送', icon: 'success' });
  };

  // H5: 验证码登录
  const handlePhoneLogin = () => {
    if (!phone || !code) {
      Taro.showToast({ title: '请填写完整信息', icon: 'none' });
      return;
    }
    handleLogin({
      avatar: '',
      nickname: 'H5用户',
      phone: phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
    });
  };

  // 小程序: 微信登录
  const handleWeappLogin = () => {
    // 实际项目中需调用 Taro.login + 后端接口
    handleLogin({
      avatar: '',
      nickname: '微信用户',
      phone: '',
    });
  };

  // 退出登录
  const handleLogout = () => {
    setUserInfo(null);
    setPhone('');
    setCode('');
    Taro.showToast({ title: '已退出登录', icon: 'none' });
  };

  // 已登录
  if (userInfo) {
    return (
      <View className="user-page">
        <View className="user-info">
          <View className="user-avatar">
            {userInfo.avatar ? (
              <Image src={userInfo.avatar} mode="aspectFill" />
            ) : (
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#ccc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ fontSize: 32, color: '#999' }}>?</Text>
              </View>
            )}
          </View>
          <Text className="user-nickname">{userInfo.nickname}</Text>
          {userInfo.phone && (
            <Text className="user-phone">{userInfo.phone}</Text>
          )}
          <Button className="logout-btn" type="default" onClick={handleLogout}>
            退出登录
          </Button>
        </View>
      </View>
    );
  }

  // 未登录
  return (
    <View className="user-page">
      <View className="login-card">
        <Text className="login-title">登录</Text>

        {isH5 ? (
          /* H5: 手机号 + 验证码登录 */
          <View className="login-form">
            <View className="input-row">
              <Input
                type="number"
                placeholder="请输入手机号"
                maxLength={11}
                value={phone}
                onInput={(e) => setPhone(e.detail.value)}
              />
            </View>
            <View className="code-row">
              <View className="input-row">
                <Input
                  type="number"
                  placeholder="验证码"
                  maxLength={6}
                  value={code}
                  onInput={(e) => setCode(e.detail.value)}
                />
              </View>
              <Button
                className="code-btn"
                size="small"
                type="primary"
                disabled={countdown > 0}
                onClick={handleSendCode}
              >
                {countdown > 0 ? `${countdown}s` : '获取验证码'}
              </Button>
            </View>
            <Button
              className="login-btn"
              type="primary"
              block
              onClick={handlePhoneLogin}
            >
              登录
            </Button>
          </View>
        ) : (
          /* 小程序: 微信授权登录 */
          <View style={{ width: '100%' }}>
            <Button
              className="wechat-login-btn"
              type="primary"
              block
              openType="getUserInfo"
              onGetUserInfo={handleWeappLogin}
            >
              微信一键登录
            </Button>
          </View>
        )}
      </View>
    </View>
  );
}
