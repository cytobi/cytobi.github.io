<template>
    <el-container>
        <el-header>
            <img class="avatar" src="/src/assets/avatar.png" />
            <div class="title">cytobi</div>
        </el-header>
        <el-main>
            <div>
                WIP-body
            </div>
            <el-button @click="count++" type="primary">
                count is {{ count }}
            </el-button>
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<style>
.el-header {
    background-color: var(--secondary-color);
    padding: 10px;
    height: 80px;
    padding-left: 5%;
}

.el-main {
    padding: 10px;
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