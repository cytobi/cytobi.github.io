<template>
    <div class="tmwtcalc">
        <p>A prediciton calculator for TMWT23</p>
        <div class="tmwtcalc-team-block">
            <p>Specify teams:</p>
            <el-input class="tmwtcalc-team-input" v-model="teams[0]" placeholder="Please input" />
            <el-input class="tmwtcalc-team-input" v-model="teams[1]" placeholder="Please input" />
            <el-input class="tmwtcalc-team-input" v-model="teams[2]" placeholder="Please input" />
            <el-input class="tmwtcalc-team-input" v-model="teams[3]" placeholder="Please input" />
            <el-input class="tmwtcalc-team-input" v-model="teams[4]" placeholder="Please input" />
            <el-input class="tmwtcalc-team-input" v-model="teams[5]" placeholder="Please input" />
            <el-input class="tmwtcalc-team-input" v-model="teams[6]" placeholder="Please input" />
            <el-input class="tmwtcalc-team-input" v-model="teams[7]" placeholder="Please input" />
        </div>
        <div class="tmwtcalc-gamecount-block">
            <p>Specify number of played game days: </p>
            <el-input-number v-model="playedDays" :min="1" :max="6" @change="updatePlayedDays()" />
        </div>
        <div class="tmwtcalc-game-block">
            <p>Specify played games:</p>
            <div class="tmwtcalc-game" v-for="game in gameData">
                <el-input class="tmwtcalc-game-team-input" v-model="game.team1" placeholder="Please input" />
                <el-input-number class="tmwtcalc-game-score-input" v-model="game.score1" :min="0" :max="4" />
                <el-input-number class="tmwtcalc-game-score-input" v-model="game.score2" :min="0" :max="4" />
                <el-input class="tmwtcalc-game-team-input" v-model="game.team2" placeholder="Please input" />
            </div>
        </div>
        <el-button type="primary" @click="calculate()">Calculate</el-button>
        <div class="tmwtcalc-score-block">
            <p>Current scores:</p>
            <div v-for="score in scores">
                {{ score.team }}: {{ score.gamesWon }}-{{ score.gamesLost }} ({{ score.mapsWon }}-{{ score.mapsLost }})
            </div>
        </div>
        <div class="tmwtcalc-result-block">
            <p>Result:</p>
            <p>{{ teams [0] }}: {{ points[0] }}points</p>
            <p>{{ teams [1] }}: {{ points[1] }}points</p>
            <p>{{ teams [2] }}: {{ points[2] }}points</p>
            <p>{{ teams [3] }}: {{ points[3] }}points</p>
            <p>{{ teams [4] }}: {{ points[4] }}points</p>
            <p>{{ teams [5] }}: {{ points[5] }}points</p>
            <p>{{ teams [6] }}: {{ points[6] }}points</p>
            <p>{{ teams [7] }}: {{ points[7] }}points</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const playedDays = ref(1)
const teams = ref([""])
const gameData = ref([{
    team1: "",
    team2: "",
    score1: 0,
    score2: 0
}])
const scores = ref([{ team: "", gamesWon: 0, gamesLost: 0, mapsWon: 0, mapsLost: 0 }])
const points = ref([0])

const updatePlayedDays = () => {
    gameData.value = []
    for (let i = 0; i < playedDays.value * 4; i++) {
        if (gameData.value[i] === undefined) {
            gameData.value[i] = {
                team1: "",
                team2: "",
                score1: 0,
                score2: 0
            }
        }
    }
}

onMounted(() => {
    updatePlayedDays()
})

const calculate = () => {
    calculateScores()
    sortScores()
    calculatePoints()
}

const calculateScores = () => {
    //assign teams to scores
    for (let i = 0; i < teams.value.length; i++) {
        scores.value[i] = {
            team: teams.value[i],
            gamesWon: 0,
            gamesLost: 0,
            mapsWon: 0,
            mapsLost: 0
        }
    }
    //calculate scores
    for (let i = 0; i < gameData.value.length; i++) {
        const game = gameData.value[i]
        const team1 = scores.value.find(x => x.team === game.team1)
        const team2 = scores.value.find(x => x.team === game.team2)
        if (team1 === undefined || team2 === undefined) {
            alert("Please specify all teams and games!")
            return
        }
        if (game.score1 > game.score2) {
            team1.gamesWon++
            team2.gamesLost++
            team1.mapsWon += game.score1
            team1.mapsLost += game.score2
            team2.mapsWon += game.score2
            team2.mapsLost += game.score1
        } else {
            team1.gamesLost++
            team2.gamesWon++
            team1.mapsWon += game.score1
            team1.mapsLost += game.score2
            team2.mapsWon += game.score2
            team2.mapsLost += game.score1
        }
    }
}

const sortScores = () => {
    //sort scores
    scores.value.sort((a, b) => {
        if (a.gamesWon > b.gamesWon) {
            return -1
        } else if (a.gamesWon < b.gamesWon) {
            return 1
        } else {
            if (a.mapsWon > b.mapsWon) {
                return -1
            } else if (a.mapsWon < b.mapsWon) {
                return 1
            } else {
                return 0
            }
        }
    })
}

const calculatePoints = () => {
    //zero everything
    points.value = []
    for (let i = 0; i < teams.value.length; i++) {
        points.value[i] = 0
    }

    /*implement breadth-first search here instead of this mess:
    1. find first place
    2. calculate points for first place
    3. start loop
    4. find direct opponents of teams with points so far
    5. calculate points for direct opponents (if they have no points yet)
    6. end loop

    then modify to integrate the rule of preferring non-sweeps

    alternative idea: always give team the most amount of points they could possibly have (modify step 5 for this)
    */

    //find first place
    const firstPlace = scores.value[0].team
    const firstPlaceIndex = teams.value.indexOf(firstPlace)

    //calculate points for first place
    points.value[firstPlaceIndex] = playedDays.value * 10

    //find direct opponents of first place
    const firstPlaceOpponents = [{ opponent: "", deficit: 0 }]
    for (let i = 0; i < gameData.value.length; i++) {
        const game = gameData.value[i]
        if (game.team1 === firstPlace) {
            firstPlaceOpponents.push({ opponent: game.team2, deficit: game.score1 - game.score2 })
        } else if (game.team2 === firstPlace) {
            firstPlaceOpponents.push({ opponent: game.team1, deficit: game.score2 - game.score1 })
        }
    }

    //calculate points for opponents of first place
    for (let i = 0; i < firstPlaceOpponents.length; i++) {
        const opponent = firstPlaceOpponents[i]
        const opponentIndex = teams.value.indexOf(opponent.opponent)
        points.value[opponentIndex] = points.value[firstPlaceIndex] - pointsFromDeficit(opponent.deficit)
    }
}

const pointsFromDeficit = (deficit: number) => {
    if (deficit < 4) return deficit;
    else return 5;
}

</script>

<style>
.tmwtcalc {
    margin: 2rem;
    padding: 1rem;
}

.tmwtcalc-team-block {
    padding-bottom: 1rem;
}

.tmwtcalc-game-block {
    padding-bottom: 1rem;
}

.tmwtcalc-gamecount-block {
    padding-bottom: 1rem;
}

.tmwtcalc-team-input {
    width: 50%;
    padding-right: 5px;
    padding-bottom: 5px;
}

.tmwtcalc-game {
    padding-bottom: 5px;
}

.tmwtcalc-game-team-input {
    width: 40%;
}

.tmwtcalc-game-score-input {
    width: 10%;
}
</style>