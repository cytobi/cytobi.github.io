<template>
    <div id="morph-fullpage">
        <div id="morph-wrapper">
            <div class="morph-shape" @click="handleClickOnShape(0)">
                <div class="morph-content">
                    BLOG
                    <div class="morph-non-title" v-if="nonTitleVisible">
                        <div class="morph-description">
                            <p>I have a tumblr blog where I occasionally post stuff :)</p>
                            <p>You'll find posts about pretty much anything I like on there: <br />
                                coding, music, movies, video games, astronomy & space stuff, <br />
                                a few memes, observations about life, etc</p>
                        </div>
                        <el-button class="morph-button" @click="goToPage(0)" :icon="Memo">go to blog</el-button>
                    </div>
                </div>
            </div>
            <div class="morph-shape" @click="handleClickOnShape(1)">
                <div class="morph-content">
                    PROJECTS
                    <div class="morph-non-title" v-if="nonTitleVisible">
                        <div class="morph-description">
                            <p>Here you can find some of the projects I have done</p>
                            <p>At the moment this is empty as I haven't put anything here yet,<br />
                                but that will hopefully change in the not too far future</p>
                        </div>
                        <el-button class="morph-button" @click="goToPage(1)" :icon="DataLine">go to projects</el-button>
                    </div>
                </div>
            </div>
            <div class="morph-shape" @click="handleClickOnShape(2)">
                <div class="morph-content">
                    WEBAPPS
                    <div class="morph-non-title" v-if="nonTitleVisible">
                        <div class="morph-description">
                            <p>Here you can find some of the webapps I have made</p>
                            <p>At the moment there is no menu and it redirects directly to the<br />
                                single webapp on here (a test how fast you can move your mouse),<br />
                                but that will hopefully change in the not too far future</p>
                        </div>
                        <el-button class="morph-button" @click="goToPage(2)" :icon="Pointer">go to webapps</el-button>
                    </div>
                </div>
            </div>
            <div class="morph-shape" @click="handleClickOnShape(3)">
                <div class="morph-content">
                    PLACEHOLDER
                    <div class="morph-non-title" v-if="nonTitleVisible">
                        <div class="morph-description">
                            <p>Don't mind me, I'm just a placeholder!</p>
                            <p>¯\_(ツ)_/¯</p>
                        </div>
                        <el-button class="morph-button" @click="goToPage(3)" :icon="Loading">placeholder</el-button>
                    </div>
                </div>
            </div>
            <div class="morph-shape" @click="handleClickOnShape(4)">
                <div class="morph-content">
                    ABOUT ME
                    <div class="morph-non-title" v-if="nonTitleVisible">
                        <div class="morph-description">
                            <p>Hey there,</p>
                            <p>I'm Tobi, known as cytobi on the internet.<br />
                                I'm 20 years old, from Germany, go by he/him pronouns (i don't care), <br />
                                study computer science, like music, sports with boards and video games.</p>
                        </div>
                        <el-button class="morph-button" @click="goToPage(4)" :icon="User">more about me</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { Memo, DataLine, Pointer, User, Loading } from '@element-plus/icons-vue'

const emit = defineEmits(['page'])

var doMorph = true

var nonTitleVisible = ref(false)

var wrapper = document.getElementById("morph-wrapper")

onMounted(() => {
    wrapper = document.getElementById("morph-wrapper")
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
        doMorph = false
        await delay(500) //wait for animation to finish
        nonTitleVisible.value = true
    } else { //if view state go to default state
        wrapper?.setAttribute("data-roundness", "1")
        wrapper?.setAttribute("data-config", "1")
        wrapper?.children[id].setAttribute("data-selected", "false")
        nonTitleVisible.value = false
        await delay(500) //wait for animation to finish
        wrapper?.children[id].setAttribute("data-zindex", "false")
        doMorph = true
    }
}

function goToPage(id: number) {
    emit('page', id)
}
</script>

<style>
#morph-fullpage {
    display: grid;
    place-items: center;
    /* 99vh to avoid scroll bar */
    height: 99vh;
    width: 100vw;
    --morph-color-1: #264653;
    --morph-color-2: #2a9d8f;
    --morph-color-3: #e9c46a;
    --morph-color-4: #f4a261;
    --morph-color-5: #e76f51;
}


#morph-wrapper {
    aspect-ratio: 1.618;
    width: 80vmin;
    position: relative;
}


#morph-wrapper>.morph-shape {
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


#morph-wrapper>.morph-shape:nth-child(1) {
    left: 0%;
    top: 0%;
    background-color: var(--morph-color-1);
}

#morph-wrapper>.morph-shape:nth-child(2) {
    left: 20%;
    top: 10%;
    background-color: var(--morph-color-2);
}

#morph-wrapper>.morph-shape:nth-child(3) {
    left: 40%;
    top: 20%;
    background-color: var(--morph-color-3);
}

#morph-wrapper>.morph-shape:nth-child(4) {
    left: 60%;
    top: 30%;
    background-color: var(--morph-color-4);
}

#morph-wrapper>.morph-shape:nth-child(5) {
    left: 80%;
    top: 40%;
    background-color: var(--morph-color-5);
}


#morph-wrapper>.morph-shape[data-selected="true"] {
    height: 100%;
    width: 100%;
    left: 0%;
    top: 0%;
    color: var(--text-color);
    font-size: 8rem;
}

#morph-wrapper>.morph-shape[data-zindex="true"] {
    z-index: 1;
}


#morph-wrapper[data-roundness="0"]>.morph-shape {
    border-radius: 0;
}

#morph-wrapper[data-roundness="1"]>.morph-shape {
    border-radius: 0;
}

#morph-wrapper[data-roundness="2"]>.morph-shape {
    border-radius: 2rem;
}

#morph-wrapper[data-roundness="3"]>.morph-shape {
    border-radius: 4rem;
}

#morph-wrapper[data-roundness="4"]>.morph-shape {
    border-radius: 8rem;
}


#morph-wrapper[data-roundness="5"]>.morph-shape:nth-child(1) {
    border-bottom-left-radius: 8rem;
}

#morph-wrapper[data-roundness="5"]>.morph-shape:nth-child(2) {
    border-top-right-radius: 8rem;
}

#morph-wrapper[data-roundness="5"]>.morph-shape:nth-child(3) {
    border-radius: 8rem;
}

#morph-wrapper[data-roundness="5"]>.morph-shape:nth-child(4) {
    border-bottom-right-radius: 8rem;
    border-top-left-radius: 8rem;
}

#morph-wrapper[data-roundness="5"]>.morph-shape:nth-child(5) {
    border-top-right-radius: 8rem;
    border-top-left-radius: 8rem;
}


#morph-wrapper[data-roundness="6"]>.morph-shape:nth-child(1) {
    border-bottom-left-radius: 4rem;
    border-top-right-radius: 4rem;
}

#morph-wrapper[data-roundness="6"]>.morph-shape:nth-child(2) {
    border-bottom-left-radius: 8rem;
}

#morph-wrapper[data-roundness="6"]>.morph-shape:nth-child(3) {
    border-top-right-radius: 4rem;
}

#morph-wrapper[data-roundness="6"]>.morph-shape:nth-child(4) {
    border-top-left-radius: 16rem;
}

#morph-wrapper[data-roundness="6"]>.morph-shape:nth-child(5) {
    border-top-left-radius: 8rem;
}


#morph-wrapper[data-config="0"]>.morph-shape {
    top: 0;
    height: 100%;
    left: 0;
    width: 100%;
}

#morph-wrapper[data-config="1"]>.morph-shape:nth-child(1) {
    top: 0%;
    height: 60%;
}

#morph-wrapper[data-config="1"]>.morph-shape:nth-child(2) {
    top: 10%;
    height: 60%;
}

#morph-wrapper[data-config="1"]>.morph-shape:nth-child(3) {
    top: 20%;
    height: 60%;
}

#morph-wrapper[data-config="1"]>.morph-shape:nth-child(4) {
    top: 30%;
    height: 60%;
}

#morph-wrapper[data-config="1"]>.morph-shape:nth-child(5) {
    top: 40%;
    height: 60%;
}


#morph-wrapper[data-config="2"]>.morph-shape:nth-child(1) {
    top: 0%;
    height: 40%;
    left: 0%;
    width: 14%;
}

#morph-wrapper[data-config="2"]>.morph-shape:nth-child(2) {
    top: 0%;
    height: 80%;
    left: 14%;
    width: 23%;
}

#morph-wrapper[data-config="2"]>.morph-shape:nth-child(3) {
    top: 30%;
    height: 70%;
    left: 37%;
    width: 23%;
}

#morph-wrapper[data-config="2"]>.morph-shape:nth-child(4) {
    top: 10%;
    height: 90%;
    left: 60%;
    width: 10%;
}

#morph-wrapper[data-config="2"]>.morph-shape:nth-child(5) {
    top: 10%;
    height: 50%;
    left: 70%;
    width: 30%;
}


#morph-wrapper[data-config="3"]>.morph-shape:nth-child(1) {
    top: 40%;
    height: 60%;
}

#morph-wrapper[data-config="3"]>.morph-shape:nth-child(2) {
    top: 30%;
    height: 60%;
}

#morph-wrapper[data-config="3"]>.morph-shape:nth-child(3) {
    top: 20%;
    height: 60%;
}

#morph-wrapper[data-config="3"]>.morph-shape:nth-child(4) {
    top: 10%;
    height: 60%;
}

#morph-wrapper[data-config="3"]>.morph-shape:nth-child(5) {
    top: 0%;
    height: 60%;
}


#morph-wrapper[data-config="4"]>.morph-shape:nth-child(1) {
    top: 0%;
    height: 75%;
    left: 0%;
    width: 30%;
}

#morph-wrapper[data-config="4"]>.morph-shape:nth-child(2) {
    top: 30%;
    height: 70%;
    left: 30%;
    width: 20%;
}

#morph-wrapper[data-config="4"]>.morph-shape:nth-child(3) {
    top: 0%;
    height: 100%;
    left: 50%;
    width: 50%;
}

#morph-wrapper[data-config="4"]>.morph-shape:nth-child(4) {
    top: 50%;
    height: 50%;
    left: 70%;
    width: 30%;
}

#morph-wrapper[data-config="4"]>.morph-shape:nth-child(5) {
    top: 75%;
    height: 25%;
    left: 85%;
    width: 15%;
}


#morph-wrapper[data-config="5"]>.morph-shape:nth-child(1) {
    top: 0%;
    height: 40%;
}

#morph-wrapper[data-config="5"]>.morph-shape:nth-child(2) {
    top: 0%;
    height: 40%;
}

#morph-wrapper[data-config="5"]>.morph-shape:nth-child(3) {
    top: 0%;
    height: 100%;
}

#morph-wrapper[data-config="5"]>.morph-shape:nth-child(4) {
    top: 0%;
    height: 40%;
}

#morph-wrapper[data-config="5"]>.morph-shape:nth-child(5) {
    top: 0%;
    height: 40%;
}


#morph-wrapper[data-config="6"]>.morph-shape:nth-child(1) {
    top: 0%;
    height: 40%;
    left: 0%;
    width: 40%;
}

#morph-wrapper[data-config="6"]>.morph-shape:nth-child(2) {
    top: 40%;
    height: 60%;
    left: 0%;
    width: 40%;
}

#morph-wrapper[data-config="6"]>.morph-shape:nth-child(3) {
    top: 0%;
    height: 100%;
    left: 40%;
    width: 60%;
}

#morph-wrapper[data-config="6"]>.morph-shape:nth-child(4) {
    top: 50%;
    height: 50%;
    left: 70%;
    width: 30%;
}

#morph-wrapper[data-config="6"]>.morph-shape:nth-child(5) {
    top: 75%;
    height: 25%;
    left: 85%;
    width: 15%;
}


#morph-wrapper>.morph-shape:hover {
    color: var(--text-color);
}

.morph-content {
    padding-left: 1rem;
    height: 100%;
    width: 100%;
    position: relative;
}

.morph-button {
    position: absolute;
    bottom: 4rem;
    right: 8rem;
    scale: 200%;
}

#morph-wrapper>.morph-shape:nth-child(1)>.morph-content>.morph-non-title>.morph-button {
    background-color: var(--morph-color-1);
    color: var(--text-color);
    border-color: var(--text-color);
}

#morph-wrapper>.morph-shape:nth-child(1)>.morph-content>.morph-non-title>.morph-button:hover {
    border-color: var(--bg-color);
}

#morph-wrapper>.morph-shape:nth-child(1)>.morph-content>.morph-non-title>.morph-description {
    color: var(--text-color);
}


#morph-wrapper>.morph-shape:nth-child(2)>.morph-content>.morph-non-title>.morph-button {
    background-color: var(--morph-color-2);
    color: var(--text-color);
    border-color: var(--text-color);
}

#morph-wrapper>.morph-shape:nth-child(2)>.morph-content>.morph-non-title>.morph-button:hover {
    border-color: var(--bg-color);
}

#morph-wrapper>.morph-shape:nth-child(2)>.morph-content>.morph-non-title>.morph-description {
    color: var(--text-color);
}


#morph-wrapper>.morph-shape:nth-child(3)>.morph-content>.morph-non-title>.morph-button {
    background-color: var(--morph-color-3);
    color: var(--bg-color);
    border-color: var(--bg-color);
}

#morph-wrapper>.morph-shape:nth-child(3)>.morph-content>.morph-non-title>.morph-button:hover {
    border-color: var(--text-color);
}

#morph-wrapper>.morph-shape:nth-child(3)>.morph-content>.morph-non-title>.morph-description {
    color: var(--bg-color);
}


#morph-wrapper>.morph-shape:nth-child(4)>.morph-content>.morph-non-title>.morph-button {
    background-color: var(--morph-color-4);
    color: var(--bg-color);
    border-color: var(--bg-color);
}

#morph-wrapper>.morph-shape:nth-child(4)>.morph-content>.morph-non-title>.morph-button:hover {
    border-color: var(--text-color);
}

#morph-wrapper>.morph-shape:nth-child(4)>.morph-content>.morph-non-title>.morph-description {
    color: var(--bg-color);
}


#morph-wrapper>.morph-shape:nth-child(5)>.morph-content>.morph-non-title>.morph-button {
    background-color: var(--morph-color-5);
    color: var(--text-color);
    border-color: var(--text-color);
}

#morph-wrapper>.morph-shape:nth-child(5)>.morph-content>.morph-non-title>.morph-button:hover {
    border-color: var(--bg-color);
}

#morph-wrapper>.morph-shape:nth-child(5)>.morph-content>.morph-non-title>.morph-description {
    color: var(--text-color);
}


.morph-description {
    font-size: 1.5rem;
    font-weight: normal;
    position: relative;
    top: -0.5rem;
}
</style>