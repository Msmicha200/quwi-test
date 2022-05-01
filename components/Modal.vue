<template>
    <div @click="$emit('close')" class="full-w quwi--modal-container flex valign-center align-center" :class="{'visible': active}">
        <div @click.stop="" class="quwi--modal-content">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        active: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
.quwi--modal-container {
    top: 0;
    position: fixed;    
    left: 0;
    bottom: 0;
    background: rgba(196, 196, 196, 0.6);
    visibility: hidden;
    opacity: 0;
    transition: .3s;
}

.quwi--modal-content {
    background: #fff;
    padding: 30px;
    border-radius: 10px;
}

.quwi--modal-container.visible {
    opacity: 1;
    visibility: visible;
}
</style>