<script>
  import { onMounted, reactive } from '@vue/runtime-core'
  import { mapGetters, mapActions } from 'vuex'
  import storePokemons from '../stores/PokemonStore.js'
  import axios from 'axios'
  
  export default {
    name: "PokemonList",
    components: { },
  
    setup () {
      const state = reactive({
        baseUrl: 'https://pokeapi.co/api/v2/pokemon/?limit=21&offset=0',
      })
  
      onMounted(() => {
        storePokemons.dispatch('fetchPokemons', state.baseUrl)
        
      })
  
      async function showPokemon(url) {
        try {
          const { data } = await axios(url)
          storePokemons.state.pokemonSelected.splice(0, 1, data)
          storePokemons.state.showDetail = true
        } catch (error) {
          console.error(error)
        }
      }
      return {
        state,
        showPokemon
      }
      
    },
  
    computed: {
      ...mapGetters([
        'pokemonList',
        'showDetails'
      ])
    },
  
    methods: {
      ...mapActions([
        'fetchPokemons',
      ]),
    }
  };
</script>

<template>
    <section>
      <div class="poke-list" >
         <div class="card" v-for="pokemon in pokemonList" :key="pokemon.id" @click="showPokemon(pokemon.url)">
          <div class="id">
            <img
              src="../assets/pokeball.png"
              alt="pokeball"
            />
            <p>{{pokemon.name}}</p>
          </div>
          <div class="image">
            <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/`+pokemon.url.split('/')[6]+'.svg'" alt="not available sorry">
          </div>
        </div>
      </div>
    </section>
</template>    

<style lang="scss" scoped>
section {
  width: 100%;
  height: 100%;

  display: flex;  
  align-items: center;
  justify-content: center;

  .poke-list {
    width: 100%;
    height: 100%;
    padding: 2px;
    border-radius: 5px;
    overflow-y: auto;
    background: rgba(255, 255, 255, 0.281);

    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .card {
      min-width: 10%;
      max-width: 13%;
      min-height: 20%;
      margin: 4px;
      overflow: hidden;
      border-radius: 5px;
      box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.3);
      cursor: pointer;

      .id {
        width: 100%;
        height: 15%;

        display: flex;
        align-items: center;

        background: #B0C4DE;

        p {
          color: #0a2351;
          font-size: 0.8rem;
          text-transform: capitalize;
        }

        img {
          width: 8%;
          margin: 0 10px;
        }
      }

      .image {
        width: 100%;
        height: 90%;

        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 50%;
        }

        img:hover {
          animation: move 2s infinite alternate;
        }
      }
    }
  }
}

@keyframes move {
  from {
    transform: translateY(-5px);
  }
}

@media only screen and (max-width: 1050px) {
 section {
   .poke-list {
     justify-content: center;
     .card {
       max-width: 18.5%;
     }
   }
 }
}

@media only screen and (max-width: 850px) {
 section {
   .poke-list {
     justify-content: center;
     .card {
       max-width: 31%;
       max-height: 45%;
     }
   }
 }
}
</style>