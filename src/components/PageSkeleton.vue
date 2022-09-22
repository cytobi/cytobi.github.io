<template>
    <el-container>
        <el-header>WIP-Header</el-header>
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
    border-bottom: 3px solid #393E46;
    padding: 10px;
}

.el-main {
    padding: 10px;
}
</style>