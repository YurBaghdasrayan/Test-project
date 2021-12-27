<template>
    <div class=" verified">
        <div class="d-flex flex-column text-center ">
            <b>Congrats {{details.email}} </b>
            <p>You are successfully registered</p>
            <p class="">Welcome</p>
<!--                  <b-btn variant="success" v-on:click="showParams">Confirm</b-btn>-->
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data: () => ({
        details: {
            email: '',
            token: ''
        }
    }),
    mounted() {
        this.getTokenAndEmail();
        this.showParams();
    },
    methods: {
        getTokenAndEmail() {
            this.details.token = this.$route.query.token
            this.details.email = this.$route.query.email
        },
        showParams() {
            this.$store.dispatch('verify_user', this.details)
                .then(res => {
                    console.log(res.details)
                })
                .catch(error => {
                    console.log(error)
                })
        },
    },
}
</script>

<style scoped>

</style>
