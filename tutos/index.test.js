import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { AppRegistry } from 'react-native';

import App from './src/App'
import { name as appName } from './app.json'
import { configureStore } from './src/store'

import { Tester, TestHookStore } from 'cavy';
import LoginSpec from './specs/login';
import SignUpSpec from './specs/signup';

const testHookStore = new TestHookStore();
const store = configureStore()

class AppWrapper extends Component {
    render() {
        return (
            <Tester specs={[ LoginSpec ]} store={testHookStore}>
                <Provider store={ store }>
                    <App />
                </Provider>
            </Tester>
        );
    }
}

AppRegistry.registerComponent(appName, () => AppWrapper);
