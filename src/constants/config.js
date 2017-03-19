/**
 * Global App Config
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
/* global __DEV__ */
import { AppColors, AppStyles, AppSizes } from '@theme/';

export default {
  // App Details
  appName: 'Local Groceries',

  // Build Configuration - eg. Debug or Release?
  DEV: __DEV__,

  // Google Analytics - uses a 'dev' account while we're testing
  gaTrackingId: (__DEV__) ? 'UA-84284256-2' : 'UA-84284256-1',

  // URLs
  // TODO: Implement reset password and sign up features
  urls: {
    resetPassword: 'http://dummy.url',
    signUp: 'http://dummy.url',
  },

  // Navbar Props
  navbarProps: {
    hideNavBar: false,
    titleStyle: AppStyles.navbarTitle,
    navigationBarStyle: AppStyles.navbar,
    leftButtonIconStyle: AppStyles.navbarButton,
    rightButtonIconStyle: AppStyles.navbarButton,
    sceneStyle: {
      backgroundColor: AppColors.background,
      paddingTop: AppSizes.navbarHeight,
    },
  },
};
