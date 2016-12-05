const API = require('utils/API').default
import { SubmissionError } from 'redux-form'
import { showNotification } from 'store/notifications'

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_ALL_IDEAS_REQUEST = 'LOAD_ALL_IDEAS_REQUEST'
export const LOAD_ALL_IDEAS_SUCCESS = 'LOAD_ALL_IDEAS_SUCCESS'
export const LOAD_ALL_IDEAS_ERROR = 'LOAD_ALL_IDEAS_ERROR'
export const CREATE_IDEA_REQUEST = 'CREATE_IDEA_REQUEST'
export const CREATE_IDEA_SUCCESS = 'CREATE_IDEA_SUCCESS'
export const CREATE_IDEA_ERROR = 'CREATE_IDEA_ERROR'
export const SHOW_ADD_IDEAS = 'SHOW_ADD_IDEAS'
export const CLOSE_ADD_IDEAS = 'CLOSE_ADD_IDEAS'
export const SORT_IDEAS = 'SORT_IDEAS'
export const ADD_VOTE_SUCCESS = 'ADD_VOTE_SUCCESS'
export const ADD_VOTE_FAIL = 'ADD_VOTE_FAIL'

// ------------------------------------
// Actions
// ------------------------------------
export const fetchIdeas = () => {
  return (dispatch, getState) => {
    dispatch(loadAllIdeasRequest())
    return API.get('/api/ideas')
      .then((data) => {
        dispatch(loadIdeasSuccess(data.data))
      }, (err) => {
        dispatch(loadIdeasError(err))
      })
  }
}

export const createIdea = (values) => {
  return (dispatch, getState) => {
    dispatch(createIdeaRequest())
    return API.post('/api/ideas', values)
      .then((data) => {
        dispatch(createIdeaSuccess(data))
        dispatch(closeAddIdeaForm())
        dispatch(showNotification('Success! Your idea was submitted'))
      }, (err) => {
        dispatch(createIdeaError(err))
        throw new SubmissionError(err)
      })
  }
}

export const addVote = (id) => {
  return (dispatch, getState) => {
    return API.post(`/api/ideas/${id}/vote`)
      .then((data) => {
        dispatch(addVoteSuccess(id))
      }, (err) => {
        dispatch(addVoteError(err))
      })
  }
}

export function loadAllIdeasRequest () {
  return {
    type    : LOAD_ALL_IDEAS_REQUEST
  }
}

export function loadIdeasSuccess (ideas) {
  return {
    type    : LOAD_ALL_IDEAS_SUCCESS,
    ideas
  }
}

export function loadIdeasError () {
  return {
    type    : LOAD_ALL_IDEAS_ERROR
  }
}

export function createIdeaRequest (idea) {
  return {
    type    : CREATE_IDEA_REQUEST,
    idea
  }
}

export function createIdeaSuccess (idea) {
  return {
    type    : CREATE_IDEA_SUCCESS,
    idea
  }
}

export function createIdeaError (errors) {
  return {
    type    : CREATE_IDEA_ERROR,
    errors
  }
}

export function closeAddIdeaForm () {
  return {
    type    : CLOSE_ADD_IDEAS
  }
}

export function showAddIdeaForm () {
  return {
    type    : SHOW_ADD_IDEAS
  }
}

export function sortIdeas (sortKey) {
  return {
    type    : SORT_IDEAS,
    sortKey
  }
}

export function addVoteSuccess (ideaId, userId) {
  return {
    type    : ADD_VOTE_SUCCESS,
    ideaId,
    userId
  }
}

export function addVoteError (error) {
  return {
    type    : ADD_VOTE_FAIL,
    error
  }
}

export const actions = {
  fetchIdeas,
  closeAddIdeaForm,
  showAddIdeaForm,
  sortIdeas,
  addVote,
  addVoteSuccess,
  createIdeaSuccess
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOAD_ALL_IDEAS_REQUEST] : (state, action) => { return { ...state, fetching: true } },
  [CREATE_IDEA_REQUEST] : (state, action) => { return { ...state, creating: true } },
  [LOAD_ALL_IDEAS_SUCCESS] : (state, action) => {
    return {
      ...state,
      ideasList: action.ideas,
      fetching: false
    }
  },
  [LOAD_ALL_IDEAS_ERROR] : (state, action) => { return { ...state, fetching: false } },
  [CREATE_IDEA_SUCCESS] : (state, action) => {
    return {
      ...state,
      ideasList: state.ideasList.concat(action.idea),
      creating: false
    }
  },
  [CREATE_IDEA_ERROR] : (state, action) => { return { ...state, creating: false } },
  [SHOW_ADD_IDEAS] : (state, action) => { return { ...state, isAddIdeaFormShown: true } },
  [CLOSE_ADD_IDEAS] : (state, action) => { return { ...state, isAddIdeaFormShown: false } },
  [SORT_IDEAS] : (state, action) => { return { ...state, sortBy: action.sortKey } },
  [ADD_VOTE_SUCCESS] : (state, action) => {
    const ideaIndex = state.ideasList.findIndex((item) => item._id == action.ideaId);
    let newIdeasList = state.ideasList;
    newIdeasList[ideaIndex].votes += 1

    return {
      ...state,
      ideaList: newIdeasList
  }}
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { isAddIdeaFormShown: false, fetching: false, creating: false, ideasList: [], sortBy: 'votes' }
export default function ideasReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
