<template>
    <div id="app">
        <VcaRecommendationBox vcaType="USER" vcaId="999" vcaId2="" :isEmbedded="false">
            VcA information box
            <VcAArtistBox></VcAArtistBox>
        </VcaRecommendationBox>
    </div>
</template>

<script>
import VcAArtistBox from './components/VcAArtistBox.vue'
import VcaRecommendationBox from './components/VcARecommendationBox'


export default {
  name: 'app',
  components: {
    VcaRecommendationBox, VcAArtistBox
  }
}
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    @import 'https://fonts.googleapis.com/icon?family=Material+Icons';
</style>
