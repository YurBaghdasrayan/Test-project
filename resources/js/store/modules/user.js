export default {
    state: {
        users: [],
    },
    mutations: {
        SET_USERS(state, data) {
            state.users = data
        },
    },

    actions: {
        userData({commit, state}){
            return new Promise((resolve, reject) => {
                axios.get('/api/users').then(res => {
                    commit('SET_USERS', res.data.users)
                }).catch(err => {
                    reject('asdknhaskjd')
                })
            })
        },
        updateUser({commit, state}, payload){
            let {id} = payload
            let {name, phone} = payload
            return new Promise((resolve, reject) => {
                axios.put('/api/users/'+id).then(res => {
                    commit('SET_USERS', res.data.users)
                }).catch(err => {
                    reject('asdknhaskjd')
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
