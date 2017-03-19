/**
 * Products Actions
 */

import AppAPI from '@lib/api';

/**
 * Get the products and dispatch the data to the store
 * @returns {Function}
 */
export function getProducts() {
    return (dispatch) => {
        return AppAPI.products.get()
            .then((products) => {
                dispatch({
                    type: 'PRODUCTS_REPLACE',
                    data: products,
                });
            });
    };
}