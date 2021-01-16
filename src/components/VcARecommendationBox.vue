<template>
    <div style="width: 100% !important;">


        <div id="ttttt">
            <div v-if="false">Box bezieht sich auf ActionId {{vcaType}} und {{vcaId}}</div>
            <h5 ref="heading" v-if="isEmbedded != true">heading</h5>
            <p v-if="vcaType == 'USER'">
                Hinterlege deine Lieblingskünstler, damit wir persönliche Aktionsvorschläge für dich erzeugen können.
            </p>
            <p v-if="vcaType == 'ACTION'">
                Hinterlege das Lineup bei Veranstaltungen, damit wir den Nutzern diese empfehlen können.
            </p>
        </div>

        <div id="sticky-outer">
            <ul id="tabs-swipe-demo" class="tabs" v-if="isEmbedded != true">
                <li class="tab col s3" :style="[vcaType == 'ACTION' ? {'display': 'none'} : {'opacity': '1'}]">
                    <a :class="{ 'active' : vcaType == 'USER'}" href="#artist-swipe-3" ref="thirdTab">Third Tab</a>
                </li>

                <li class="tab col s3">
                    <a :class="{ 'active' : vcaType == 'ACTION'}" href="#artist-swipe-1" ref="firstTab">first
                        Tab</a>
                </li>
                <li class="tab col s3">
                    <a href="#artist-swipe-2" ref="secondTab">second Tab</a>
                </li>
            </ul>
        </div>

        <div class="main">


        </div>

        <div id="artist-swipe-3" class="col s12" v-if="isEmbedded != true">

            <div class="col s12 m12" v-if="isEmbedded != true && vcaType == 'USER'">
                <p>
                    Diese Künstler sind derzeit beliebt im VcA Kosmos! Nach dem Favorisieren werden dir ähnliche
                    Künstler vorgeschlagen.
                </p>
            </div>


            <div class="row">
                <div class="col s12 m12">
                    <h4 style="display:none !important;">{{heading}}</h4>
                </div>
                <div id="popularArtistsRow">
                    <div class="row">
                        <VcAArtistBox artistCategory="popular" v-for="artist in populars"
                                      :artistId="artist.artistId"
                                      :artistName="artist.artistName" :artistPicture="artist.artistPicture"
                                      :action="artist.action" :actionIcon="artist.actionIcon"
                                      v-on:click="say('hi')">
                        </VcAArtistBox>
                    </div>
                    <div class="row" v-if="populars.length==0">
                        <h5>Derzeit keine Einträge vorhanden!</h5>
                    </div>
                </div>
            </div>
        </div>


        <div id="artist-swipe-1" class="col s12">

            <div class="col s12 m12" v-if="isEmbedded != true">
                <p v-if="vcaType == 'USER'">
                    Suche nach deinen Lieblingskünstlern, um diese zu favorisieren! Nach dem Hinzufügen werden verwandte
                    Musiker vorgeschlagen, um dir Inspiration zu verschaffen!
                </p>
                <p v-else>
                    Benutze das Suchfeld, um nach Künstlern zu suchen, die an der Veranstaltung teilnehmen!
                </p>
            </div>

            <div class="col s12 m12" v-if="isEmbedded != true">
                <h4 style="display:none !important;">Künstler suchen </h4>
            </div>
            <div class="row">


                <div class="input-field col l4 m8 s12" v-if="isEmbedded != true">

                    <input ref="artistNameSpotify" value="Rammstein" id="artistName" type="text" class="validate">
                    <label class="active" for="artistName" style="display:none !important;">Artist</label>

                </div>
                <div class="input-field col l2 s12 m4" v-if="isEmbedded != true">

                    <a id="searchArtistButton" class="waves-effect waves-light btn-large" ref="searchArtistButton"
                       @click="searchArtistSpotify()">
                        <i class="material-icons left">search</i>
                        Suchen
                    </a>
                </div>
                <div class="col s12 l3"></div>
                <div class="col s12 l3"></div>
            </div>
            <div class="row" id="artistResultsRow">
                <VcAArtistBox artistCategory="result" v-for="artist in artists" :artistId="artist.artistId"
                              :artistName="artist.artistName"
                              :artistPicture="artist.artistPicture" :action="artist.action"
                              :actionIcon="artist.actionIcon" v-on:click="say('hi')">
                </VcAArtistBox>
            </div>
        </div>


        <div id="artist-swipe-2" class="col s12" v-if="isEmbedded != true">


            <div class="col s12 m12" v-if="isEmbedded != true">
                <p v-if="vcaType == 'USER'">
                    Bearbeite die Liste mit deinen Lieblingskünstlern, damit diese immer auf dem aktuellsten Stand ist!
                </p>
                <p v-else>
                    Bearbeite die Liste mit den teilnehmenden Künstlern, damit diese stets korrekt ist!
                </p>
            </div>

            <div class="row">
                <div class="col s12 m12">
                    <h4 style="display:none !important;">{{heading}}</h4>
                </div>
                <div id="favoriteArtistsRow">
                    <div class="row">
                        <VcAArtistBox artistCategory="favorite" v-for="artist in favorites"
                                      :artistId="artist.artistId"
                                      :artistName="artist.artistName" :artistPicture="artist.artistPicture"
                                      :action="artist.action" :actionIcon="artist.actionIcon"
                                      v-on:click="say('hi')">
                        </VcAArtistBox>
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
        favorites: [],
        populars: []
      }
    },
    mounted: function () {


      if (!this.isEmbedded) {
        this.$refs.heading.textContent = this.heading;
        // this.$refs.heading.textContent = "Favorisierte Künstler";
        //this.$refs.firstTab.innerHTML = "Artisten suchen";
        // this.$refs.secondTab.innerHTML = "Artisten bearbeiten";
        //this.$refs.thirdTab.innerHTML = "Beliebte Künstler ansehen";

        this.$refs.firstTab.innerHTML = "Suchen";
        this.$refs.secondTab.innerHTML = "Verwalten";
        this.$refs.thirdTab.innerHTML = "Beliebte Künstler";

      }

      if (this.vcaType == "LINEUP") {
        this.searchArtistSpotify3();
      } else {
        this.getFavoriteArtists();
        this.getPopularArtists();
      }

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
      getIconArtist: function (action) {
        var vcaTypeN = this.vcaType;
        if(this.vcaType == "LINEUP"){
          vcaTypeN = "USER";
        }

        if (action.toUpperCase() == "ADD" && vcaTypeN) {
          return "favorite_border"
        }
        if (action.toUpperCase() == "REMOVE" && vcaTypeN) {
          return "favorite";
        }
        if (action.toUpperCase() == "ADD" && vcaTypeN) {
          return "add"
        }
        if (action.toUpperCase() == "REMOVE" && vcaTypeN) {
          return "delete";
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

      refreshArtistSpotify: function () {
        for (var i = 0; i < this.artists.length; i++) {
          this.artists[i].action = "add";
          this.artists[i].actionIcon = this.getIconArtist("add");
          // this.artists[i].actionIcon = "favorite_border";
        }

        for (var i = 0; i < this.populars.length; i++) {
          this.populars[i].action = "add";
          this.populars[i].actionIcon = this.getIconArtist("add");
          // this.populars[i].actionIcon = "favorite_border";
        }



        for (var i = 0; i < this.artists.length; i++) {
          for (var j = 0; j < this.favorites.length; j++) {

            if (this.artists[i].artistId == this.favorites[j].artistId) {
              this.artists[i].action = "remove";
              // this.artists[i].actionIcon = "favorite";
              this.artists[i].actionIcon = this.getIconArtist("remove");
              this.$forceUpdate();

            }
          }
        }

        for (var i = 0; i < this.populars.length; i++) {
          for (var j = 0; j < this.favorites.length; j++) {
            if (this.populars[i].artistId == this.favorites[j].artistId) {
              this.populars[i].action = "remove";
              //this.populars[i].actionIcon = "favorite";
              this.populars[i].actionIcon = this.getIconArtist("remove");


              this.$forceUpdate();

            }
          }
        }
        //for(var i = 0; i < artist)
      },

      searchArtistSpotify2: function () {
        var request;
        if (this.vcaType == "LINEUP") {
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

            this.addArtistSpotify(artistId, artistName, artistPicture, "add", this.getIconArtist("add"), this.artists);
            // this.addArtistSpotify(artistId, artistName, artistPicture, "add", "favorite_border", this.artists);
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

            this.addArtistSpotify(artistId2, artistName2, artistImage2, "add", this.getIconArtist("add"), this.artists);
            // this.addArtistSpotify(artistId2, artistName2, artistImage2, "add", "favorite_border", this.artists);
          }
          this.getFavoriteArtists();

        }.bind(this))
      },
      searchArtistSpotify3: function () {

        var request = "http://localhost:5001/suggesty/api/v1/spotify/artist/ACTION/" + this.vcaId;

        ajaxx('GET', request, {}).then(function (events) {
          //console.log(events);


          this.artists = [];
          for (var i = 0; i < events.data.length; i++) {
            var artistId2 = events.data[i].artistId;
            var artistName2 = events.data[i].artistName;
            var artistImage2 = events.data[i].artistImage;

            this.addArtistSpotify(artistId2, artistName2, artistImage2, "add", this.getIconArtist("add"), this.artists);
            // this.addArtistSpotify(artistId2, artistName2, artistImage2, "add", "favorite_border", this.artists);
          }
          this.getFavoriteArtists();


        }.bind(this))
      },

/*
        var artistInputName = this.$refs.artistNameSpotify.value;
        ajaxx('GET', 'http://localhost:5001/suggesty/api/v1/spotify/name/' + artistInputName, {}).then(function (events) {
          this.artists = [];
          for (var i = 0; i < events.data.length; i++) {
            var artistId2 = events.data[i].artistId;
            var artistName2 = events.data[i].artistName;
            var artistImage2 = events.data[i].artistImage;

            this.addArtistSpotify(artistId2, artistName2, artistImage2, "add", this.getIconArtist("add"), this.artists);
            // this.addArtistSpotify(artistId2, artistName2, artistImage2, "add", "favorite_border", this.artists);
          }
          this.getFavoriteArtists();

        }.bind(this))
        */


      getRelatedArtists: function (artistId, artistName, artistCategory) {
        var vcaTypeN = this.vcaType;
        var vcaIdN = this.vcaId;
        if(this.vcaType=="LINEUP"){
          vcaTypeN = "USER";
          vcaIdN = this.vcaId2;
        }

        var vcaArtist = {
          "vcaId": vcaIdN,
          "artistId": artistId,
          "vcaType": vcaTypeN
        }


        /*
                if(this.vcaType == "LINEUP"){
                  vcaArtist.vcaId = this.vcaId2;
                  vcaArtist.vcaType = "USER";
                }
                */

        var request = 'http://localhost:5001/suggesty/api/v1/spotify/';
       // console.log(request);
        //console.log(vcaArtist);

        ajaxx('POST', request, vcaArtist).then(function (events) {
          if (events) {

            if (this.vcaType == "ACTION") {
              M.Toast.dismissAll();
              M.toast({html: artistName + " als Lineup hinzugefügt!"});
            }
            if(this.vcaType=="LINEUP"){
              M.Toast.dismissAll();
              M.toast({html: artistName + " wurde als Favorit hinzugefügt!"});
            }
            this.getFavoriteArtists();

          }
        }.bind(this));


        if (this.vcaType == "USER") {
          ajaxx('GET', 'http://localhost:5001/suggesty/api/v1/spotify/similar/id/' + artistId, {}).then(function (events) {
            // Ähnliche Künstler wurden ebenfalls übermittelt
            if (events.data.length > 0) {
              M.Toast.dismissAll();
              M.toast({html: artistName + " wurde als Favorit hinzugefügt!"});
              // M.toast({html: "Ähnliche Künstler zu " + artistName + " wurden ermittelt!"});
            } else {
              M.Toast.dismissAll();
              M.toast({html: artistName + " als Favorit hinzugefügt! Keine ähnlichen Künstler vorhanden!"});
              //M.toast({html: "Keine ähnlichen Künstler zu " + artistName + " vorhanden!"});
            }

            for (var i = 0; i < events.data.length; i++) {

              var artistId2 = events.data[i].artistId;
              var artistName2 = events.data[i].artistName;
              var artistImage2 = events.data[i].artistImage;

              if (artistCategory == "result") {

                this.addArtistSpotify(artistId2, artistName2, artistImage2, "add", this.getIconArtist("add"), this.artists);
                //this.addArtistSpotify(artistId2, artistName2, artistImage2, "add", "favorite_border", this.artists);
              }
              if (artistCategory == "popular") {

                this.addArtistSpotify(artistId2, artistName2, artistImage2, "add", this.getIconArtist("add"), this.populars);
                // this.addArtistSpotify(artistId2, artistName2, artistImage2, "add", "favorite_border", this.populars);
              }
            }


          }.bind(this));
        }
      },

      getPopularArtists: function () {
        this.favorites = [];
        var request = "http://localhost:5001/suggesty/api/v1/spotify/events/popular";

        ajaxx('GET', request, {}).then(function (events) {
          for (var i = 0; i < events.data.length; i++) {
            var artistId = events.data[i].artistId;
            var artistName = events.data[i].artistName;
            var artistPicture = events.data[i].artistPicture;

            this.addArtistSpotify(artistId, artistName, artistPicture, "add", this.getIconArtist("add"), this.populars);
            //this.addArtistSpotify(artistId, artistName, artistPicture, "add", "favorite_border", this.populars);
          }
          this.refreshArtistSpotify();
        }.bind(this));
      },

      getFavoriteArtists: function () {
        this.favorites = [];
        var request = "http://localhost:5001/suggesty/api/v1/spotify/artist/" + this.vcaType + "/" + this.vcaId;

        if(this.vcaType=="LINEUP"){
          var request = "http://localhost:5001/suggesty/api/v1/spotify/artist/USER/" + this.vcaId2;
        }
        //console.log(request);
       // console.log(this.vcaId2);
        ajaxx('GET', request, {}).then(function (events) {

          //console.log(events);

          for (var i = 0; i < events.data.length; i++) {
            var artistId = events.data[i].artistId;
            var artistName = events.data[i].artistName;
            var artistImage = events.data[i].artistImage;

            // this.addArtistSpotify(artistId, artistName, artistImage, "remove", "favorite", this.favorites);
            this.addArtistSpotify(artistId, artistName, artistImage, "remove", this.getIconArtist("remove"), this.favorites);
          }
          this.refreshArtistSpotify();
        }.bind(this));
      },

      removeFavoriteArtist: function (artistId, artistName) {
        var vcaTypeN = this.vcaType;
        var vcaIdN = this.vcaId;
        if(this.vcaType=="LINEUP"){
          vcaTypeN = "USER";
          vcaIdN = this.vcaId2;
        }
        var vcaArtist = {
          "vcaId": vcaIdN,
          "artistId": artistId,
          "vcaType": vcaTypeN
        }


        var request = 'http://localhost:5001/suggesty/api/v1/spotify/';

        ajaxx('DELETE', request, vcaArtist).then(function (events) {
          if (events) {
            M.Toast.dismissAll();
            if(this.vcaType=="USER" || this.vcaType =="LINEUP"){
              M.toast({html: artistName + " wurde als Favorit entfernt!"});
            } else {
              M.toast({html: artistName + " wurde aus dem Lineup entfernt!"});
            }


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

    .tabs-swipe-demo {
        padding-bottom: 20px !important;
    }

    span.card-title, .overlayAction i.material-icons {
        /*text-shadow: 0px 1px 1px #616161;*/
        text-shadow: 1px 1px 2px #555555;
    }

    .col.s12 {
        padding: 0px !important;
    }

    .card {
        margin: 0 !important;
    }

    @media (max-width: 600px) {

        #sticky-outer {
            padding-left: 0px !important;
            padding-right:0px !important;
        }

        .overlayAction .card-title-outer{
            bottom: 8px;
        }

        #ttttt {
            padding-left:10px !important;
        }


        .input-field.col.l2.s12.m4{
            padding-left:5px !important;
            padding-left:5px !important;
        }

        div#artistResultsRow {
            padding-top: 15px !important;
        }

        .card-image img {
            width: 100vw;
            height: 50vw;
            object-fit: cover;
        }

        .overlayAction .card span.card-title {
            font-size: 5vw !important;

        }


        #artist-swipe-1, #artist-swipe-2, #artist-swipe-3 {
            margin-left: 5px !important;
            padding-left:5px !important;
            margin-right: 5px !important;
            padding-right:5px !important;
        }

        .row .col {
            padding:0 0.5rem !important;
        }

        .overlayAction a, .card-image .card-title {
            /*
            margin-left: auto !important;
            margin-right: auto !important;*/
            width: 100% !important;

        }

        .row .col.s6 {
            padding-bottom: 1rem !important;
        }
        .card .card-image span.card-title, .overlayAction  a i.material-icons{
            text-align: left !important;
            float:left !important;
        }



        .col .row .input-field{
            margin-bottom:5px !important;
            margin-top:5px !important}

        .artistResultsRow{
            margin-top:15px !important;
        }
    }

    @media (min-width: 600px) and (max-width: 992px) {

        #sticky-outer {
            padding-left: 20px !important;
            padding-right:20px !important;
        }


        .overlayAction .card-title-outer{
            bottom: 8px;
        }

        #ttttt {
            padding-left:20px !important;
        }


        .input-field.col.l2.s12.m4{
            padding-left:30px !important;
        }


        .row .col.m4 {
            padding-bottom: 1rem !important;
        }

        .card-image img {
            width: 100vw;
            height: 25vw;
            object-fit: cover;
        }
        .card .card-image .card-title {
            /*text-align: center !important;*/
        }

        .card .card-image span.card-title, .overlayAction  a i.material-icons{
            padding: 10px !important;
        }
    }

    @media (min-width: 992px) and (max-width: 1199px) {
        #sticky-outer {
            padding-left: 22px !important;
            padding-right:22px !important;
        }

        .overlayAction .card-title-outer{
            bottom: 10px;
        }

        #ttttt {
            padding-left:20px !important;
        }


        .input-field.col.l2.s12.m4{
            margin-left:15px !important;
        }

        .card-image img {
            width: 25vw;
            height: 25vw;
            object-fit: cover;
        }

        .row .col.l3 {
            padding-bottom: 14px !important;
        }

    }

    @media (min-width: 1200px) {

        #sticky-outer {
            padding-left: 22px !important;
            padding-right:22px !important;
        }

        .overlayAction .card-title-outer{
            bottom: 12px;
        }

        #ttttt {
            padding-left:20px !important;
        }

        .input-field.col {
            padding-top: 0px !important;
            margin-top: 0px !important;
        }

        .input-field.col.l2.s12.m4{
            margin-left:15px !important;
        }

        .card-image img {
            width: 25vw;
            height: 14.5vw;
            object-fit: cover;
        }

        .row .col.l3 {
            padding-bottom: 14px !important;
        }

    }

    .col .row {
        margin-left: -5px !important;
        margin-right: -5px !important;
        margin-bottom: 0px !important;
    }

    .overlayAction {
        background: rgba(0, 0, 0, 0.25) !important;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 50;
        /* background: none !important;*/
        opacity: 1;
        display: flex;
        /*align-items: center;*/
        /*justify-content: center;*/
        cursor: pointer;
        transition: .5s ease;
    }

    .overlayAction:hover {
        background: rgba(0, 0, 0, 0.60) !important;
        opacity: 1;
    }

    .card-title {
        z-index: 999 !important;
    }

    .overlayAction .material-icons {
        /*padding: 24px !important;*/
        padding:10px !important;
    }

    .overlayAction .material-icons {
        color: white !important;
        font-size: 35px !important;
    }

    .input-field col s1 {
        padding: 0px !important;
    }

    #a.row .col {
        padding: 0px !important;
    }

    .tabs .tab a:hover, .tab:hover i.material-icons, .tabs .tab a.active:hover {
        color: #4db1d4 !important;
    }

    .tabs .tab a, .tab i.material-icons, .tabs .tab a.active {
        color: #008fc1 !important;
    }

    .tabs .tab.disabled a, .tab.disabled i.material-icons, .tabs .tab.disabled:hover a, .tabs .tab.disabled a.active, .tab.disabled i.material-icons:hover, .tabs li.disabled:hover i, .tabs li.disabled i disabled {
        color: #4db1d4 !important;
    }

    .tabs .indicator {
        /* background-color: #ffffff !important;*/
        background-color: #008fc1;
    }

    /*  aktiver Tab-Hintergrund */
    .tabs .tab a.active {
        background-color: #e5f4f9  !important;

    }

    .tabs .tab a:hover {
        background-color: #ffffff !important;

    }

    .tabs .tab a.active:hover {
        background-color: #e5f4f9 !important;

    }

    .btn, .btn-large, .btn-small {
        background-color: #008fc1;
    }

    .btn:hover, .btn-large:hover, .btn-small:hover {
        background-color: #4db1d4 !important;
    }

    #searchRow {
        text-align: center;
    }

    #searchRow div {
        display: inline-block !important;
    }

    #tabs-swipe-demo {
       /* -webkit-box-shadow: 0px 3px 4px #3333;
        box-shadow: 0px 3px 3px #33333;
        position: -webkit-sticky !important;
        position: sticky !important;
        top: calc(0px);
        z-index: 9998*/
    }

    #artist-swipe-1, #artist-swipe-2, #artist-swipe-3 {
        background-color: #e7e7e7 !important;
        margin-left: 25px;
        margin-right: 25px;
       /*padding-top: 15px !important;*/
    }


    div#ttttt {
        background-color: white !important;
    }

    body {
        background-color: #e7e7e7 !important;
    }

    #app {
        margin-top: 0px !important;
        text-align: left !important;
    }

    #ttttt h5, #ttttt p {
        margin-top: 0px !important;
        margin-bottom: 0px !important;
        padding-bottom: 0px !important;
        padding-top: 15px !important;

    }

    #ttttt {
        padding-bottom: 10px !important;
    }

    .card .card-image img {
        border-radius: 0px 0px 0 0;
    }


    .card .card-title {
        float: left !important;
        font-size: 18px !important;
        padding: 12px !important;
        /* font-size: 5vw !important; */
        padding-bottom: 0px !important;
    }


    .row .col {
        padding: 0 .50rem !important;
    }



    a#searchArtistButton {
        width: 100% !important;

    }

    .tabs .tab a:focus, .tabs .tab a:focus.active {
       /* background-color: white !important;*/
    }

    .input-field a#searchArtistButton {
        width: 100% !important;
        margin-left: 0px !important;
        margin-right: 0px !important;
    }

    .card .card-image span.card-title, .overlayAction  a i.material-icons{
        text-align: left !important;
        float:left !important;
    }

    {
        border-bottom: 1px solid #000
    ;
        box-shadow: 0 1px 0 0 #000
    ;
    }

    input.valid:not([type]), input.valid:not([type]):focus, input.valid[type=text]:not(.browser-default), input.valid[type=text]:not(.browser-default):focus, input.valid[type=password]:not(.browser-default), input.valid[type=password]:not(.browser-default):focus, input.valid[type=email]:not(.browser-default), input.valid[type=email]:not(.browser-default):focus, input.valid[type=url]:not(.browser-default), input.valid[type=url]:not(.browser-default):focus, input.valid[type=time]:not(.browser-default), input.valid[type=time]:not(.browser-default):focus, input.valid[type=date]:not(.browser-default), input.valid[type=date]:not(.browser-default):focus, input.valid[type=datetime]:not(.browser-default), input.valid[type=datetime]:not(.browser-default):focus, input.valid[type=datetime-local]:not(.browser-default), input.valid[type=datetime-local]:not(.browser-default):focus, input.valid[type=tel]:not(.browser-default), input.valid[type=tel]:not(.browser-default):focus, input.valid[type=number]:not(.browser-default), input.valid[type=number]:not(.browser-default):focus, input.valid[type=search]:not(.browser-default), input.valid[type=search]:not(.browser-default):focus, textarea.materialize-textarea.valid, textarea.materialize-textarea.valid:focus, .select-wrapper.valid > input.select-dropdown, input[type=text]:not(.browser-default):focus:not([readonly]) {
        border-bottom: 1px solid #008fc1;
        -webkit-box-shadow: 0 1px 0 0 #008fc1;
        box-shadow: 0 1px 0 0 #008fc1;
    }

    .overlayAction a {
        width: 100% !important;
        display: inline-block !important;
        color: white !important;

    }
    .overlayAction .card-title-outer{
        position: absolute;
    }

    #sticky-outer{
        background-color: white!important;
        position: sticky !important;
        top: calc(0px);
        z-index: 9998;
        -webkit-box-shadow: 0px 3px 4px #3333;
    }


    body {
        /*overflow: hidden !important;*/
    }

    body {
        -ms-overflow-style: none;  /* Internet Explorer 10+ */
        scrollbar-width: none;  /* Firefox */
    }
    body::-webkit-scrollbar {
        display: none;  /* Safari and Chrome */
    }

    #toast-container > div {

        transition:opacity 500ms ease-out;
    }
 #toast-container > :nth-child(2){
     opacity:0.5
 }

    #toast-container > :nth-child(3){
        opacity:0.3
    }
    #toast-container > :nth-child(4){
        opacity:0.1
    }

</style>
