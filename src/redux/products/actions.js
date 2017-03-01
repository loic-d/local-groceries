/**
 * Products Actions
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */

import AppAPI from '@lib/api';

export function getProducts() {
    return (dispatch) => {
        return AppAPI.products.get()
            .then((res) => {
                console.log('****  In products/actions.js - API call successful (GET Products)  ****', res);
                dispatch({
                    type: 'PRODUCTS_REPLACE',
                    data: res,
                });
            });
    };
}
