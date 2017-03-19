/**
 * Recipe Reducer
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */

import AppUtil from '@lib/util';

// Set initial state
export const initialState = {};

export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case 'CART_UPDATED': {
            return action.data;
        }
        default:
            return state;
    }
}
