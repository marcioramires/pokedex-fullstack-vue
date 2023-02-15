<script>
import { mapGetters } from "vuex";

import store from "../stores/PokemonStore.js";
import { api } from "../services/api.js";

export default {
  name: "TeamDetails",
  components: {},

  methods: {
    async saveMyTeam() {

      const convertObjectToArray = (obj) => {
        const arrayValue = [];

        Object.keys(obj).forEach((key) => {
          arrayValue.push({ key, value: obj[key] });
        });
        return arrayValue;
      }

      const newTeamName = store.state.teamName;
      const newTeam = Array.from(store.state.pokemonsTeam);

      await api
        .post("poketeam", {
          name: newTeamName,
          team: newTeam,
        })
        .then((res) => {
          this.$router.push({ path: "/teams" });
        })
        .catch((error) => {
          this.$router.push({ path: "/teams" });
          console.log(error);
        });      
    },
  },
  computed: {
    ...mapGetters(["selectedTeamName", "selectedPokemonsTeam", "pokemonList"]),
  },
};
</script>

<template>
  <section>
    <div class="image">
      <RouterLink to="/teams"
        ><p><i class="far fa-times-circle"></i></p
      ></RouterLink>
      <img
        @click="teste()"
        src="../assets/pokeballteam.png"
        alt="pokeballteam"
      />
      <button @click="saveMyTeam()">Save</button>
    </div>
    <div class="status">
      <div class="table-status">
        <div class="title">
          <p>{{ selectedTeamName }}'s Team</p>
        </div>
        <div class="card">
          <div class="items">
            <p>{{ selectedPokemonsTeam[0] }}</p>
            <p>{{ selectedPokemonsTeam[1] }}</p>
            <p>{{ selectedPokemonsTeam[2] }}</p>
            <p>{{ selectedPokemonsTeam[3] }}</p>
            <p>{{ selectedPokemonsTeam[4] }}</p>
            <p>{{ selectedPokemonsTeam[5] }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  width: 40%;
  height: 100%;

  .image {
    width: 100%;
    height: 40%;
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 1.3rem;
      color: #72a0c1;
      cursor: pointer;
    }

    img {
      width: 45%;
      animation: move 2s infinite alternate;
    }

    button {
      position: absolute;
      bottom: 10px;
      right: 10px;
      padding: 5px 10px;
      border-radius: 10px;
      background-color: #b0c4de;
      color: #0a2351;
      cursor: pointer;
    }
  }

  .status {
    width: 100%;
    height: 60%;

    display: flex;
    align-items: center;
    justify-content: center;

    .table-status {
      width: 95%;
      height: 95%;
      border-radius: 10px;
      overflow: hidden;

      .title {
        width: 100%;
        height: 15%;
        background: #72a0c1;
        text-transform: capitalize;

        display: flex;
        align-items: center;
        justify-content: center;

        p:last-child {
          font-size: 1.2rem;
          margin-left: 10px;
        }
      }

      .card {
        width: 100%;
        height: 85%;
        background: #b0c4de;

        display: flex;

        .items {
          height: 100%;
          width: 100%;
          padding-left: 10px;

          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;

          p {
            font-size: 1rem;
          }
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
    width: 50%;
  }
}

@media only screen and (max-width: 600px) {
  section {
    width: 100%;
    height: 40%;
    display: flex;

    .image {
      width: 40%;
      height: 100%;

      p {
        z-index: 2;
      }

      img {
        width: 110%;
      }
    }

    .status {
      width: 60%;
      height: 100%;

      .table-status {
        .title {
          p {
            font-size: 0.8rem;
          }

          p:last-child {
            font-size: 0.9rem;
          }
        }

        .progress-bar {
          .items {
            p {
              font-size: 0.8rem;
            }
          }

          .values {
            .types {
              p {
                font-size: 0.8rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>
