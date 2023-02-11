import Vuex from "vuex";
import axios from "axios";

const teams = new Vuex.Store({
  state: {
    teams: [],
    teamSelected: [],
    nextPage: "",
    prevPage: "",
    showDetail: false,
  },
  mutations: {
    getTeams: (state, data) => {
      state.teams = data.results;
      state.nextPage = data.next;
      state.prevPage = data.previous;
    },
  },
  getters: {
    teamsList: (state) => state.teams.map((pokemon) => pokemon),

    showSelected: (state) => state.pokemonSelected,

    showDetails: (state) => state.showDetail,
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

export default teams;
