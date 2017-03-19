# Local Groceries: connect farmers and restaurant owners

This application is a POC developed for a presentation I gave on [React Native](https://facebook.github.io/react-native/) and [Hybris as a Service - YaaS](https://yaas.io) at SAP d-kom (our annual internal developer conference). It allows restaurant owners to buy products from local farms.
The primary goal was to show how easy and quick it is to build native applications using React Native for the front-end and YaaS micro-services for the back-end. Some features need to be added (My Account, My Orders, Edit Cart, etc.), but the complete checkout flow is working.
[React Native Starter App](https://github.com/mcnamee/react-native-starter-app) was used to speed up the development.

## Installation
* Create a [YaaS account](https://www.yaas.io/register/) if you don't have one
* [Set-up a new project](https://devportal.yaas.io/gettingstarted/setupaproject/index.html) with a client and the following subscriptions: Product, Cart, Customer, Checkout, Site, Price, Order
* Add products in Builder
* Create a new user using the `/{tenant}/signup` endpoint of the Customer Service (using Postman for example)
* Add user details, a billing and shipping address using the `/{tenant}/me` and `/{tenant}/me/addresses` endpoints of the Customer service
* Clone the repo: `git clone git@github.com:loic-d/local-groceries.git`
* Install the dependencies: `npm install`
* Update `local-groceries/src/constants/api.js` with your `TENANT` and `CLIENT_ID`
* Build and start for iOS: `react-native run-ios`

## Features
* Authentication
* Browse products
* Add products to cart
* View my cart
* Checkout

## Screenshots
<img src="https://cloud.githubusercontent.com/assets/3925905/24083369/39495072-0cac-11e7-995d-6968d5f64d4c.png" alt="Landing Screen" width="300" />
<img src="https://cloud.githubusercontent.com/assets/3925905/24083371/3949739a-0cac-11e7-9514-2f93594c94a6.png" alt="Login Screen" width="300" />
<img src="https://cloud.githubusercontent.com/assets/3925905/24083372/394c25ea-0cac-11e7-9731-8a1afc7b33c0.png" alt="Browse Products Screen" width="300" />
<img src="https://cloud.githubusercontent.com/assets/3925905/24083370/39494488-0cac-11e7-9c29-8a17c43e9b4c.png" alt="Checkout Screen" width="300" />

## TODO
* Add features (My Account, My Orders, Edit Cart, etc.)
* Write components tests
* Code cleaning