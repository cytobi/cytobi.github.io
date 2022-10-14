<template>
    <div>
        WIP-body
    </div>
    <el-button @click="count++" type="primary">
        count is {{ count }}
    </el-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>