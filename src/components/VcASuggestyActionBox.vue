<template>
    <div>

        <VcARecommendationBox heading="Lineup" vcaType="ACTION" :vcaId=actionId vcaId2="" :isEmbedded="false"></VcARecommendationBox>
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
