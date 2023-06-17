<template>
    <div class="icon">
        <Icon
            class="loading-svg"
            :class="{ loading: loading }" />
    </div>
</template>

<script lang="ts" setup>
import Icon from '~/assets/images/icon.svg';

defineProps({
    loading: {
        type: Boolean,
        required: true,
        default: true,
    },
});
</script>

<style scoped>
.icon {
    height: 180px;
    width: 180px;
}

.loading {
    stroke-dasharray: 4000;
    stroke-dashoffset: 4000;
    animation: draw-stroke 3s linear forwards infinite;
}

@keyframes draw-stroke {
    0% {
        stroke-dashoffset: 4000;
    }
    100% {
        stroke-dashoffset: 0;
    }
}
</style>
