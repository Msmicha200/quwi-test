<template>
    <button v-bind="$attrs" v-on="$listeners">
        <slot />
    </button>
</template>

<style scoped>
button {
    border: 2px solid black;
    background: #fff;
    padding: 8px 30px;
    border-radius: 10px;
    cursor: pointer;
    transition: .3s;
}

button:hover {
    background: #000;
    color: #fff;
}

button:disabled {
    background: #ada9a9;
    color: #fff;
    border-color: #fff;
}
</style>