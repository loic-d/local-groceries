/**
 * Cart Actions
 */

import { AsyncStorage, Alert } from 'react-native';
import AppAPI from '@lib/api';

/**
 * Creates a new Cart
 * @returns {Function}
 */
export function createCart(userId) {
    return () => {
        // Create a Canadian cart by default
        return AppAPI.cart.post(null, {
            currency: 'CAD',
            customerId: userId
        });
    };
}

/**
 * Get the customer cart
 * @param customerId
 * @returns {Function}
 */
export function getCustomerCart(customerId) {
    // No need to dispatch anything here...
    return () => {
        return AppAPI.cart.get(`?customerId=${customerId}`);
    }
}

/**
 * Get a cart by ID
 * @param cartId
 * @returns {Function}
 */
export function getCartById(cartId) {
    return (dispatch) => {
        return AppAPI.cart.get(cartId)
            .then((cart) => {
                // Update the store
                dispatch({
                    type: 'CART_UPDATED',
                    data: cart
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
}

/**
 * Add an item to a cart
 * @param cartId
 * @param itemYrn
 * @param itemPrice
 * @returns {Function}
 */
export function addItemToCart(cartId, itemYrn, itemPrice) {
    return (dispatch) => {

        // Build the cart item body
        // TODO: Allow user to add more than one item at the time
        const cartItemBody = {
            quantity: 1,
            price: itemPrice,
            itemYrn: itemYrn
        };

        return AppAPI.cart.post(`${cartId}/items`, cartItemBody)
            .then(() => {

                Alert.alert('Item added to Cart', 'Go to Checkout to place your order.');

                // Get the updated cart and dispatch
                AppAPI.cart.get(cartId)
                    .then((cart) => {
                        dispatch({
                            type: 'CART_UPDATED',
                            data: cart
                        });
                    })
                    .catch((error) => {
                        console.log(`getCart ${cartId} failed`, error);
                    });

            })
            .catch((error) => {
                console.log(`addItemToCart ${cartId} ${itemYrn} failed`, error);
            });
    };
}

/**
 * Checkout a cart
 * @param cartId
 * @param user
 * @returns {Function}
 */
export function checkoutCart(cart, user) {
    return (dispatch) => {

        // Get the customer's default address (required to place an order)
        return AppAPI.user.get('addresses')
            .then((addresses) => {
                // Build the order body
                // TODO: Allow user to select a payment method (INVOICE by default)
                const orderBody = {
                    paymentMethods: [{
                        provider: 'stripe',
                        paymentMethodYrn: 'urn:yaas:hybris:payments:payment-method:checkoutat;invoice',
                        method: 'invoice'
                    }],
                    cartId: cart.id,
                    currency: 'CAD',
                    addresses: [
                        {
                            ...addresses[0],
                            type: 'BILLING'
                        },
                        {
                            ...addresses[0],
                            type: 'SHIPPING'
                        }
                    ],
                    customer: {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.contactEmail
                    },
                    totalPrice: cart.totalPrice.amount,
                };

                // Create the order
                return AppAPI.checkout.post(null, orderBody)
                    .then((response) => {

                        Alert.alert('Thank you for your order!', 'You will receive your products tomorrow morning. Your invoice will be available at the end of the current week.');

                        dispatch({
                            type: 'CART_UPDATED',
                            data: {}
                        });

                        console.log('ORDER SUCCESS ', response);
                    })
                    .catch((error) => {
                        console.log('ORDER FAIL', error);
                    });

            })
            .catch((error) => {
               console.log(error);
            });
    };
}