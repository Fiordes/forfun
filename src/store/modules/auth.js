import authAPI from '@/api/auth';
import {setItem} from '@/helpers/persistenceStorage';

const state = {
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
  isLoading: false,
};

export const mutationsTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailed: '[auth] registerFailed',

  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailed: '[auth] loginFailed',

  getCurrentUserStart: '[auth] getCurrentUserStart',
  getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
  getCurrentUserFailed: '[auth] getCurrentUserFailed',
};

const mutations = {
  [mutationsTypes.registerStart](state) {
    (state.isSubmitting = true), (state.validationErrors = null);
  },
  [mutationsTypes.registerSuccess](state, payload) {
    (state.isSubmitting = false),
      (state.currentUser = payload),
      (state.isLoggedIn = true);
  },
  [mutationsTypes.registerFailed](state, payload) {
    (state.isSubmitting = false), (state.validationErrors = payload);
  },
  [mutationsTypes.loginStart](state) {
    (state.isSubmitting = true), (state.validationErrors = null);
  },
  [mutationsTypes.loginSuccess](state, payload) {
    (state.isSubmitting = false),
      (state.currentUser = payload),
      (state.isLoggedIn = true);
  },
  [mutationsTypes.loginFailed](state, payload) {
    (state.isSubmitting = false), (state.validationErrors = payload);
  },
  [mutationsTypes.getCurrentUserStart](state) {
    state.isLoggedIn = true;
  },
  [mutationsTypes.getCurrentUserSuccess](state, payload) {
    (state.isLoading = false),
      (state.currentUser = payload),
      (state.isLoggedIn = true);
  },
  [mutationsTypes.getCurrentUserFailed](state) {
    (state.isLoading = false), (state.isLoggedIn = false);
    state.currentUser = null;
  },
};

export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login',
  getCurrentUser: '[auth] getCurrentUser',
};

const actions = {
  [actionTypes.register](context, credentials) {
    return new Promise((resolve) => {
      context.commit(mutationsTypes.registerStart);

      authAPI
        .register(credentials)
        .then((response) => {
          context.commit(mutationsTypes.registerSuccess, response.data.user);
          setItem('accessToken', response.data.user.token);
          resolve(response.data.user);
        })
        .catch((result) => {
          context.commit(
            mutationsTypes.registerFailed,
            result.response.data.errors
          );
        });
    });
  },
  [actionTypes.login](context, credentials) {
    return new Promise((resolve) => {
      context.commit(mutationsTypes.loginStart);

      authAPI
        .login(credentials)
        .then((response) => {
          context.commit(mutationsTypes.loginSuccess, response.data.user);
          setItem('accessToken', response.data.user.token);
          resolve(response.data.user);
        })
        .catch((result) => {
          context.commit(
            mutationsTypes.loginFailed,
            result.response.data.errors
          );
        });
    });
  },
  [actionTypes.getCurrentUser](context) {
    return new Promise((resolve) => {
      context.commit(mutationsTypes.getCurrentUserStart);

      authAPI
        .getCurrentUser()
        .then((response) => {
          context.commit(
            mutationsTypes.getCurrentUserSuccess,
            response.data.user
          );
          resolve(response.data.user);
        })
        .catch(() => {
          context.commit(mutationsTypes.getCurrentUserFailed);
        });
    });
  },
};

export const getterTypes = {
  currentUser: '[auth] currentUser',
  isLoggedIn: '[auth] isLoggedIn',
  isAnonymous: '[auth] isAnonymous',
};
const getters = {
  [getterTypes.currentUser]: (state) => {
    return state.currentUser;
  },
  [getterTypes.isLoggedIn]: (state) => {
    return Boolean(state.isLoggedIn);
  },
  [getterTypes.isAnonymous]: (state) => {
    return state.isLoggedIn === false;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
