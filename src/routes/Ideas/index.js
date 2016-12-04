import { injectReducer } from 'store/reducers'
import { fetchIdeas } from './modules/ideas'

/* Sync route definition
export default (store) => ({
  path : 'ideas',
  indexRoute :  { component: AllIdeasView },
  childRoutes: [
    { path: 'create', component: CreateIdeaView }
  ]
})
*/

// Async route definition
export default (store) => ({
  path : 'ideas',
  getChildRoutes (partialNextState, callback) {
    require.ensure([], (require) => {
      // TODO: Better way to do this?
      const reducer = require('./modules/ideas').default
      injectReducer(store, { key: 'ideas', reducer })

      callback(null, [
        // Remove imports!
        require('./routes/Overview').default(store)
      ])
    })
  },

  getIndexRoute (partialNextState, callback) {
    require.ensure([], function (require) {
      /*  Add the reducer to the store on key 'ideas'  */
      const reducer = require('./modules/ideas').default
      injectReducer(store, { key: 'ideas', reducer })

      callback(null, {
        component: require('./containers/IdeasViewContainer').default
      })
    }, 'ideas')
  },

  onEnter (nextState, replace) {
    store.dispatch(fetchIdeas())
  }
})
