import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/vuex_state'

Vue.use(VueRouter)

const router = new VueRouter({
    // mode: 'history',
    routes : [
        {
            path : '/',
            component : resolve => require(['@/components/Login'], resolve)
        },
        {
            path : '/main',
            component : resolve => require(['@/components/Index'], resolve),
            children : [
                {
                    path : 'menu_index',
                    component : resolve => require(['@/components/Menu/Index'], resolve)
                },
                {
                    path : 'menu_add_edit/:fid/:id?',
                    component : resolve => require(['@/components/Menu/AddEdit'], resolve)
                },
                // 管理员
                {
                    path : 'set_password/:id?',
                    component : resolve => require(['@/components/Admin/SetPassword'], resolve)
                },
                {
                    path : 'admin_user_index',
                    component : resolve => require(['@/components/Admin/Index'], resolve)
                },
                {
                    path : 'admin_user_add_edit/:id?',
                    component : resolve => require(['@/components/Admin/AddEdit'], resolve)
                },
                //管理员分组
                {
                    path : 'admin_group_index',
                    component : resolve => require(['@/components/AdminGroup/Index'], resolve)
                },
                {
                    path : 'admin_group_add_edit/:id?',
                    component : resolve => require(['@/components/AdminGroup/AddEdit'], resolve)
                },
                {
                    path : '',
                    component : resolve => require(['@/components/Menu/Index'], resolve)
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    // if((!null) && to.path != '/') {
    if((!store.getters.getToken()) && to.path != '/') {
        next('/')
    } else if(store.getters.getToken() && to.path == '/') {
        next({path : 'main'})
    } else {
        next()
    }
})

export default router