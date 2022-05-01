<template>
    <div class="quwi--input-container" :class="{'quwi--invalid': invalid}">
        <input v-bind="$attrs" v-on="{...$listeners, input: event => $emit('input', event.target.value)}" class="quwi--input" required />
        <label v-if="placeholder" class="quwi--input-placeholder">{{ placeholder }}</label>
    </div>
</template>

<script>
export default {
    model: {
        event: 'input',
    },
    props: {
        placeholder: {
            type: String,
            default: null
        },
        invalid: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
.quwi--input-container {
    position: relative;
    padding-top: 10px;
}

.quwi--input {
    border-bottom: 1px solid #c4c4c4;
    transition: .3s;
    padding: 10px 15px;
    width: 300px;
}

.quwi--input-placeholder {
    position: absolute;
    left: 15px;
    color: #ada9a9;
    transition: .3s;
    transform: scale(1);
    opacity: 1;
    bottom: 10px;
    font-size: 14px;
    transform-origin: left;
}

.quwi--input:valid {
    border-color: #072DB6;
}

.quwi--input:valid +.quwi--input-placeholder {
    bottom: 30px;
    transform: scale(0.9);
    color: #072DB6;
}

.quwi--invalid .quwi--input {
    border-color: red;
}
/* 
.quwi--invalid .quwi--input:valid +.quwi--input-placeholder {
    color: red;
} */
</style>
