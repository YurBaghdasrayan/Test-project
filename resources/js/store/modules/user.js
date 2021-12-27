export default {
    state: {
        users: [],
        authUser: []
    },
    mutations: {
        SET_USERS(state, data) {
            state.users = data
        },
        SET_AUTH_USER(state, data) {
            state.authUser = data
        }
    },

    actions: {
        verify_user(context, data) {
            return new Promise((resolve, reject) => {
                axios.post('/api/verify', data)
                    .then((res) => {
                        console.log(res.data);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
        },
        userCreate({commit}, payload) {
            return new Promise((resolve, reject) => {
                axios.post('/api/registration', payload)
                    .then(res => {
                        resolve(res.data.message)
                    }).catch(error => {
                    reject(error.response.data.errors)
                })
            })
        },
        userLogin({commit}, payload) {
            return new Promise((resolve, reject) => {
                axios.post('/api/login', payload)
                    .then(res => {
                        localStorage.setItem('access_token', res.data.access_token);
                        commit('SET_AUTH_USER', res.data.authUser)
                        resolve(res.data)
                    }).catch(error => {
                    reject(error.response.data.errors)
                })
            })
        },
        userData({commit, state}) {
            return new Promise((resolve, reject) => {
                axios.get('/api/users').then(res => {
                    commit('SET_USERS', res.data.users)
                }).catch(err => {
                    reject('asdknhaskjd')
                })
            })
        },
        updateUser({commit, state}, payload) {
            let {id} = payload
            return new Promise((resolve, reject) => {
                axios.patch('/api/users/' + id, payload).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject('asdknhaskjd');
                })
            })
        },
        getUserDate({commit}, payload) {
            return new Promise((resolve, reject) => {
                axios.get('/api/users/auth').then(res => {
                    commit('SET_AUTH_USER', res.data.user_data)
                    resolve(res.data)
                }).catch(err => {
                    reject('this is user error');
                })
            })

        },
    },

    getters: {
        signupData(state) {
            return state.signupData
        },
    }
}
