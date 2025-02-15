import React from 'react'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import {stagesInitialState, stagesReducer} from "./stagesReducer";

import config from '../../configs/config.json'
import {revisionsInitialState, revisionsReducer} from "@reducers/RevisionsReducer";


export const history = createBrowserHistory()

export default createStore(
    combineReducers({
        stages: stagesReducer,
        revisions: revisionsReducer,
        router: connectRouter(history)
    }),
    {
        stages: stagesInitialState,
        revisions: revisionsInitialState
    },
    compose(
      applyMiddleware(routerMiddleware(history)),
      // config.use_devtools && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)
