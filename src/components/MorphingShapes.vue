<template>
    <div id="fullpage">
        <div id="wrapper">
            <div class="shape" @click="handleClickOnShape(1)">ABC</div>
            <div class="shape" @click="handleClickOnShape(2)">DEF</div>
            <div class="shape" @click="handleClickOnShape(3)">GHI</div>
            <div class="shape" @click="handleClickOnShape(4)">JKL</div>
            <div class="shape" @click="handleClickOnShape(5)">MNO</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

var doMorph = true

var wrapper = document.getElementById("wrapper")

onMounted(() => {
    wrapper = document.getElementById("wrapper")
})

const randomIntBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

var prevRound = "1"
var prevConfig = "1"

setInterval(() => {
    if (wrapper !== null && doMorph) {
        do {
            var newRound = randomIntBetween(1, 6).toString()
            var newConfig = randomIntBetween(1, 6).toString()
        } while (newRound === prevRound && newConfig === prevConfig)

        prevRound = newRound
        prevConfig = newConfig

        wrapper.setAttribute("data-roundness", newRound.toString())
        wrapper.setAttribute("data-config", newConfig.toString())
    }
}, 3000)

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function handleClickOnShape(id: number) {
    doMorph = !doMorph
    wrapper?.setAttribute("data-roundness", "0")
    wrapper?.setAttribute("data-config", "0")
    await delay(300)
    router.push("/projects/" + id)
}
</script>

<style>
#fullpage {
    display: grid;
    place-items: center;
    /* 99vh to avoid scroll bar */
    height: 99vh;
    width: 100vw;
}


#wrapper {
    aspect-ratio: 1.618;
    width: 80vmin;
    position: relative;
}


#wrapper>.shape {
    height: 60%;
    width: 20%;
    position: absolute;
    transition: left, top, height, width, border-radius, background-color, color;
    transition-duration: 500ms;
    transition-timing-function: ease-in-out;
    color: rgba(255, 255, 255, 0);
    font-size: 20rem;
    font-weight: bold;
    overflow: hidden;
}


#wrapper>.shape:nth-child(1) {
    left: 0%;
    top: 0%;
    background-color: #264653;
}

#wrapper>.shape:nth-child(2) {
    left: 20%;
    top: 10%;
    background-color: #2a9d8f;
}

#wrapper>.shape:nth-child(3) {
    left: 40%;
    top: 20%;
    background-color: #e9c46a;
}

#wrapper>.shape:nth-child(4) {
    left: 60%;
    top: 30%;
    background-color: #f4a261;
}

#wrapper>.shape:nth-child(5) {
    left: 80%;
    top: 40%;
    background-color: #e76f51;
}

#wrapper[data-roundness="0"]>.shape {
    border-radius: 0;
}

#wrapper[data-roundness="1"]>.shape {
    border-radius: 0;
}

#wrapper[data-roundness="2"]>.shape {
    border-radius: 2rem;
}

#wrapper[data-roundness="3"]>.shape {
    border-radius: 4rem;
}

#wrapper[data-roundness="4"]>.shape {
    border-radius: 8rem;
}


#wrapper[data-roundness="5"]>.shape:nth-child(1) {
    border-bottom-left-radius: 8rem;
}

#wrapper[data-roundness="5"]>.shape:nth-child(2) {
    border-top-right-radius: 8rem;
}

#wrapper[data-roundness="5"]>.shape:nth-child(3) {
    border-radius: 8rem;
}

#wrapper[data-roundness="5"]>.shape:nth-child(4) {
    border-bottom-right-radius: 8rem;
    border-top-left-radius: 8rem;
}

#wrapper[data-roundness="5"]>.shape:nth-child(5) {
    border-top-right-radius: 8rem;
    border-top-left-radius: 8rem;
}


#wrapper[data-roundness="6"]>.shape:nth-child(1) {
    border-bottom-left-radius: 4rem;
    border-top-right-radius: 4rem;
}

#wrapper[data-roundness="6"]>.shape:nth-child(2) {
    border-bottom-left-radius: 8rem;
}

#wrapper[data-roundness="6"]>.shape:nth-child(3) {
    border-top-right-radius: 4rem;
}

#wrapper[data-roundness="6"]>.shape:nth-child(4) {
    border-top-left-radius: 16rem;
}

#wrapper[data-roundness="6"]>.shape:nth-child(5) {
    border-top-left-radius: 8rem;
}


#wrapper[data-config="0"]>.shape {
    background-color: rgba(255, 255, 255, 0);
}

#wrapper[data-config="1"]>.shape:nth-child(1) {
    top: 0%;
    height: 60%;
}

#wrapper[data-config="1"]>.shape:nth-child(2) {
    top: 10%;
    height: 60%;
}

#wrapper[data-config="1"]>.shape:nth-child(3) {
    top: 20%;
    height: 60%;
}

#wrapper[data-config="1"]>.shape:nth-child(4) {
    top: 30%;
    height: 60%;
}

#wrapper[data-config="1"]>.shape:nth-child(5) {
    top: 40%;
    height: 60%;
}


#wrapper[data-config="2"]>.shape:nth-child(1) {
    top: 0%;
    height: 40%;
    left: 0%;
    width: 14%;
}

#wrapper[data-config="2"]>.shape:nth-child(2) {
    top: 0%;
    height: 80%;
    left: 14%;
    width: 23%;
}

#wrapper[data-config="2"]>.shape:nth-child(3) {
    top: 30%;
    height: 70%;
    left: 37%;
    width: 23%;
}

#wrapper[data-config="2"]>.shape:nth-child(4) {
    top: 10%;
    height: 90%;
    left: 60%;
    width: 10%;
}

#wrapper[data-config="2"]>.shape:nth-child(5) {
    top: 10%;
    height: 50%;
    left: 70%;
    width: 30%;
}


#wrapper[data-config="3"]>.shape:nth-child(1) {
    top: 40%;
    height: 60%;
}

#wrapper[data-config="3"]>.shape:nth-child(2) {
    top: 30%;
    height: 60%;
}

#wrapper[data-config="3"]>.shape:nth-child(3) {
    top: 20%;
    height: 60%;
}

#wrapper[data-config="3"]>.shape:nth-child(4) {
    top: 10%;
    height: 60%;
}

#wrapper[data-config="3"]>.shape:nth-child(5) {
    top: 0%;
    height: 60%;
}


#wrapper[data-config="4"]>.shape:nth-child(1) {
    top: 0%;
    height: 75%;
    left: 0%;
    width: 30%;
}

#wrapper[data-config="4"]>.shape:nth-child(2) {
    top: 30%;
    height: 70%;
    left: 30%;
    width: 20%;
}

#wrapper[data-config="4"]>.shape:nth-child(3) {
    top: 0%;
    height: 100%;
    left: 50%;
    width: 50%;
}

#wrapper[data-config="4"]>.shape:nth-child(4) {
    top: 50%;
    height: 50%;
    left: 70%;
    width: 30%;
}

#wrapper[data-config="4"]>.shape:nth-child(5) {
    top: 75%;
    height: 25%;
    left: 85%;
    width: 15%;
}


#wrapper[data-config="5"]>.shape:nth-child(1) {
    top: 0%;
    height: 40%;
}

#wrapper[data-config="5"]>.shape:nth-child(2) {
    top: 0%;
    height: 40%;
}

#wrapper[data-config="5"]>.shape:nth-child(3) {
    top: 0%;
    height: 100%;
}

#wrapper[data-config="5"]>.shape:nth-child(4) {
    top: 0%;
    height: 40%;
}

#wrapper[data-config="5"]>.shape:nth-child(5) {
    top: 0%;
    height: 40%;
}


#wrapper[data-config="6"]>.shape:nth-child(1) {
    top: 0%;
    height: 40%;
    left: 0%;
    width: 40%;
}

#wrapper[data-config="6"]>.shape:nth-child(2) {
    top: 40%;
    height: 60%;
    left: 0%;
    width: 40%;
}

#wrapper[data-config="6"]>.shape:nth-child(3) {
    top: 0%;
    height: 100%;
    left: 40%;
    width: 60%;
}

#wrapper[data-config="6"]>.shape:nth-child(4) {
    top: 50%;
    height: 50%;
    left: 70%;
    width: 30%;
}

#wrapper[data-config="6"]>.shape:nth-child(5) {
    top: 75%;
    height: 25%;
    left: 85%;
    width: 15%;
}


#wrapper>.shape:hover {
    background-color: var(--secondary-color);
    color: var(--text-color);
}
</style>