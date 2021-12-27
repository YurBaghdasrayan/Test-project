
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
    {
        path: '/registration',
        name: 'Registration',
        component: () => import(/* webpackChunkName: "users" */ '../views/Registration'),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "users" */ '../views/Login'),
    },
    {
        path: '/veryfy',
        name: 'Veryfy',
        component: () => import(/* webpackChunkName: "users" */ '../views/veryfy'),
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import(/* webpackChunkName: "profile" */'../views/Profile'),
    }
]

export default routes
