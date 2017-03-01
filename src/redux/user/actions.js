/**
 * User Actions
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */

import jwtDecode from 'jwt-decode';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';

import AppAPI from '@lib/api';
import APIConfig from '@constants/';

/**
  * Login to API and receive Token
  */
export function login(credentials, freshLogin) {
    console.log('in login action', credentials, 'fresh login', freshLogin);
  return dispatch => new Promise(async (resolve, reject) => {
    const userCreds = credentials || null;

      // Build the request body for /login in the customer service
      let loginReqBody = {};
      if(userCreds) {
          const { username, password } = userCreds;
          loginReqBody = {
              email: username,
              password: password
          };
      }

    // Get a new token from API
    return AppAPI.login.post(null, loginReqBody)
      .then((token) => {
        console.log(`***** Token return by the login API ${token.accessToken} *****`);
        // TODO: Also set expiry date (24h from now)
        // Set the token in async storage
        return AsyncStorage.setItem('api/token', token.accessToken)
            .then(() => {
                // TODO: Fetch real user data
                // Persist customer ID, and send it when creating new cart
                const userData = {
                    id: "mydummyid",
                    name: "John Deer",
                };

                dispatch({
                    type: 'USER_REPLACE',
                    data: userData
                });

                return resolve(userData);
            });
      }).catch(err => reject(err));
  });
}

/**
  * Logout
  */
export function logout() {
  return dispatch => AppAPI.deleteToken()
    .then(() => {
        dispatch({
            type: 'USER_REPLACE',
            data: {},
        });
        Actions.authenticate({ type: 'reset' });
    });
}

/**
  * Get My User Data
  */
export function getMe() {
  return dispatch => AppAPI.me.get()
    .then((userData) => {
      dispatch({
        type: 'USER_REPLACE',
        data: userData,
      });

      return userData;
    });
}

/**
  * Update My User Data
  * - Receives complete user data in return
  */
export function updateMe(payload) {
  return dispatch => AppAPI.me.post(payload)
    .then((userData) => {
      dispatch({
        type: 'USER_REPLACE',
        data: userData,
      });

      return userData;
    });
}
