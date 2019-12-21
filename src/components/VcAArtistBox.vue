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
    console.log("mount " + this.artistName + " action " + this.action);
    //this.artistName = "LUL";
    this.$nextTick(function () {
      if(this.action == "add"){
        //console.log ("Button wechsel von add to favorite border")
        //this.actionIcon = "favorite_border";


      }
      if(this.action == "remove"){
        //this.actionIcon = "favorite";


      }
      //console.log("action icon meusste sein: " + this.actionIcon);
      //console.log(this);
      //this.$forceUpdate();
    })
  },

  methods: {

    clickedButton: function(artistId,action) {
      //console.log(this);
      console.log(action);
      if(action == "add"){
            this.$parent.getRelatedArtists(artistId);
      }
      if(action == "remove"){
        this.$parent.removeFavoriteArtist(artistId);
      }
    },
    changeButton() {
      /*
      if(this.action == "add"){
        this.actionIcon = "add"
        console.log("von action add to add action icon")
      }
      if(this.action == "remove"){
        this.actionIcon = "remove"
        console.log("von action add to add action icon")
      }
      this.$forceUpdate();
      */
    }
  }
}



</script>

<style scoped>

    #testi{
        content:'remove';
    }

    .recBox {
        background-color: red;
        border: 1px dashed rgba(165, 119, 64, 1);
        -webkit-border-radius: 0.3em;
        -moz-border-radius: 0.3em;
        border-radius: 0.3em;
        padding: 0.5em;
    }

    .card-image img {

        /*width: 100%;
        height: 0;
        padding: 50% 0;
        background-size: 100% 100%;
        background-clip: border-box;
        box-sizing:border-box;
        */
    }

</style>
