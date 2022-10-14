<template>
    <el-container>
        <el-header v-if="displayHeader">
            <img class="avatar" src="/src/assets/avatar.png" />
            <div class="title">cytobi</div>
        </el-header>
        <router-view></router-view>
    </el-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { path } = defineProps({
    path: { type: String, required: true }
})

const displayHeader = computed(() => path !== '/morph')
</script>

<style>
.el-header {
    background-color: var(--secondary-color);
    padding: 10px;
    height: 80px;
    padding-left: 5%;
}

.avatar {
    height: 56px;
    border: 2px solid var(--primary-color);
    border-radius: 50%;
}

.title {
    color: var(--primary-color);
    font-weight: bold;
    margin-left: 30px;
    font-size: 50px;

    display: inline;
    position: absolute;
}
</style>