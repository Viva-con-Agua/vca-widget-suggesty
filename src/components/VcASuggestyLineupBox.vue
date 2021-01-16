<template>
    <div>

        <VcARecommendationBox heading="Lineup" vcaType="LINEUP" :vcaId=actionId :vcaId2=userId :isEmbedded="true"></VcARecommendationBox>
    </div>
</template>

<script>
import VcARecommendationBox from "./VcARecommendationBox";
import VcAArtistBox from "./VcAArtistBox";

export default {
  name: 'VcASuggestyLineupBox',
  components: {
    VcARecommendationBox,VcAArtistBox
  },
  props: ['actionId','userId'],
  mounted: function () {
  },
}

</script>


<style scoped>
</style>
