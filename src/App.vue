<template>
    <div id="app">

        <VcASuggestyUserBox userId="a1f198b5-09f0-4271-b3b3-89e4a0e655e7" v-if=false></VcASuggestyUserBox>

        <VcASuggestyLineupBox userId="a1f198b5-09f0-4271-b3b3-89e4a0e655e7" actionId="458" v-else></VcASuggestyLineupBox>
        <!--

                        <VcASuggestyActionBox actionId="458" v-else></VcASuggestyActionBox>
-->

      </div>
  </template>

  <script>
  import VcAArtistBox from './components/VcAArtistBox.vue'
  import VcaRecommendationBox from './components/VcARecommendationBox'
  import VcASuggestyUserBox from './components/VcASuggestyUserBox'
  import VcASuggestyActionBox from './components/VcASuggestyActionBox'
  import VcASuggestyLineupBox from './components/VcASuggestyLineupBox'

  export default {
    name: 'app',
    components: {
      VcASuggestyActionBox,
      VcaRecommendationBox, VcAArtistBox, VcASuggestyUserBox, VcASuggestyUserBox,VcASuggestyLineupBox
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
