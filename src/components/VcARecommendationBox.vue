<template>
    <div style="width: 100% !important;">


        <h2 ref="heading" v-if="isEmbedded != true">heading</h2>
        <div id="test"></div>

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
                        <h4 style="display:none !important;">Favorisierte Künstler </h4>
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
            <!--:key="artistId"-->
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
        this.$refs.heading.textContent = "Favorisierte Künstler";
        this.$refs.firstTab.innerHTML = "Artisten suchen";
        this.$refs.secondTab.innerHTML = "Favoriten bearbeiten";
      }

      console.log("mounted");
      if(this.vcaType == "LINEUP"){
        this.searchArtistSpotify2();
      }
      this.getFavoriteArtists();
    },
    methods: {

      addArtistSpotify: function (artistId, artistName, artistPicture, action, actionIcon, array) {
        if (artistPicture == null) {
          artistPicture = 'https://www.clipartwiki.com/clipimg/detail/216-2166432_person-icon-png-transparent-unknown-person-icon-png.png';
        }
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
              this.artists[i].artistName = "vorhanden";

              console.log(this);
              console.log(this.artists[i].action);
              for(var x = 0; x < this.$children.length; x++){
                console.log(this.$children[x].action);

               // this.$children[x].changeButton();
              }
              this.$forceUpdate();

              console.log("MATCH " + this.artists[i].artistName);
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
        var artistName = this.$refs.artistNameSpotify.value;
        ajaxx('GET', 'http://localhost:8005/v1/events/artist/' + artistName, {}).then(function (events) {
          this.artists = [];
          for (var i = 0; i < events.artists.items.length; i++) {

            var artistId = events.artists.items[i].id
            var artistName = events.artists.items[i].name
            var artistPicture
            if (events.artists.items[i].images[1] == null) {
              artistPicture = null;
            } else {
              artistPicture = events.artists.items[i].images[1].url
            }
            this.addArtistSpotify(artistId, artistName, artistPicture, "add", "favorite_border", this.artists);
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

        var request = 'http://localhost:8005/v1/events/user/';
        console.log("vcaType " + this.vcaType);


        ajaxx('POST', request, vcaArtist).then(function (events) {
          console.log(events);
          if (events) {
            console.log("erfolgreich")
            this.getFavoriteArtists();
          }

        }.bind(this));


        if (this.vcaType == "USER") {
          ajaxx('GET', 'http://localhost:8005/v1/events/relatedArtists/' + artistId, {}).then(function (events) {
            console.log(events);

            for (var j = 0; j < events.artists.length; j++) {

              var artistId = events.artists[j].id;
              var artistName = events.artists[j].name;
              var artistPicture;

              if (events.artists[j].images[1] == null) {
                artistPicture = null;
              } else {
                artistPicture = events.artists[j].images[1].url;
              }

              this.addArtistSpotify(artistId, artistName, artistPicture, "add", "favorite_border", this.artists);
            }

          }.bind(this));
        }
      },

      getFavoriteArtists: function () {
        this.favorites = [];
       // var userId = this.vcaId;



        var request = "http://localhost:8005/v1/events/user/" + this.vcaId + "/" + this.vcaType;

        if(this.vcaType == "LINEUP"){
          request = "http://localhost:8005/v1/events/user/" + this.vcaId2 + "/" + "USER";
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
            this.addArtistSpotify(artistId, artistName, artistPicture, "remove", "favorite", this.favorites);
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

        var request = 'http://localhost:8005/v1/events/user/';

        ajaxx('DELETE', request, vcaArtist).then(function (events) {
          console.log(events);

          if (events) {
            console.log("loeschen erfolgreich")
            this.removeArtistSpotify(vcaArtist.artistId, this.favorites);
            this.refreshArtistSpotify();
          }
        }.bind(this));
      }
    }
  }


  var obj = {
    artistId: 'artistId',
    artistName: 'artistName',
    artistPicture: 'artistPicture'
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
