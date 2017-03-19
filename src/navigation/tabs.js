/**
 * Tabs Scenes
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React from 'react';
import { Scene, ActionConst } from 'react-native-router-flux';

// Consts and Libs
import { AppConfig } from '@constants/';
import { AppStyles, AppSizes } from '@theme/';

// Components
import { TabIcon } from '@ui/';
import { NavbarMenuButton } from '@containers/ui/NavbarMenuButton/NavbarMenuButtonContainer';

// Scenes
import Placeholder from '@components/general/Placeholder';
import Error from '@components/general/Error';
import ProductsView from '@containers/products/ProductsView';
import CheckoutView from '@containers/checkout/CheckoutView';

const navbarPropsTabs = {
  ...AppConfig.navbarProps,
  renderLeftButton: () => <NavbarMenuButton />,
  sceneStyle: {
    ...AppConfig.navbarProps.sceneStyle,
    paddingBottom: AppSizes.tabbarHeight,
  },
};

/* Routes ==================================================================== */
const scenes = (
    <Scene key={'tabBar'} tabs tabBarIconContainerStyle={AppStyles.tabbar} pressOpacity={0.95} type={ActionConst.RESET}>
        <Scene
            {...navbarPropsTabs}
            key={'products'}
            title={'Products'}
            icon={props => TabIcon({ ...props, icon: 'search' })}
        >
            <Scene
                {...navbarPropsTabs}
                key={'ProductsView'}
                component={ProductsView}
                title={AppConfig.appName}
                analyticsDesc={'Products: Browser Products'}
            />
        </Scene>

        <Scene
            key={'CheckoutView'}
            {...navbarPropsTabs}
            title={'Checkout'}
            component={CheckoutView}
            icon={props => TabIcon({ ...props, icon: 'shopping-cart' })}
            analyticsDesc={'CheckoutView'}
        />
    </Scene>
);

export default scenes;
