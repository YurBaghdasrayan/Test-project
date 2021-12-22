<template>
    <div class="user-component">
        <ul>
            <li v-for="user in users">
                {{user.phone}}
                <input type="text"    >
                <button @click="updateuser(user.id)">Update user</button>
            </li>
        </ul>
        <button @click="getUsers">GET users</button>
        <router-link :to="'/'">Go to home</router-link>
    </div>
</template>

<script>
export default {
    name: "users",
    computed: {
        users() {
            return this.$store.state.user.users
        }
    },
    methods: {
        getUsers() {
            this.$store.dispatch('userData')
        },
        updateuser(id) {
            let payload = {
                name: 'Poxosuhi',
                phone: '37498692769',
                id: id
            }
            this.$store.dispatch('updateUser', payload)
        }
    },
    created() {
        this.getUsers()
    }
}
</script>

<style scoped>

</style>
