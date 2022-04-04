import Vue from "vue";
import Vuex from "vuex";

import me from "./modules/me";
import users from "./modules/users";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        me,
        users
    }
});