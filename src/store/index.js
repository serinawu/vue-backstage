import { createStore } from 'vuex';
import tab from './tab';
import user from './user';

export default createStore({
  modules: {
    tab,
    user
  }
});