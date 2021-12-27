<template>
    <div class="b-form">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
                id="input-group-1"
                label="Email address:"
                label-for="input-1"
            >
                <b-form-input
                    id="input-1"
                    v-model="form.email"
                    type="email"
                    placeholder="Enter email"
                    required
                ></b-form-input>
                <!--                <template v-if="Object.keys(errors).length && Object.keys(errors).email[0]">-->
                <!--                    <b-alert variant="danger">{{ errors.email[0] }}</b-alert>-->
                <!--                </template>-->
            </b-form-group>

            <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
                <b-form-input
                    id="input-2"
                    v-model="form.password"
                    placeholder="Enter name"
                    required
                    type="password"
                ></b-form-input>
                <!--                <template v-if="Object.keys(errors).length && Object.keys(errors).name[0]">-->
                <!--                    <b-alert :show=variant="danger">{{ errors.name[0] }}</b-alert>-->
                <!--                </template>-->
            </b-form-group>
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>

    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                email: '',
                password: '',
            },
            errors: {},
            show: true
        }
    },
    methods: {
        onSubmit(event) {
            event.preventDefault()
            this.$store.dispatch('userLogin', this.form).then(res => {
                let roleName = res.authUser.role.name
                console.log(roleName)
                if (roleName == 'admin') {
                    return this.$router.push({name: 'Users'})
                }else if(roleName == 'user') {
                    return this.$router.push({name: 'Profile'})
                }
            }).catch(err => {
                this.errors = err
            })
        },

        onReset(event) {
            event.preventDefault()
            // Reset our form values
            this.form.email = ''
            this.form.password = ''
        }
    }
}
</script>
<style scoped>
.b-form {
    max-width: 500px;
    margin: 0 auto;
}
</style>
