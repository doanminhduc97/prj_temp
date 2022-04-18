import Vue from 'vue';
import Router from 'vue-router';

import routes from './router'
import util from "../common/util/util"

Vue.use(Router);
const publicPage = ["/login"];
const router = new Router({
    routes: routes,
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
});

// router.beforeEach((to, from, next) => {
//     if (!publicPage.includes(to.path)) {
//         const token = localStorage.getItem("jwt") || undefined;
//         if (token) {
//             const parseToken = util.parseJwt(token);
//             if (parseToken.sub !== JSON.parse(localStorage.getItem("userInfo")).taiKhoan) {
//                 next({ path: '/login' });
//             }
//         } else {
//             next({ path: '/login' });
//         }
//     }
//     next();
// })

export default router
