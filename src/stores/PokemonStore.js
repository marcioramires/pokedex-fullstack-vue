import Vuex from "vuex";
import axios from "axios";

const store = new Vuex.Store({
  state: {
    pokemons: [],
    pokemonSelected: [],
    nextPage: "",
    prevPage: "",
    showDetail: false,
    teamName: "",
    pokemonsTeam: [],
  },
  mutations: {
    getPokemons: (state, data) => {
      state.pokemons = data.results;
      state.nextPage = data.next;
      state.prevPage = data.previous;
    },
  },
  getters: {
    pokemonList: (state) => state.pokemons.map((pokemon) => pokemon),

    showSelected: (state) => state.pokemonSelected,

    showDetails: (state) => state.showDetail,

    selectedTeamName: (state) => state.teamName,

    selectedPokemonsTeam: (state) => state.pokemonsTeam,
  },
  actions: {
    async fetchPokemons({ commit }, url) {
      try {
        const { data } = await axios(url);
        commit("getPokemons", data);
      } catch (error) {
        console.error(error);
      }
    },
  },
  modules: {},
});

export default store;
