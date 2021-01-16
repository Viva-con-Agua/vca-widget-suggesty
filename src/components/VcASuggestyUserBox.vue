<template>
    <div>

        <VcARecommendationBox heading="Favorisierte Künstler" vcaType="USER" :vcaId=userId vcaId2="" :isEmbedded="false"></VcARecommendationBox>
    </div>
</template>

<script>
import VcARecommendationBox from "./VcARecommendationBox";
import VcAArtistBox from "./VcAArtistBox";

export default {
  name: 'VcASuggestyUserBox',
  components: {
    VcARecommendationBox,VcAArtistBox
  },
  props: ['userId'],
  mounted: function () {
  },
}

</script>


<style scoped>
</style>
