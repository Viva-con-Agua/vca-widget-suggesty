<template>
    <div style="width: 100% !important;">


        <h2 ref="heading" v-if="isEmbedded != true">heading</h2>

        <div class="main">

            <ul id="tabs-swipe-demo" class="tabs" v-if="isEmbedded != true">
                <li class="tab col s3">
                    <a class="active" href="#artist-swipe-1" ref="firstTab">first Tab</a>
                </li>
                <li class="tab col s3">
                    <a href="#artist-swipe-2" ref="secondTab">second Tab</a>
                </li>

            </ul>

            <div id="artist-swipe-1" class="col s12">
                <div class="col s12 m12" v-if="isEmbedded != true">
                    <h4 style="display:none !important;">Künstler suchen </h4>
                </div>
                <div class="row">
                    <div class="input-field col s12" v-if="isEmbedded != true">

                        <input ref="artistNameSpotify" value="Rammstein" id="artistName" type="text" class="validate">
                        <label class="active" for="artistName" style="display:none !important;">Artist</label>

                    </div>
                    <div class="input-field col s12" v-if="isEmbedded != true">

                        <a id="searchArtistButton" class="waves-effect waves-light btn-large" ref="searchArtistButton"
                           @click="searchArtistSpotify()">
                            <i class="material-icons left">search</i>
                            Suchen
                        </a>

                    </div>
                </div>
                <div class="row" id="artistResultsRow">
                    <VcAArtistBox v-for="artist in artists" :artistId="artist.artistId" :artistName="artist.artistName"
                                  :artistPicture="artist.artistPicture" :action="artist.action" :actionIcon="artist.actionIcon" v-on:click="say('hi')">
                    </VcAArtistBox>
                </div>
            </div>

            <div id="artist-swipe-2" class="col s12" v-if="isEmbedded != true">
                <div class="row">
                    <div class="col s12 m12">
                        <h4 style="display:none !important;">{{heading}}</h4>
                    </div>
                    <div id="favoriteArtistsRow">
                        <div class="row">
                            <VcAArtistBox v-for="artist in favorites" :artistId="artist.artistId"
                                          :artistName="artist.artistName" :artistPicture="artist.artistPicture"
                                          :action="artist.action" :actionIcon="artist.actionIcon" v-on:click="say('hi')">
                            </VcAArtistBox>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
  import M from 'materialize-css'
  import '../assets/materialize.min.css'
  import VcAArtistBox from "./VcAArtistBox";
  import {ajaxx} from './externalJs';


  export default {
    name: 'VcaRecommendationBox',
    components: {VcAArtistBox},
    props: {
      heading: String,
      vcaId: String,
      vcaId2: String,
      vcaType: String,
      isEmbedded: Boolean
    },
    data() {
      return {
        artists: [],
        favorites: []
      }
    },
    mounted: function () {




      if(!this.isEmbedded){
        this.$refs.heading.textContent = this.heading;
       // this.$refs.heading.textContent = "Favorisierte Künstler";
        this.$refs.firstTab.innerHTML = "Artisten suchen";
        this.$refs.secondTab.innerHTML = "Artisten bearbeiten";
      }

      if(this.vcaType == "LINEUP"){
        this.searchArtistSpotify2();
      }
      this.getFavoriteArtists();
    },
    methods: {

      addArtistSpotify: function (artistId, artistName, artistPicture, action, actionIcon, array) {

        var newArtist = {
          "artistId": artistId,
          "artistPicture": artistPicture,
          "artistName": artistName,
          "action": action,
          "actionIcon": actionIcon
        };
        var exists = false;
        for (var i = 0; i < array.length; i++) {
          if (newArtist.artistId == array[i].artistId) {
            exists = true;
          }
        }
        if (!exists) {
          array.push(newArtist);
        }
      },

      removeArtistSpotify: function (artistId, array) {
        var index = -1
        for (var i = 0; i < array.length; i++) {
          if (artistId == array[i].artistId) {
            index = i;
          }
        }
        if (index >= 0) {
          array.splice(index, 1)
        }
      },

      refreshArtistSpotify: function (){
        for(var i = 0; i < this.artists.length; i++){
          this.artists[i].action = "add";
          this.artists[i].actionIcon = "favorite_border";
        }


        for(var i = 0; i < this.artists.length; i++){
          for(var j = 0; j < this.favorites.length; j++){
            if(this.artists[i].artistId == this.favorites[j].artistId){
              this.artists[i].action = "remove";
              this.artists[i].actionIcon = "favorite";
              for(var x = 0; x < this.$children.length; x++){
              }
              this.$forceUpdate();

            }
          }
        }
        //for(var i = 0; i < artist)
      },

      searchArtistSpotify2: function() {
        var request;
        if(this.vcaType == "LINEUP"){
          request = "http://localhost:8005/v1/events/user/" + this.vcaId + "/" + "ACTION";
        }


        ajaxx('GET', request, {}).then(function (events) {

          for (var i = 0; i < events.artists.length; i++) {

            var artistId = events.artists[i].id;
            var artistName = events.artists[i].name;
            var artistPicture;


            if (events.artists[i].images[1] == null) {
              artistPicture = null;
            } else {
              artistPicture = events.artists[i].images[1].url;
            }
            this.addArtistSpotify(artistId, artistName, artistPicture, "add", "favorite_border", this.artists);
          }
          this.refreshArtistSpotify();
        }.bind(this));
      },

      searchArtistSpotify: function () {
        var artistInputName = this.$refs.artistNameSpotify.value;
        ajaxx('GET', 'http://localhost:5001/suggesty/api/v1/spotify/name/' + artistInputName, {}).then(function (events) {
          this.artists = [];
          for (var i = 0; i < events.data.length; i++) {
            var artistId2 = events.data[i].artistId;
            var artistName2 = events.data[i].artistName;
            var artistImage2 = events.data[i].artistImage;

            this.addArtistSpotify(artistId2, artistName2, artistImage2, "add", "favorite_border", this.artists);
          }
          this.getFavoriteArtists();

        }.bind(this))
      },

      getRelatedArtists: function (artistId) {
        var vcaArtist = {
          "vcaId": this.vcaId,
          "artistId": artistId,
          "vcaType": this.vcaType
        }


        if(this.vcaType == "LINEUP"){
          vcaArtist.vcaId = this.vcaId2;
          vcaArtist.vcaType = "USER";
        }

        var request = 'http://localhost:5001/suggesty/api/v1/vca/';

        ajaxx('POST', request, vcaArtist).then(function (events) {
          if (events) {
            this.getFavoriteArtists();
          }
        }.bind(this));




        if (this.vcaType == "USER") {
          ajaxx('GET', 'http://localhost:5001/suggesty/api/v1/spotify/similar/id/' + artistId, {}).then(function (events) {



            for (var i = 0; i < events.data.length; i++) {

              var artistId2 = events.data[i].artistId;
              var artistName2 = events.data[i].artistName;
              var artistImage2 = events.data[i].artistImage;

              this.addArtistSpotify(artistId2, artistName2, artistImage2, "add", "favorite_border", this.artists);
            }

          }.bind(this));
        }
      },

      getFavoriteArtists: function () {
        this.favorites = [];

        var request = "http://localhost:5001/suggesty/api/v1/spotify/artist/" + this.vcaType + "/" + this.vcaId;

        if(this.vcaType == "LINEUP"){
        //  request = "http://localhost:8005/v1/events/user/" + this.vcaId2 + "/" + "USER";
        }

        ajaxx('GET', request, {}).then(function (events) {
          for (var i = 0; i < events.data.length; i++) {

            var artistId = events.data[i].artistId;
            var artistName = events.data[i].artistName;
            var artistImage = events.data[i].artistImage;

            this.addArtistSpotify(artistId, artistName, artistImage, "remove", "favorite", this.favorites);
          }
          this.refreshArtistSpotify();
        }.bind(this));
      },

      removeFavoriteArtist: function (artistId) {
        var vcaArtist = {
          "vcaId": this.vcaId,
          "artistId": artistId,
          "vcaType": this.vcaType
        }


        var request = 'http://localhost:5001/suggesty/api/v1/vca/';

        ajaxx('DELETE', request, vcaArtist).then(function (events) {
          if (events) {
            this.removeArtistSpotify(vcaArtist.artistId, this.favorites);
            this.refreshArtistSpotify();
          }
        }.bind(this));
      }
    }
  }


  window.onload = function () {
    var elem = document.querySelector('.tabs')
    var options = {}
    var instance = M.Tabs.init(elem, options)
  }

</script>

<style>

    .tabs-swipe-demo{
        padding-bottom:20px !important;
    }

    span.card-title {
        text-shadow: 0px 1px 1px #616161
    }

    .col.s12 {
        padding: 0px !important;
    }

    .card {
        margin: 0 !important;
    }

    @media (max-width: 600px) {
        .card-image img {
            width: 100vw;
            height: 100vw;
            object-fit: cover;
        }
    }

    @media (min-width: 600px) and (max-width: 992px) {
        .card-image img {
            width: 50vw;
            height: 50vw;
            object-fit: cover;
        }
    }

    @media (min-width: 992px) {
        .card-image img {
            width: 25vw;
            height: 25vw;
            object-fit: cover;
        }
    }

    .col .row {
        margin-left: 0px !important;
        margin-right: 0px !important;
    }

    .overlayAction {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 50;
        background: none !important;
        opacity: 1;

        display: flex;
        /*align-items: center;*/
        /*justify-content: center;*/
        cursor: pointer;
        transition: .5s ease;
    }

    .overlayAction:hover {
        background: rgba(0, 0, 0, 0.5) !important;
        opacity: 1;
    }
    .card-title{
        z-index: 999 !important;
    }
    .overlayAction .material-icons{
        padding: 24px !important;
    }


.overlayAction .material-icons {
    color: white !important;
    font-size: 50px !important;
}

.input-field col s1 {
    padding: 0px !important;
}

#a.row .col {
    padding: 0px !important;
}

</style>
