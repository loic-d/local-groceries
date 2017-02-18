/**
 * Style Guide
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component } from 'react';
import {
    View,
    Alert,
    ListView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { TabViewAnimated, TabBarTop } from 'react-native-tab-view';
import { SocialIcon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

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

// Example Data
const dummyData1 = [
    { title: 'Settings', icon: 'build' },
    { title: 'Alarms', icon: 'alarm' },
    { title: 'Cards', icon: 'card-membership' },
    { title: 'Favourites', icon: 'grade' },
    { title: 'Help', icon: 'help' },
];

const dummyData2 = [
    {
        title: 'Jim Collins',
        role: 'Vice President',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/arashmil/128.jpg',
    },
    {
        title: 'Sarah Franklin',
        role: 'Vice Chairman',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg',
    },
    {
        title: 'James Fringe',
        role: 'CEO',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/sindresorhus/128.jpg',
    },
    {
        title: 'Janice Overton',
        role: 'Lead Developer',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/jina/128.jpg',
    },
    {
        title: 'Lisa Smith',
        role: 'CTO',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/vista/128.jpg',
    },
];

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
});

/* Component ==================================================================== */
class ProductsListView extends Component {
    static componentName = 'ProductsListView';

    constructor(props) {
        super(props);

        // Setup ListViews
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const ds2 = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

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
            dataSource: ds.cloneWithRows(dummyData1),
            dataSource2: ds2.cloneWithRows(dummyData2),
            products: []
        };
    }

    componentDidMount() {
        this.fetchProducts();
    }

    /**
     * On Change Tab
     */
    handleChangeTab = (index) => {
        this.setState({
            navigation: { ...this.state.navigation, index },
        });
    }

    fetchProducts = (category) => {
        //TODO: Move this to an action with reducer. The component received the function as property
        return AppAPI.products.get()
            .then((res) => {
                console.log('response from API PRODUCT CALL ----> ', res);
                this.setState({
                    products: res
                });
            })
    }

    renderProducts = (products) => {
        const productsJsx = [];
        let iterator = 1;
        products.forEach((productObj) => {
            productsJsx.push(
                <View key={`product-${iterator}`} style={[AppStyles.row]}>
                    <Card
                        image={{ uri: productObj.product.media[0].url }}
                    >
                        <View style={[AppStyles.paddingLeftSml, AppStyles.paddingBottomSml]}>
                            <Text h3>{productObj.product.name.en}</Text>
                            <Text>
                                {productObj.prices[0].effectiveAmount}
                                {productObj.prices[0].currency}
                            </Text>
                            <Text>
                                {this.productHasMeasurementUnit(productObj) ? `${productObj.prices[0].measurementUnit.quantity} ${productObj.prices[0].measurementUnit.unitCode}`: ''}
                            </Text>
                            <Text>
                                {productObj.product.description.en}
                            </Text>
                        </View>
                    </Card>
                </View>
            );
            iterator += 1;
        })

        console.log('Will return productsJsx', productsJsx);

        return productsJsx;
    }

    productHasMeasurementUnit(product) {
        if(product.prices && Array.isArray(product.prices) && product.prices[0].hasOwnProperty('measurementUnit')) {
            return true;
        }
        return false;
    }

    /**
     * Each List Item
     */
    renderRow = (data, sectionID) => (
        <ListItem
            key={`list-row-${sectionID}`}
            onPress={Actions.comingSoon}
            title={data.title}
            subtitle={data.role || null}
            leftIcon={data.icon ? { name: data.icon } : null}
            avatar={data.avatar ? { uri: data.avatar } : null}
            roundAvatar={!!data.avatar}
        />
    )

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
export default ProductsListView;
