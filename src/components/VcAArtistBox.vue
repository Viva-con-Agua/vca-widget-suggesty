<template>

            <div :class="artistId" class="col s12 m6 l3">
                <div class="card">
                    <div class="overlayAction">
                        <a>
                            <i class="material-icons"  ref="myButton" @click="clickedButton(artistId, action)">{{actionIcon}}</i>
                        </a>


                    </div>
                    <div class="card-image">
                        <img :src="artistPicture">
                        <span class="card-title">{{ artistName }}</span>
                    </div>

                </div>
    </div>

</template>

<script>
export default {
  name: 'VcAArtistBox',
  props: ['artistId', 'artistName', 'artistPicture', 'action', 'actionIcon'],
  data() {
    return {
      componentKey: 0
    }
  },
  mounted: function () {

  },

  methods: {
    clickedButton: function(artistId,action) {
      if(action == "add"){
            this.$parent.getRelatedArtists(artistId);
      }
      if(action == "remove"){
        this.$parent.removeFavoriteArtist(artistId);
      }
    },
  }
}



</script>

<style scoped>


</style>
