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
    return dispatch => new Promise(async (resolve, reject) => {
        const userCreds = credentials || null;
        // Build the request body for the customer service
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
                const accessToken = token.accessToken;
                console.log(`=== DEBUG: Token returned by the login API ${token.accessToken} ===========================`);
                // Set the user access token in async storage
                AsyncStorage.setItem('api/token', accessToken)
                    .then(function() {
                        // Get the current user information
                        return AppAPI.user.get()
                            .then((user) => {
                                dispatch({
                                    type: 'USER_REPLACE',
                                    data: user
                                });
                                return resolve(user);
                            });
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
