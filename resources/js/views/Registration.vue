<template>
    <div class="b-form">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">


            <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
                <b-form-input
                    id="input-2"
                    v-model="form.name"
                    placeholder="Enter name"
                    required
                ></b-form-input>
                <template v-if="Object.keys(errors).length && Object.keys(errors).name[0]">
                    <b-alert :show= variant="danger">{{ errors.name[0] }}</b-alert>
                </template>
            </b-form-group>
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
                <pre>{{errors.email}}</pre>
                <template v-if="Object.keys(errors).length && Object.keys(errors).email[0]">
                    <b-alert variant="danger">{{ errors.email[0] }}</b-alert>
                </template>
            </b-form-group>

            <b-form-group id="input-group-3" label="Your Password:" label-for="input-2">
                <b-form-input
                    id="input-2"
                    v-model="form.password"
                    placeholder="Enter name"
                    required
                    type="password"
                ></b-form-input>
                <template v-if="Object.keys(errors).length && Object.keys(errors).password[0]">
                    <b-alert :show=   variant="danger">{{ errors.password[0] }}</b-alert>
                </template>
            </b-form-group>
            <b-form-group id="input-group-3" label="Your Password confirmation:" label-for="input-2">
                <b-form-input
                    id="input-2"
                    v-model="form.password_confirmation"
                    placeholder="Enter name"
                    required
                    type="password"
                ></b-form-input>
            </b-form-group>


            <b-form-group label="Large:" label-cols-sm="2" label-size="lg">
                <b-form-file id="file-large" @change="onChange" size="lg"></b-form-file>
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
                name: '',
                password: '',
                password_confirmation: '',
                image: null
            },
            errors: {},
            show: true
        }
    },
    methods: {
        onChange(e) {
            this.form.image = e.target.files[0]
        },
        onSubmit(event) {
            event.preventDefault()
            let formData = new FormData
            formData.append('name', this.form.name)
            formData.append('email', this.form.email)
            formData.append('password', this.form.password)
            formData.append('password_confirmation', this.form.password_confirmation)
            formData.append('image', this.form.image)
            this.$store.dispatch('userCreate', formData).then(res => {
                this.$router.push({name:'Login'})
            }).catch(err => {
                this.errors = err
            })
        },
        onReset(event) {
            event.preventDefault()
            // Reset our form values
            this.form.email = ''
            this.form.name = ''
            this.form.password = ''
        }
    }
}
</script>
<style scoped>
.b-form{
    max-width: 500px;
    margin: 0 auto;
}
</style>
