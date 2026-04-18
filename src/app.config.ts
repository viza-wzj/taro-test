import h5Routes from './application/h5';
import weappRoutes from './application/weapp';

const platform = process.env.TARO_ENV || 'h5';
const routes = platform === 'weapp' ? weappRoutes : h5Routes;

export default defineAppConfig({
  pages: routes.pages,
  subPackages: routes.subPackages,
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
});
