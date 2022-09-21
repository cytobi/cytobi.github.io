<template>
    WIP
    <div class="card">
        <el-button @click="count++">count is {{ count }}</el-button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>
