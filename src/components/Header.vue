<script>
import { onMounted, reactive } from '@vue/runtime-core'
import { mapGetters, mapActions } from 'vuex'
import { RouterLink } from 'vue-router'
import store from "../store/pokemons.js";
import axios from 'axios'

export default {
  name: "Header",
  components: {},

  setup() {
    const state = reactive({
      baseUrl: 'https://pokeapi.co/api/v2/pokemon/?limit=21&offset=0',
    })

    onMounted(() => {
      store.dispatch('fetchPokemons', state.baseUrl)
      
    })

    async function searchPoke() {
      if (state.searchValue.length !== 0) { 
          const searched = JSON.parse(localStorage.getItem('pokemons')) || []
          const pokeRegistered = searched.map(pokemon => pokemon.name)
          const pokeVerify = pokeRegistered.indexOf(state.searchValue)

        if (pokeVerify === -1) {
          try {
            const { data } = await axios(`https://pokeapi.co/api/v2/pokemon/${state.searchValue}`)
            store.state.pokemonSelected.splice(0, 1, data)
            store.state.showDetail = true
            searched.push(data)
            localStorage.setItem('pokemons', JSON.stringify(searched))
            state.searchValue = ''
          } catch (error) {
            alert('not found')
            state.searchValue = ''
          }
        } else {
          searched.forEach(pokemon => {
            if (pokemon.name === state.searchValue) {
              store.state.pokemonSelected.splice(0, 1, pokemon)
              store.state.showDetail = true
              state.searchValue = ''
            }
          })
        }     
      } else {
        alert('not found')
      }
    }

    setInterval(() => {
      state.hour = new Date().toLocaleString().substr(11, 5);
    });

    return {
      state,
      searchPoke,
    };
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

    nextPage: () => {
      store.dispatch('fetchPokemons', store.state.nextPage)
      store.state.showDetail = false
    },

    prevPage: () => {
      store.dispatch('fetchPokemons', store.state.prevPage)
      store.state.showDetail = false
    }
  }
};
</script>

<template>
    <header>
      <div class="all-pokemons">
        <div class="title">
          <i class="far fa-list-alt"></i>
          <RouterLink to="/">All Pokémons</RouterLink>
        </div>
        <div class="user">
          <div class="registered">
            <img
              src="../assets/pokeball.png"
              alt="pokeball"
            />
            <RouterLink to="/teams">My Teams</RouterLink>
          </div>
          <p>Pokédex Vue</p>
        </div>
      </div>
      <div class="search">
        <div class="search-inputs">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            v-model="state.searchValue"
            @keyup.enter="searchPoke"
          />
          <button @click="searchPoke"><i class="fas fa-search"></i></button>
        </div>
        <div class="pages">
          <p @click="prevPage"><i class="fas fa-chevron-left"></i><span>prev</span></p>
          <p @click="nextPage"><span>next</span><i class="fas fa-chevron-right"></i></p>
        </div>
      </div>
    </header>
</template>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 20%;
  background: #B0C4DE;

  .all-pokemons {
    width: 100%;
    height: 50%;

    display: flex;
    align-items: center;
    .title {
      width: 40%;
      height: 100%;
      border-radius: 0 35px 35px 0;
      color: #0a2351;
      background: #F0F8FF;

      display: flex;
      align-items: center;

      a {
          font-size: 1.5rem;
          font-weight: bold;
          color: #0a2351;
          cursor: pointer;
      }

      svg {
        font-size: 2rem;
        margin: 0 20px;
      }
    }

    .user {
      width: 60%;
      height: 100%;
      border-radius: 35px 0 0 35px;
      overflow: hidden;
      display: flex;

      p {
          font-size: 1.5rem;
          color: #0a2351;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      .registered {
        width: 60%;
        height: 100%;
        background: linear-gradient(to right, #72A0C1, #B0C4DE);

        display: flex;
        align-items: center;
        justify-content: left;

        a {
          padding-left: 15px;
          font-size: 1.5rem;
          font-weight: bold;
          color: #0a2351;
          cursor: pointer;
        }

        img {
          width: 12%;
          background: transparent;
          padding-left: 12px;
        }
      }
    }
  }

  .search {
    width: 100%;
    height: 50%;
    padding: 0 50px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    .search-inputs {
      width: 40%;
      height: 100%;

      display: flex;
      align-items: center;
      justify-content: center;

      input {
        height: 50%;
        width: 60%;
        padding-left: 10px;
        margin-right: 10px;
        border-radius: 35px;
        outline: none;
        color: #0a2351;
        background: transparent;
        box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.3);
      }

      button {
        width: 8%;
        height: 50%;
        border-radius: 35px;
        background: transparent;
        box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.3);
        cursor: pointer;

        svg {
          font-size: 1rem;
          color: #72A0C1;
        }
      }

      p {
        color: rgb(255, 58, 58);
        margin-left: 10px;
        font-size: 0.9rem;
      }
    }

    .pages {
      width: 15%;
      height: 50%;

      display: flex;
      align-items: center;
      justify-content: space-between;

      p {
        font-size: 1.5rem;
        color: #0a2351;
        cursor: pointer;

        display: flex;
        justify-content: center;
        align-items: center;

        span {
          font-size: 0.9rem;
          margin: 0 5px;
        }
      }

      p:hover {
        color: #72A0C1;
      }
    }
  }
}

@media only screen and (max-width: 850px) {
  header {
    .all-pokemons {
      .title {
        h1 {
          font-size: 1.2rem;
        }

        svg {
          font-size: 1.7rem;
        }
      }
    }

    .search {
      .search-inputs {
        width: 70%;
      }
    }


  }
}

@media only screen and (max-width: 600px) {
  header {
    height: 10%;
    .all-pokemons {
      .title {
        h1 {
          font-size: 0.8rem;
        }

        svg {
          font-size: 1rem;
        }
      }

      .user {
        .registered {
          p {
            font-size: 0.8rem;
          }

          p:last-child {
            display: none;
          }

          img {
            width: 8%;
          }
        }
      }
    }

    .search {
      padding:0 ;
      justify-content: space-around;

      .search-inputs {
        justify-content: left;
        width: 60%;

        input {
        width: 60%;
        height: 60%;
        }

        button {
          width: 10%;
          height: 70%;

          svg {
            font-size: 0.8rem;
          }
        } 
      }

      .pages {
        height: 80%;
        width: 20%;

        p {
          font-size: 1.1rem;

          span {
            display: none;
          }
        }
      }
    }
  }
}
</style>