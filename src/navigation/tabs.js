/**
 * Tabs Scenes
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React from 'react';
import { Scene } from 'react-native-router-flux';

// Consts and Libs
import { AppConfig } from '@constants/';
import { AppStyles, AppSizes } from '@theme/';

// Components
import { TabIcon } from '@ui/';
import { NavbarMenuButton } from '@containers/ui/NavbarMenuButton/NavbarMenuButtonContainer';

// Scenes
import Placeholder from '@components/general/Placeholder';
import Error from '@components/general/Error';
import StyleGuide from '@containers/StyleGuideView';
import Recipes from '@containers/recipes/Browse/BrowseContainer';
import RecipeView from '@containers/recipes/RecipeView';
import ProductsListView from '@containers/products/ProductsListView';

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
    <Scene key={'tabBar'} tabs tabBarIconContainerStyle={AppStyles.tabbar} pressOpacity={0.95}>
        <Scene
            {...navbarPropsTabs}
            key={'products'}
            title={'Products'}
            icon={props => TabIcon({ ...props, icon: 'search' })}
        >
            <Scene
                {...navbarPropsTabs}
                key={'productsListing'}
                component={ProductsListView}
                title={AppConfig.appName}
                analyticsDesc={'Products: Browser Products'}
            />
        </Scene>

        <Scene
            key={'styleGuide'}
            {...navbarPropsTabs}
            title={'Style Guide'}
            component={StyleGuide}
            icon={props => TabIcon({ ...props, icon: 'speaker-notes' })}
            analyticsDesc={'StyleGuide: Style Guide'}
        />
    </Scene>
);

export default scenes;
