import Vue from "vue";
import Vuex from "vuex";

import me from "./modules/me";
import groups from "./modules/groups";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        me,
        groups
    }
});