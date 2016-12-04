import { injectReducer } from 'store/reducers'
import { fetchComments } from './modules/comments'

export default (store) => ({
  path : ':id',

  getIndexRoute (partialNextState, callback) {
    require.ensure([], function (require) {
      const reducer = require('./modules/comments').default
      injectReducer(store, { key: 'comments', reducer })

      callback(null, {
        component: require('./containers/IdeaOverviewContainer').default
      })
    }, 'ideasOverview')
  },

  onEnter (nextState) {
    store.dispatch(fetchComments(nextState.params.id))
  }
})
