<template>
    <div>
        <div>Box bezieht sich auf ActionId {{actionId}}</div>
        <VcARecommendationBox heading="Hinterlegte Artisten einer Aktion" vcaType="ACTION" :vcaId=actionId vcaId2="" :isEmbedded="false"></VcARecommendationBox>
    </div>
</template>

<script>
import VcARecommendationBox from "./VcARecommendationBox";
import VcAArtistBox from "./VcAArtistBox";

export default {
  name: 'VcASuggestyActionBox',
  components: {
    VcARecommendationBox,VcAArtistBox
  },
  props: ['actionId'],
  mounted: function () {
  },
}

</script>


<style scoped>
</style>
