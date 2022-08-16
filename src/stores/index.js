import Vue from "vue";
import Vuex from "vuex";

import groups from "./modules/groups";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        groups
    }
});