/**
 * Recipe Reducer
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */

import AppUtil from '@lib/util';

// Set initial state
export const initialState = {
    cartItems: [],
};

export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_CART_ITEM': {
            let cartItems = [];

            // TODO: Implement

            console.log('**** Cart  reducer will return ****', cartItems);

            return {
                ...state,
                cartItems,
            };
        }
        default:
            return state;
    }
}
