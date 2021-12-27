<template>
    <div class="user-component">
        <table class="table">
            <thead>
            <tr>
                <th scope="col">id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Edit</th>
            </tr>
            </thead>
            <tbody>
            <template v-for="user in users">
                <tr>
                    <th scope="row">{{ user.id }}</th>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td><a href="#" @click.prevent="changeEditUserId(user.id, user.name, user.email)"
                           class="btn btn-success">Edit</a></td>
                </tr>
                <tr :class="isEdit(user.id) ? '' : 'd-none'">
                    <th scope="row">{{ user.id }}</th>
                    <td><input type="text" v-model="user.name" class="form-control"></td>
                    <td><input type="text" v-model="user.email" class="form-control"></td>
                    <td><a href="#" @click.prevent="update(user)" class="btn btn-success">Update</a></td>
                </tr>

            </template>
            </tbody>
        </table>

        <button @click="getUsers">GET users</button>
        <router-link :to="'/'">Go to home</router-link>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: null,
            editUserId: null,
        }
    },

    name: "users",
    computed: {
        users() {
            return this.$store.state.user.users
        }
    },
    methods: {
        getUsers(id) {
            this.$store.dispatch('userData')
        },
        update(user) {
            let payload = {
                id: user.id,
                name: user.name,
                email: user.email
            }
            this.$store.dispatch('updateUser', payload)
        },
        changeEditUserId(id, name, email) {
            this.editUserId = id
            this.name = name
            this.email = email
        },
        isEdit(id) {
            return this.editUserId === id
        },
    },


    created() {
        this.getUsers()
    }
}
</script>

<style scoped>

</style>
