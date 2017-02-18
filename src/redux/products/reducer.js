/**
 * Recipe Reducer
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */

import AppUtil from '@lib/util';

// Set initial state
export const initialState = {
    meals: [],
};

export default function productReducer(state = initialState, action) {
    switch (action.type) {
        case 'PRODUCTS_REPLACE': {
            let products = [];

            // Pick out the items to keep
            if (action.data && typeof action.data === 'object') {
                products = action.data.map(item => ({
                    id: item.id,
                    code: AppUtil.htmlEntitiesDecode(item.code),
                    name: AppUtil.htmlEntitiesDecode(item.name),
                    description: AppUtil.htmlEntitiesDecode(item.description),
                    image: item.media[0]
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
