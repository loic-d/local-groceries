/**
 * Products View
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
// Products, current cart ID and customer ID will be passed from the store to the component
const mapStateToProps = state => ({
    products: state.products.products,
    cartId: state.cart.id,
    customerId: state.user.id
});

// Map getProducts action to the component
const mapDispatchToProps = {
    getProducts: ProductsActions.getProducts,
    addItemToCart: CartActions.addItemToCart,
    getCartById: CartActions.getCartById,
    getCustomerCart: CartActions.getCustomerCart,
    createCart: CartActions.createCart
};

/* Styles ==================================================================== */
const styles = StyleSheet.create({
    // Tab Styles
    tabContainer: {
        flex: 1,
    },
    tabbar: {
        backgroundColor: AppColors.brand.primary,
    },
    tabbarIndicator: {
        backgroundColor: '#FFF',
    },
    tabbar_text: {
        color: '#FFF',
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
class ProductsView extends Component {
    static componentName = 'ProductsView';

    static propTypes = {
        // Data
        products: PropTypes.arrayOf(PropTypes.object),
        cartId: PropTypes.string,
        customerId: PropTypes.string,

        // Functions
        getProducts: PropTypes.func.isRequired,
        addItemToCart: PropTypes.func.isRequired,
        getCartById: PropTypes.func.isRequired,
        getCustomerCart: PropTypes.func.isRequired,
        createCart: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            navigation: {
                index: 0,
                routes: [
                    { key: '0', title: 'All' },
                    { key: '1', title: 'Vegetables' },
                    { key: '2', title: 'Fruits' },
                    { key: '3', title: 'Other' },
                ],
            },
            products: [],
            cartId: this.props.cartId
        };
    }

    componentDidMount() {
        // Fetch the list of products
        this.fetchProducts();

        // Get the customer cart or create a new one
        this.getOrCreateCart();
    }

    componentWillReceiveProps(nextProp) {
        this.setState({
            cartId: nextProp.cartId
        });
    }

    /**
     * Fetch all products and update the state of the component
     */
    fetchProducts = () => {
        this.props.getProducts()
            .then(() => {
                this.setState({
                    products: this.props.products
                });
            })
    }

    /**
     * Creates a new cart if the customer does not have a current cart
     */
    getOrCreateCart() {
        if(!this.state.cartId) {
            this.props.getCustomerCart(this.props.customerId)
                .then((cart) => {
                    const cartId = cart.id;
                    // The customer already had a current cart. Retrive the cart cart content.
                    this.props.getCartById(cartId);
                })
                .catch(() => {
                    // The customer did not have a current cart. Create a new one
                    this.props.createCart(this.props.customerId)
                        .then((cart) => {
                            // Set the cartId in the current state
                            this.setState({
                                cartId: cart.cartId
                            });
                        })
                        .catch(() => {
                            console.log('Error when creating cart', error);
                        });
                });
        }
    }

    /**
     * On Change Tab
     */
    handleChangeTab = (index) => {
        this.setState({
            navigation: { ...this.state.navigation, index },
        });
    }

    /**
     * Render the list of product cards
     * @param products
     * @returns {Array}
     */
    renderProducts = (products) => {
        // Function called onPress add to cart button
        // Delegates to component method
        const addItemToCart = (product) => {
            this.addItemToCart(product);
        };

        // This array will each product component
        const productsJsx = [];
        let iterator = 1;

        products.forEach((product) => {
            productsJsx.push(
                <View key={`product-${iterator}`} style={[AppStyles.row]}>
                    <Card
                        image={{ uri: product.image }}
                    >
                        <View style={[AppStyles.paddingLeftSml, AppStyles.paddingBottomSml]}>
                            <Text h3>{product.name} {product.unit.length > 0 ? `- ${product.unit}` : ''}</Text>
                            <Text style={[styles.price]}>
                                ${product.displayPrice} ({product.currency})
                            </Text>
                            <Text style={[styles.description]}>
                                {product.description}
                            </Text>
                            <Button
                                small
                                outlined
                                title={'Add to cart'}
                                onPress={() => addItemToCart(product)}
                            />
                        </View>
                    </Card>
                </View>
            );
            iterator += 1;
        });

        return productsJsx;
    }

    /**
     * Add a product to cart
     * @param product
     */
    addItemToCart(product) {
        // Make sure we have a cartId in the current component state
        if(this.state.cartId) {
            console.log('Found cartId', this.state.cartId);
            this.props.addItemToCart(this.state.cartId, product.yrn, product.price);
        }
        else {
            this.props.createCart(this.props.customerId)
                .then((cart) => {
                    // Set the cartId in the current state
                    this.setState({
                        cartId: cart.cartId
                    });
                    this.props.addItemToCart(this.state.cartId, product.yrn, product.price);
                })
                .catch(() => {
                    console.log('Error when creating cart', error);
                });
        }
    }

    /**
     * Which component to show
     */
    renderScene = ({ route }) => {
        switch (route.key) {
            case '0' :
                const { products } = this.state;

                return (
                    <View style={styles.tabContainer}>
                        <ScrollView
                            automaticallyAdjustContentInsets={false}
                            style={[AppStyles.container]}
                        >
                        { this.renderProducts(products) }
                        </ScrollView>
                    </View>
                );
            case '1' :
                return (
                    <View style={styles.tabContainer}>
                        <ScrollView
                            automaticallyAdjustContentInsets={false}
                            style={[AppStyles.container]}
                        >

                        </ScrollView>
                    </View>
                );
            case '2' :
                return (
                    <View style={styles.tabContainer}>
                        <ScrollView
                            automaticallyAdjustContentInsets={false}
                            style={[AppStyles.container]}
                        >

                        </ScrollView>
                    </View>
                );
            case '3' :
                return (
                    <View style={styles.tabContainer}>
                        <ScrollView
                            automaticallyAdjustContentInsets={false}
                            style={[AppStyles.container]}
                        >

                        </ScrollView>
                    </View>
                );
            case '4' :
                return (
                    <View style={styles.tabContainer}>
                        <ScrollView
                            automaticallyAdjustContentInsets={false}
                            style={[AppStyles.container]}
                        >

                        </ScrollView>
                    </View>
                );
            default :
                return (
                    <View />
                );
        }
    }

    /**
     * Header Component
     */
    renderHeader = props => (
        <TabBarTop
            {...props}
            style={styles.tabbar}
            indicatorStyle={styles.tabbarIndicator}
            renderLabel={scene => (
                <Text style={[styles.tabbar_text]}>{scene.route.title}</Text>
            )}
        />
    )

    render = () => (
        <TabViewAnimated
            style={[styles.tabContainer]}
            renderScene={this.renderScene}
            renderHeader={this.renderHeader}
            navigationState={this.state.navigation}
            onRequestChangeTab={this.handleChangeTab}
        />
    )
}

/* Export Component ==================================================================== */
export default connect(mapStateToProps, mapDispatchToProps)(ProductsView);
