<template>
    <div>
        <h1>HELLO USER</h1>
        <p>{{authUser.name}}</p>
        <p>{{authUser.email}}</p>
        <p>{{authUser.role.name}}</p>
    </div>
</template>

<script>
export default {
    name: "Profile",
    methods:{

    },
    computed: {
      authUser() {
          return this.$store.state.user.authUser
      }
    },
    created() {
        this.$store.dispatch('getUserDate');
    }
}
</script>

<style scoped>

</style>
