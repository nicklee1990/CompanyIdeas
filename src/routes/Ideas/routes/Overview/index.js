export default (store) => ({
  path : ':id',

  getIndexRoute (partialNextState, callback) {
    require.ensure([], function (require) {
      callback(null, {
        component: require('./containers/IdeaOverviewContainer').default
      })
    }, 'ideasOverview')
  }
})
