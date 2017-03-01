/**
 * Authenticate Screen
 *  - Entry screen for all authentication
 *  - User can tap to login, forget password, signup...
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

// Consts and Libs
import { AppStyles, AppSizes } from '@theme/';

// Components
import { Spacer, Text, Button } from '@ui/';

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  background: {
    backgroundColor: 'transparent',
    height: AppSizes.screen.height,
    width: AppSizes.screen.width,
  },
  logo: {
    width: AppSizes.screen.width * 0.45,
    resizeMode: 'contain',
  },
  whiteText: {
    color: '#FFF',
  },
  appTitle: {
    color: '#FFF',
    textShadowOffset: {width: 2, height: 1},
    textShadowRadius: 2,
    textShadowColor: '#444',
    fontFamily: 'Avenir',
    fontWeight: '300',
    fontSize: 42
  }
});

/* Component ==================================================================== */
class Authenticate extends Component {
  static componentName = 'Authenticate';

  render = () => (
    <Image
      source={require('../../images/login.jpg')}
      style={[AppStyles.containerCentered, AppStyles.container, styles.background]}
    >

      <View style={[AppStyles.row, AppStyles.paddingHorizontal]}>
        <Text h1 style={[styles.appTitle]}>Local Groceries</Text>
      </View>

      <Image
        source={require('../../images/logo.png')}
        style={[styles.logo]}
      />

      <View style={[AppStyles.row, AppStyles.paddingHorizontal]}>
        <View style={[AppStyles.flex1]}>
          <Button
            title={'Login'}
            icon={{ name: 'lock' }}
            onPress={Actions.login}
          />
        </View>
      </View>

      <Spacer size={10} />

      <View style={[AppStyles.row, AppStyles.paddingHorizontal]}>
        <View style={[AppStyles.flex1]}>
          <Button
            title={'Request an account'}
            icon={{ name: 'face' }}
            onPress={Actions.signUp}
          />
        </View>
      </View>

      <Spacer size={40} />
    </Image>
  )
}

/* Export Component ==================================================================== */
export default Authenticate;
