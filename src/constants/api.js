/**
 * API Config
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */

const TENANT = 'dkom2017';
const CLIENT_ID = 'vf1PKjVXwCcpZQNYAhD6KYr54uUgLg9b';

export default {
  // The URL we're connecting to
  hostname: 'https://api.yaas.io',

  // The tenant to use
  tenant: TENANT,

  // The Client ID of the application
  clientID: CLIENT_ID,

  endpoints: new Map([
    ['login', `/hybris/customer/v1/${TENANT}/login`],
    ['anonymousLogin', `/hybris/customerlogin/v1/auth/anonymous/login?client_id=${CLIENT_ID}&hybris-tenant=${TENANT}`],
    ['products', `/hybris/productdetails/v2/${TENANT}/productdetails`],

    //TODO: Clean up
    ['users', '/wp-json/wp/v2/users'],
    ['me', '/wp-json/wp/v2/users/me'],
    ['recipes', `/hybris/product/v2/${TENANT}/products`],
    ['meals', `/hybris/product/v2/${TENANT}/products`],
  ]),

  // Which 'endpoint' key deals with our tokens?
  tokenKey: 'login',
};
