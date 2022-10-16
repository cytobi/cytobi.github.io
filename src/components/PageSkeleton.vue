<template>
    <el-container>
        <el-header v-if="displayHeader">
            <img class="avatar" src="/src/assets/avatar.png" @click="goHome()" />
            <div class="title">cytobi</div>
        </el-header>
        <wip-body v-if="page === 'WipBody'" />
        <mouse-speed v-if="page === 'MouseSpeed'" />
        <morphing-shapes @page="(n) => { toProject(n) }" v-if="page === 'MorphingShapes'" />
    </el-container>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import MorphingShapes from './MorphingShapes.vue';
import WipBody from './WipBody.vue';
import MouseSpeed from './MouseSpeed.vue';

const page = ref("MorphingShapes")
var displayHeader = computed(() => page.value !== "MorphingShapes")

function toProject(id: number) {
    if (id === 0) {
        page.value = "WipBody"
    }
    if (id === 1) {
        page.value = "MouseSpeed"
    }
    updateHeader()
}

function updateHeader() {
    displayHeader = computed(() => page.value !== "MorphingShapes")
}

function goHome() {
    page.value = "MorphingShapes"
    updateHeader()
}
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