import React from 'react'
import { Provider } from 'react-redux'
import { AppRegistry } from 'react-native'

import App from './src/App'
import { name as appName } from './app.json'
import { configureStore } from './src/store'

import {
    tokenReviewTime,
} from './src/settings';
import { TokenRefresh } from './src/components/TokenRefresh'


const store = configureStore()

const Root = () => (
    <Provider store={ store }>
        {/* <TokenRefresh reviewTime={ tokenReviewTime } /> */}
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => Root)
