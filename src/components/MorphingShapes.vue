<template>
    <div id="fullpage">
        <div id="wrapper">
            <div class="shape" @click="handleClickOnShape(0)">
                <div class="content">
                    BLOG
                    <div class="buttonwrapper">
                        <el-button class="button" @click="goToPage(0)">go to blog</el-button>
                    </div>
                </div>
            </div>
            <div class="shape" @click="handleClickOnShape(1)">
                <div class="content">
                    PROJECTS
                    <div class="buttonwrapper">
                        <el-button class="button" @click="goToPage(1)">go to projects</el-button>
                    </div>
                </div>
            </div>
            <div class="shape" @click="handleClickOnShape(2)">
                <div class="content">
                    WEBAPPS
                    <div class="buttonwrapper">
                        <el-button class="button" @click="goToPage(2)">go to webapps</el-button>
                    </div>
                </div>
            </div>
            <div class="shape" @click="handleClickOnShape(3)">
                <div class="content">
                    PLACEHOLDER
                    <div class="buttonwrapper">
                        <el-button class="button" @click="goToPage(3)">placeholder</el-button>
                    </div>
                </div>
            </div>
            <div class="shape" @click="handleClickOnShape(4)">
                <div class="content">
                    ABOUT ME
                    <div class="buttonwrapper">
                        <el-button class="button" @click="goToPage(4)">more about me</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const emit = defineEmits(['page'])

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
    if (doMorph) { //if morphing go to view state
        wrapper?.setAttribute("data-roundness", "0")
        wrapper?.setAttribute("data-config", "0")
        wrapper?.children[id].setAttribute("data-selected", "true")
        wrapper?.children[id].setAttribute("data-zindex", "true")
    } else { //if view state go to default state
        wrapper?.setAttribute("data-roundness", "1")
        wrapper?.setAttribute("data-config", "1")
        wrapper?.children[id].setAttribute("data-selected", "false")
        await delay(500) //wait for animation to finish
        wrapper?.children[id].setAttribute("data-zindex", "false")
    }
    doMorph = !doMorph //toggle morphing state
}

function goToPage(id: number) {
    emit('page', id)
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
    transition: left, top, height, width, border-radius, background-color, color, font-size;
    transition-duration: 500ms;
    transition-timing-function: ease-in-out;
    color: rgba(255, 255, 255, 0);
    font-size: 20rem;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
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


#wrapper>.shape[data-selected="true"] {
    height: 100%;
    width: 100%;
    left: 0%;
    top: 0%;
    color: var(--text-color);
    font-size: 8rem;
}

#wrapper>.shape[data-zindex="true"] {
    z-index: 1;
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
    top: 0;
    height: 100%;
    left: 0;
    width: 100%;
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
    color: var(--text-color);
}

.content {
    padding-left: 1rem;
    height: 100%;
    width: 100%;
    position: relative;
}

.buttonwrapper {
    position: relative;
    top: -8rem;
    width: 100%;
    height: 100%;
}

.button {
    position: absolute;
    bottom: 4rem;
    right: 4rem;
}
</style>