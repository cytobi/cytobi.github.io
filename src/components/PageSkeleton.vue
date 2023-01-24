<template>
    <el-container>
        <el-header v-if="displayHeader">
            <el-button class="home-button" @click="goHome()">
                <el-icon class="home-icon">
                    <House />
                </el-icon>
            </el-button>
            <img class="avatar" src="/src/assets/avatar.png" @click="toProject(4)" />
            <div class="title">cytobi</div>
        </el-header>
        <wip-body v-if="page === 'WipBody'" />
        <mouse-speed v-if="page === 'MouseSpeed'" />
        <morphing-shapes @page="(n) => { toProject(n) }" v-if="page === 'MorphingShapes'" />
    </el-container>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { House } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'

import MorphingShapes from './menus/MorphingShapes.vue';
import WipBody from './WipBody.vue';
import MouseSpeed from './webapps/MouseSpeed.vue';

const page = ref("MorphingShapes")
var displayHeader = computed(() => page.value !== "MorphingShapes")

function toProject(id: number) {
    if (id === 0) {
        window.location.href = 'https://cytobi.tumblr.com/';
    }
    if (id === 1) {
        page.value = "Projects"
    }
    if (id === 2) {
        page.value = "MouseSpeed"
    }
    if (id === 3) {
        page.value = "WipBody"
    }
    if (id === 4) {
        page.value = "AboutMe"
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

setInterval(() => {
    if (page.value === "MorphingShapes") {
        ElNotification({
            title: 'Tip',
            message: 'Try clicking on the shapes!',
            type: 'info',
            showClose: false,
        })
    }
}, 30000)
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

.home-button {
    background-color: var(--secondary-color);
    border: 0px;
    border-left: 2px solid var(--bg-color);
    border-radius: 0;
    height: 76px;
    aspect-ratio: 1;
    position: absolute;
    right: 0;
    top: 2px;
    color: var(--primary-color);
    font-size: xx-large;
}

.home-button:hover {
    background-color: var(--secondary-color);
    border: 0px;
    border-left: 2px solid var(--primary-color);
}
</style>