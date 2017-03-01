/**
 * Style Guide
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
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
import { SocialIcon } from 'react-native-elements';
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
// Array of Products from the store will be sent to the component
const mapStateToProps = state => ({
    products: state.products.products,
});

// Map getProducts action to the component
const mapDispatchToProps = {
    getProducts: ProductsActions.getProducts,
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
        products: PropTypes.arrayOf(PropTypes.object),
        getProducts: PropTypes.func.isRequired,
    }

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
            cartId: null
        };
    }

    componentDidMount() {
        // Fetch the list of products
        this.fetchProducts();

        // Check if we have a cartId in AsyncStorage
        CartActions.getCartId()
            .then((cartId) => {
                console.log('Cart ID from AsyncStorage ', cartId);
               if(!cartId) {
                   console.log('componentDidMount, no cartId in AsyncStorage');
                   // If we don't, create a new cart
                   AppAPI.createCart.post(null, {currency: 'CAD'})
                       .then((response) => {
                           console.log('****  In cart/actions.js - API call successful (POST Create cart)  ****', response);
                           // Set the cartId in AsyncStorage
                           AsyncStorage.setItem('cart/cartId', response.cartId);
                           // and in component state
                           this.setState( { cartId: response.cartId } );
                       })
                       .catch((error) => {
                           // TODO: Find why success goes in catch...
                           console.log('***** ERROR ', error)
                       });
               }
               else {
                   this.setState( { cartId: cartId } );
               }
            });
    }

    /**
     * On Change Tab
     */
    handleChangeTab = (index) => {
        this.setState({
            navigation: { ...this.state.navigation, index },
        });
    }

    fetchProducts = () => {
        this.props.getProducts()
            .then(() => {
                this.setState({
                    products: this.props.products
                });
            })
    }

    renderProducts = (products) => {
        // Function called onPress add to cart
        // Delegates to component method
        const addProductToCart = (productYrn) => {
            this.addProductToCart(productYrn);
        };

        const productsJsx = [];
        let iterator = 1;
        products.forEach((productObj) => {
            productsJsx.push(
                <View key={`product-${iterator}`} style={[AppStyles.row]}>
                    <Card
                        image={{ uri: productObj.image }}
                    >
                        <View style={[AppStyles.paddingLeftSml, AppStyles.paddingBottomSml]}>
                            <Text h3>{productObj.name} {productObj.unit.length > 0 ? `- ${productObj.unit}` : ''}</Text>
                            <Text style={[styles.price]}>
                                ${productObj.price} ({productObj.currency})
                            </Text>
                            <Text style={[styles.description]}>
                                {productObj.description}
                            </Text>
                            <Button
                                small
                                outlined
                                iconRight
                                title={'Add to cart'}
                                onPress={() => addProductToCart(productObj.yrn)}
                            />
                        </View>
                    </Card>
                </View>
            );
            iterator += 1;
        })

        return productsJsx;
    }

    addProductToCart(productYrn) {
        console.log(`****** ${productYrn} will be added to cart ${this.state.cartId} ******`);
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
//export default ProductsView;

export default connect(mapStateToProps, mapDispatchToProps)(ProductsView);
