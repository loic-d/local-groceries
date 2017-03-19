/**
 * Checkout View
 */

import React, { Component, PropTypes } from 'react';
import {
    View,
    Alert,
    ListView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

import { TabViewAnimated, TabBarTop } from 'react-native-tab-view';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

// Redux product actions
import * as ProductsActions from '@redux/products/actions';

// Redux cart actions
import * as CartActions from '@redux/cart/actions';

// Consts and Libs
import AppAPI from '@lib/api';
import { AppColors, AppStyles } from '@theme/';

// Components
import {
    Alerts,
    Button,
    Card,
    Spacer,
    Text,
    List,
    ListItem,
    FormInput,
    FormLabel,
} from '@components/ui/';

/* Redux ==================================================================== */
// Cart, list of products and current user will be sent to the component
const mapStateToProps = state => ({
    cart: state.cart,
    products: state.products,
    user: state.user
});

// Map getProducts action to the component
const mapDispatchToProps = {
    checkoutCart: CartActions.checkoutCart
};

/* Styles ==================================================================== */
const styles = StyleSheet.create({
    title: {
        color: '#E89005',
        fontFamily: 'Avenir',
        fontSize: 25
    },
    price: {
        color: '#565656',
        fontSize: 15,
        marginBottom: 8
    },
    description: {
        fontSize: 13,
        marginBottom: 10
    }
});

/* Component ==================================================================== */
class CheckoutView extends Component {

    static componentName = 'CheckoutView';

    static propTypes = {
        cart: PropTypes.object,
        products: PropTypes.object,
        user: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
            cart: props.cart,
            products: []
        };
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProp) {
        this.setState({
            cart: nextProp.cart
        });
    }

    /**
     * Render the cart items cards
     * @returns {Array}
     */
    renderCartItemsList() {
        const cartItemsJsx = [];
        let iterator = 1;

        const productMap = new Map();
        const products = this.props.products.products;
        products.forEach((product) => {
             productMap.set(product.yrn, product);
        });

        const cartItems = this.state.cart.items;
        cartItems.forEach((item) => {
            const product = productMap.get(item.itemYrn);
            if(product) {
                cartItemsJsx.push(
                    <View key={`cart-item-${iterator}`} style={[AppStyles.row]}>
                        <Card>
                            <View>
                                <Text h3>{product.name} {product.unit.length > 0 ? `- ${product.unit}` : ''} (x{item.quantity})</Text>
                                <Text style={[styles.price]}>${product.displayPrice} ({product.currency}) each</Text>
                                <Text style={[styles.description]}>{product.description}</Text>
                            </View>
                        </Card>
                    </View>
                )
            }
            iterator += 1;
        });

        return cartItemsJsx;
    }

    /**
     * Checkout a cart
     * @param cartId
     * @param user
     */
    checkoutCart(cartId, user) {
        this.props.checkoutCart(cartId, user);
    }

    /**
     * Check if the cart contains items
     * @returns {boolean}
     */
    hasCartItems() {
        return this.state.cart.hasOwnProperty('items') && this.state.cart.items.length > 0;
    }

    /**
     * Render function
     */
    render() {
        const checkoutCart = (cartId, user) => {
          this.checkoutCart(cartId, user);
        };

        return(
            <View style={[AppStyles.container]}>
                <ScrollView>
                    <View style={[AppStyles.containerCentered, AppStyles.paddingTop]}>
                        <Text h1 style={[styles.title]}>Your Cart</Text>
                    </View>

                    <View>
                        { this.hasCartItems() ?
                            this.renderCartItemsList() :
                            <View>
                                <Spacer size={10} />
                                <Text style={[AppStyles.textCenterAligned, AppStyles.p]}>You don't have any items in your Cart.</Text>
                                <Spacer size={13} />
                                <View style={[AppStyles.paddingHorizontal]}>
                                    <Button
                                        medium
                                        outlined
                                        title={'Continue Shopping'}
                                        // TODO: Find a way to go back to the ProductListing component
                                        onPress={ () => { Actions.home({ type: 'reset' }) }}
                                    />
                                </View>
                            </View>
                        }
                    </View>

                    <Spacer size={10} />

                    {
                        this.hasCartItems() ?
                        <View>
                            <Text h3 style={[AppStyles.textCenterAligned]}>Total: ${this.state.cart.totalPrice.amount} ({this.state.cart.totalPrice.currency})</Text>
                            <Text style={[AppStyles.textCenterAligned, AppStyles.subtext]}>(All taxes and shipping fees included)</Text>
                            <Spacer size={20} />
                            <View style={[AppStyles.paddingHorizontal]}>
                                <Button
                                    large
                                    outlined
                                    title={'Buy'}
                                    onPress={() => checkoutCart(this.props.cart, this.props.user) }
                                />
                            </View>
                            <Spacer size={20} />
                        </View>
                    :
                        <Text></Text>
                    }

                </ScrollView>
            </View>
        )
    }

}

/* Export Component ==================================================================== */
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutView);

