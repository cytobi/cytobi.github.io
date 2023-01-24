<template>
    <div class="fullpage-minus-header">
        <button @click="startSpeedTest" class="start-speedtest-button" v-if="!running">
            <div>start speed test</div>
        </button>
        <button @click="startSpeedTest" class="running-speedtest-button" v-else>
            <p>
                {{ timeLeft.toFixed(2) }} seconds left
            </p>
            <p>
                {{ speed }} pixels/second
            </p>
        </button>
    </div>
    <el-dialog v-model="dialogVisible" width="50%" class="result-dialog">
        <template #header>
            <div class="result-dialog-header">Results</div>
        </template>
        <div class="result-dialog-element">
            You achieved an average speed of <div class="highlighted-text">{{ averageSpeed }} pixels/second</div>
        </div>
        <div class="result-dialog-element">
            That is {{ Math.round((averageSpeed / screenWidth) * 1000) / 1000 }} times the width of your screen per
            second
        </div>
        <div class="gap-1rem"></div>
        <div class="result-dialog-element">
            You achieved a top speed of <div class="highlighted-text">{{ topSpeed }} pixels/second</div>
        </div>
        <div class="result-dialog-element">
            That is {{ Math.round((topSpeed / screenWidth) * 1000) / 1000 }} times the width of your screen per second
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dist = ref(0) //dist since last speed update
const speed = ref(0) //last speed

const averageSpeed = ref(0) //average speed after test ended
const topSpeed = ref(0) //top speed after test ended

const running = ref(false) //is the test running

const dialogVisible = ref(false) //is the result dialog visible

const speedList = ref<number[]>([]) //list of all speeds during test

//don't use corrected scaling because speed is in css pixels as well
//const screenWidth = ref(screen.width * window.devicePixelRatio) //screen width with corrected scaling
const screenWidth = ref(screen.width) //screen width without corrected scaling

const speedUpdateInterval = ref(100) //interval in ms between speed updates

const pythag = (x: number, y: number) => Math.sqrt(x * x + y * y) //pythagorean theorem, also gets rid of negative values

const timeLeft = ref(10) //time left in seconds

document.addEventListener('mousemove', (e) => {
    dist.value += pythag(e.movementX, e.movementY)
})

setInterval(() => {
    speed.value = Math.round(dist.value * (1000 / speedUpdateInterval.value)) //speed since last update
    dist.value = 0 //reset distance
    if (running.value) {
        speedList.value.push(speed.value)
    }
}, speedUpdateInterval.value)

setInterval(() => {
    if (running.value) {
        timeLeft.value = timeLeft.value - 0.01
    }
}, 10)

const startSpeedTest = () => {
    running.value = true
    setTimeout(() => { //run test for 10 seconds
        running.value = false
        averageSpeed.value = 0 //reset average speed
        topSpeed.value = 0 //reset top speed
        timeLeft.value = 10 //reset time left
        speedList.value.forEach((s) => { //calculate average and top speed
            averageSpeed.value += s
            if (s > topSpeed.value) {
                topSpeed.value = s
            }
        })
        averageSpeed.value = Math.round(averageSpeed.value / speedList.value.length)
        dialogVisible.value = true
    }, 10000)
}
</script>

<style>
.fullpage-minus-header {
    display: grid;
    place-items: center;
    height: 90vh;
    width: 100vw;
}

.start-speedtest-button {
    aspect-ratio: 1.618;
    width: 80vmin;
    font-size: 4rem;
    background-color: var(--bg-color);
    border: 2px solid var(--secondary-color);
    border-radius: 4rem;
    color: var(--text-color);
}

.start-speedtest-button:hover {
    border-color: var(--primary-color);
}

.running-speedtest-button {
    aspect-ratio: 1.618;
    width: 80vmin;
    font-size: 4rem;
    background-color: var(--bg-color);
    border: 2px solid var(--primary-color);
    color: var(--text-color);
    border-radius: 4rem;
}

.result-dialog {
    background-color: var(--bg-color);
    border: 2px solid var(--primary-color);
    height: 14rem;
    width: 30rem;
}

.result-dialog-element {
    font-size: 1rem;
    color: var(--text-color);
}

.result-dialog-header {
    font-size: 2rem;
    color: var(--text-color);
}

.gap-1rem {
    height: 1rem;
}

.highlighted-text {
    color: var(--primary-color);
    display: inline;
}
</style>