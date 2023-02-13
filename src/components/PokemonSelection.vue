<script>
import { onMounted, reactive } from "@vue/runtime-core";
import { mapGetters, mapActions } from "vuex";
import store from "../stores/PokemonStore.js";

export default {
  name: "PokemonSelection",
  components: {},

  setup() {
    const state = reactive({
      baseUrl: "https://pokeapi.co/api/v2/pokemon/?limit=21&offset=0",
    });

    onMounted(() => {
      store.dispatch("fetchPokemons", state.baseUrl);
    });

    return {
      teams: {
        pokemons: [],
      },
    };
  },

  computed: {
    ...mapGetters(["pokemonList", "selectedPokemonsTeam"]),
  },

  methods: {
    ...mapActions(["fetchPokemons"]),
    addPokemon(id) {
      const pokemonId = id.split("/")[6];
      if (store.state.pokemonsTeam.length <= 5) {
        if (
          store.state.pokemonsTeam.findIndex((pkm) => pkm === pokemonId) < 0
        ) {
          store.state.pokemonsTeam.push(pokemonId);
        } else {
          alert("Don't repeat a Pokemon!");
        }
      } else {
        alert("Your team is complete!");
      }
    },
  },
};
</script>

<template>
  <section>
    <div class="poke-list">
      <div class="card" v-for="pokemon in pokemonList" :key="pokemon.id">
        <div class="id">
          <img src="../assets/pokeball.png" alt="pokeball" />
          <p>{{ pokemon.name }}</p>
        </div>
        <div class="image">
          <img
            :src="
              `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/` +
              pokemon.url.split('/')[6] +
              '.svg'
            "
            alt="not available sorry"
            @click="addPokemon(pokemon.url)"
          />
        </div>
        <div class="addButton">
          <button @click="addPokemon(pokemon.url)">Add to your team</button>
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
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      .id {
        width: 100%;
        height: 15%;

        display: flex;
        align-items: center;

        background: #b0c4de;

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

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        img {
          width: 50%;
        }

        img:hover {
          animation: move 2s infinite alternate;
        }
      }
      .addButton {
        button {
          background-color: #b0c4de;
          color: #0a2351;
          cursor: pointer;
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
