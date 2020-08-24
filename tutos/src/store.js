import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import devToolsEnhancer from 'remote-redux-devtools';
import reducer from './tools/reducers'
import mainSaga from './tools/sagas'


export const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware()

    let composeEnhancers = compose
    if (process.env.NODE_ENV === 'development') {
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    }

    const store = composeEnhancers(
        applyMiddleware(sagaMiddleware),
    )(createStore)(reducer)

    sagaMiddleware.run(mainSaga)
    return store
}
