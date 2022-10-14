<template>
    <el-main>
        <div>
            WIP-body
        </div>
        <el-button @click="count++" type="primary">
            count is {{ count }}
        </el-button>
    </el-main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<style>
.el-main {
    padding: 10px;
}
</style>