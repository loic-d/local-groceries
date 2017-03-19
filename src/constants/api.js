/**
 * API Config
 *
 */

const TENANT = 'dkom2017';
const CLIENT_ID = 'vf1PKjVXwCcpZQNYAhD6KYr54uUgLg9b';

export default {
  // YaaS API Proxy URL
  hostname: 'https://api.yaas.io',

  // YaaS Tenant
  tenant: TENANT,

  // YaaS Client ID
  clientID: CLIENT_ID,

  // YaaS Endpoints
  endpoints: new Map([
    ['login', `/hybris/customer/v1/${TENANT}/login`],
    ['user', `/hybris/customer/v1/${TENANT}/me`],
    ['anonymousLogin', `/hybris/customerlogin/v1/auth/anonymous/login?client_id=${CLIENT_ID}&hybris-tenant=${TENANT}`],
    ['products', `/hybris/productdetails/v2/${TENANT}/productdetails`],
    ['cart', `/hybris/cart/v1/${TENANT}/carts`],
    ['checkout', `/hybris/checkout/v1/${TENANT}/checkouts/order`],

    /*
      -- API Call Example (GET Products) --

      AppAPI.products.get()
        .then((response) => {
            const products = response;
        });

    */

    // TODO: Clean up
    ['me', '/wp-json/wp/v2/users/me'],
  ]),

  // Which 'endpoint' key deals with our tokens?
  tokenKey: 'login',
};
