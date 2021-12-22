<template>
    <div class="home-component">
        Home
        <router-link :to="'/users'">Go to users</router-link>
    </div>
</template>

<script>
export default {
    name: "home",
    created() {
        console.log('Hello from Home')
    }
}
</script>

<style scoped>

</style>
