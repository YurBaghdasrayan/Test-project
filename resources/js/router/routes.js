
const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '../views/home'),
    },
    {
        path: '/users',
        name: 'Users',
        component: () => import(/* webpackChunkName: "users" */ '../views/users'),
    },
]

export default routes
