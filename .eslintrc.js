export default {
  'extends': ['taro/react'],
  'rules': {
    'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
    'jsx-quotes': ['error', 'prefer-double'],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off'
  }
}
