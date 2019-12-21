<template>
    <p>

        <slot>

        </slot>
    </p>
</template>

<script>


  export default {
    name: 'VcALineupBox',
    props: ['artistId'],
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
      }
    }
  }


</script>

<style scoped>



</style>
