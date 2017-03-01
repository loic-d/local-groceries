/**
 * Cart Actions
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */

import { AsyncStorage } from 'react-native';
import AppAPI from '@lib/api';

export function getCartId() {
    console.log('in actions getCartId');
    return AsyncStorage.getItem('cart/cartId');
}

export function createCart() {
    return new Promise((resolve, reject) => {
        // Create a canadian cart by default
        return AppAPI.createCart.post(null, {currency: 'CAD'})
            .then((res) => {
                console.log('****  In cart/actions.js - API call successful (POST Create cart)  ****', res);
                AsyncStorage.setItem('cart/cartId', res.cartId);
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            })
    });
}