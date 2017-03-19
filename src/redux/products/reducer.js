/**
 * Recipe Reducer
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */

import AppUtil from '@lib/util';

// Set initial state
export const initialState = {
    products: []
};

export default function productReducer(state = initialState, action) {
    switch (action.type) {
        case 'PRODUCTS_REPLACE': {
            let products = [];

            // Pick out the items to keep
            if (action.data && typeof action.data === 'object') {
                products = action.data.map(item => ({
                    id: item.product.id,
                    yrn: item.product.yrn,
                    code: item.product.code,
                    name: item.product.name['en'],
                    description: item.product.description['en'],
                    image: item.product.media[0].url,
                    displayPrice: item.prices[0].effectiveAmount,
                    price: {
                        yrn: item.prices[0].yrn,
                        originalAmount: item.prices[0].originalAmount,
                        effectiveAmount: item.prices[0].effectiveAmount,
                        currency: item.prices[0].currency,
                        priceId: item.prices[0].priceId
                    },
                    currency: item.prices[0].currency,
                    unit: item.prices[0].measurementUnit ? `${item.prices[0].measurementUnit.quantity}${item.prices[0].measurementUnit.unitCode}` : ''
                }));
            }

            return {
                ...state,
                products,
            };
        }
        default:
            return state;
    }
}
