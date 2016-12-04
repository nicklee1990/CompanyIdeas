const API = require('utils/API').default
import { SubmissionError, reset } from 'redux-form'
import { showNotification } from 'store/notifications'

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_ALL_COMMENTS_REQUEST = 'LOAD_ALL_COMMENTS_REQUEST'
export const LOAD_ALL_COMMENTS_SUCCESS = 'LOAD_ALL_COMMENTS_SUCCESS'
export const LOAD_ALL_COMMENTS_ERROR = 'LOAD_ALL_COMMENTS_ERROR'
export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST'
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS'
export const ADD_COMMENT_ERROR = 'ADD_COMMENT_ERROR'

// ------------------------------------
// Actions
// ------------------------------------
export const fetchComments = (ideaId) => {
  return (dispatch, getState) => {
    dispatch(loadAllCommentsRequest())
    return API.get(`/api/ideas/${ideaId}/comments`)
      .then((data) => {
        dispatch(loadCommentsSuccess(ideaId, data.data))
      }, (err) => {
        dispatch(loadCommentsError(err))
      })
  }
}

export const addComment = (ideaId, text) => {
  return (dispatch, getState) => {
    dispatch(createCommentRequest())
    return API.post(`/api/ideas/${ideaId}/comments`, { text })
      .then((data) => {
        dispatch(createCommentSuccess(ideaId, data))
        dispatch(showNotification('Success! Your comment was added'))
        dispatch(reset('addComment'))
      }, (err) => {
        dispatch(createCommentError(err))
        throw new SubmissionError(err)
      })
  }
}

export function loadAllCommentsRequest () {
  return {
    type     : LOAD_ALL_COMMENTS_REQUEST
  }
}

export function loadCommentsSuccess (ideaId, comments) {
  return {
    type     : LOAD_ALL_COMMENTS_SUCCESS,
    ideaId,
    comments
  }
}

export function loadCommentsError () {
  return {
    type     : LOAD_ALL_COMMENTS_ERROR
  }
}

export function createCommentRequest (ideaId, comment) {
  return {
    type     : ADD_COMMENT_REQUEST,
    ideaId,
    comment
  }
}

export function createCommentSuccess (ideaId, comment) {
  return {
    type     : ADD_COMMENT_SUCCESS,
    ideaId,
    comment
  }
}

export function createCommentError (errors) {
  return {
    type     : ADD_COMMENT_ERROR,
    errors
  }
}

export const actions = {
  fetchComments,
  addComment
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOAD_ALL_COMMENTS_REQUEST] : (state, action) => { return { ...state, fetching: true } },
  [ADD_COMMENT_REQUEST] : (state, action) => { return { ...state, creating: true } },
  [LOAD_ALL_COMMENTS_SUCCESS] : (state, action) => {
    return {
      ...state,
      commentsByIdeaId: { ...state.commentsByIdeaId, [action.ideaId]: action.comments },
      fetching: false
    }
  },
  [LOAD_ALL_COMMENTS_ERROR] : (state, action) => { return { ...state, fetching: false } },
  [ADD_COMMENT_SUCCESS] : (state, action) => {
    return {
      ...state,
      commentsByIdeaId:  {
        ...state.commentsByIdeaId,
        [action.ideaId]: state.commentsByIdeaId[action.ideaId].concat(action.comment)
      },
      creating: false
    }
  },
  [ADD_COMMENT_ERROR] : (state, action) => { return { ...state, creating: false } }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { commentsByIdeaId: {}, fetching: false, creating: false }
export default function commentsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
