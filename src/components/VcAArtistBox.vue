<template>
<div @click="clickedButton(artistId, action, artistName)">
            <div :class="artistId" class="col s6 m4 l3 xl2" >
                <div class="card">
                    <div class="overlayAction" >
                        <a>
                            <i class="material-icons"  ref="myButton" >{{actionIcon}}</i>
                        </a>
                        <a class="card-title-outer">
                            <span class="card-title">{{ artistName }}</span>
                        </a>


                    </div>
                    <div class="card-image">
                        <img :src="artistPicture">

                    </div>

                </div>
    </div>
</div>

</template>

<script>
export default {
  name: 'VcAArtistBox',
  props: ['artistId', 'artistName', 'artistPicture', 'action', 'actionIcon', 'artistCategory'],
  data() {
    return {
      componentKey: 0
    }
  },
  mounted: function () {
    //console.log(this.artistCategory);

  },

  methods: {
    clickedButton: function(artistId,action, artistName) {
     // console.log(this.artistCategory);
      if(action == "add"){
            this.$parent.getRelatedArtists(artistId, artistName, this.artistCategory);
      }
      if(action == "remove"){
        this.$parent.removeFavoriteArtist(artistId, artistName, this.artistCategory);
      }
    },
  }
}



</script>

<style scoped>


</style>
