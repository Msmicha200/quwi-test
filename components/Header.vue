<template>
    <header class="flex align-between">
        <NuxtLink to="/home" class="logo">
            <img src="/logo_150.png" alt="logo">
        </NuxtLink>
        <button v-show="$auth.state.loggedIn" @click="logout">LOGOUT</button>
    </header>
</template>

<script>
export default {
    methods: {
        logout() {
            this.$auth.logOut();
            this.$router.replace('/');
        }
    }
}
</script>

<style scoped>
header {
    padding: 25px 40px;
    border: 1px solid black;
}
.logo img {
    width: 50px;
    height: 50px;
}
</style>