<template>
    <div class="full-w">
        <section class="container flex valign-center align-center">
            <form novalidate class="flex dir-col valign-center login-form" @input="isBadCredentials = false">
                <h2>Login</h2>
                <div>
                    <Input v-model="$v.email.$model"
                    :invalid="$v.email.$error || isBadCredentials"
                    placeholder="Email"
                    class="login-input" />
                    <Input v-model="$v.password.$model"
                    :invalid="$v.password.$error || isBadCredentials"
                    placeholder="Password" 
                    class="login-input" type="password" />
                </div>
                <DefaultButton :disabled="lockedButton" 
                @click.prevent="login" 
                class="login-button">Login</DefaultButton>
            </form>
        </section>
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
    data() {
        return {
            email: "sajoci8750@svcache.com",
            password: "123456789q",
            lockedButton: false,
            isBadCredentials: false
        }
    },
    middleware: [function(ctx) {
        if (ctx.$auth.state.loggedIn === true) {
            return ctx.redirect('/home');
        }
    }],
    validations() {
        const validations = {
            email: {
                required
            },
            password: {
                required
            }
        };

        return validations;
    },
    methods: {
        login() {
            this.$v.$touch();

            if (this.$v.$anyError) {
                return false;
            }

            this.lockedButton = true;

            this.$axios.post('/auth/login', {
                email: this.email,
                password: this.password
            })
            .then(result => {
                if (result.data.token) {
                    this.$auth.loginUser(`Bearer ${result.data.token}`);
                    this.$router.push('/home');
                }
            })
            .catch(err => {
                console.log(err)
                this.isBadCredentials = true;
            })
            .finally(() => {
                this.lockedButton = false;
            });
        }
    }
}
</script>

<style scoped>
.login-input {
    margin-top: 20px;
}

.login-form {
    margin-top: 20vh;
}

.login-button {
    margin-top: 40px;
}
</style>
