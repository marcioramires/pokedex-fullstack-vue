<script>
import store from '../stores/PokemonStore'

export default {
  name: "TeamsList",

  data() {
    return {
      saveTeam: [],
      teams: {
        name: "",
        pokemons: [],
      },
    };
  },

  created() {
    this.saveTeam = sessionStorage.getItem("teams")
      ? JSON.parse(sessionStorage.getItem("teams"))
      : [];
  },

  methods: {
    createTeam() {
      const savedTeam = sessionStorage.getItem("teams")
        ? JSON.parse(sessionStorage.getItem("teams"))
        : [];
      savedTeam.push(this.teams);
      sessionStorage.setItem("teams", JSON.stringify(savedTeam));
      this.saveTeam = sessionStorage.getItem("teams")
        ? JSON.parse(sessionStorage.getItem("teams"))
        : [];
    },

    deleteTeam(name) {
      const savedTeam = sessionStorage.getItem("teams")
        ? JSON.parse(sessionStorage.getItem("teams"))
        : [];
      const index = savedTeam.findIndex(team => team.name === name)
      savedTeam.splice(index, 1);
      sessionStorage.setItem("teams", JSON.stringify(savedTeam));
      this.saveTeam = sessionStorage.getItem("teams")
        ? JSON.parse(sessionStorage.getItem("teams"))
        : [];
    },

    openTeam(team) {
      store.state.teamName = team.name
      store.state.pokemonsTeam = team.pokemons
      this.$router.push({ path: '/myteam'})
    } 
  },
};
</script>

<template>
  <section>
    <div class="team-list">
      <div class="card">
        <div class="id">
          <img src="../assets/pokeball.png" alt="pokeball" />
          <p>Create a team</p>
        </div>
        <form v-on:submit.prevent="createTeam">
          <input
            type="text"
            id="name"
            v-model="teams.name"
            placeholder="Insert your name"
          />
          <button type="submit">Add your team</button>
        </form>
      </div>

      <div class="card" v-for="team in saveTeam" :key="team.name">
        <div class="id">
          <img src="../assets/pokeball.png" alt="pokeball" />
          <p>{{ team.name }}'s Team</p>
        </div>
        <div @click="openTeam(team)">
          <div class="team-image">
            <img src="../assets/pokeballteam.png" alt="pokeballteam" />
            <p>Choose this team</p>
          </div>
        </div>
        <p class="teamDelete" @click="deleteTeam(team.name)">
          <i class="far fa-times-circle"></i> delete this team
        </p>
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
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.281);
  text-decoration: none;

  .team-list {
    width: 100%;
    max-height: 100%;
    min-height: 40%;
    padding: 2px;
    border-radius: 5px;
    overflow-y: auto;

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

      .team-image {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 40px;
        margin-bottom: 30px;

        img {
          width: 80px;
          height: 80px;
          margin-bottom: 10px;
        }

        p {
          font-size: 12px;
        }
      }

      p {
        text-align: right;
        margin-right: 5px;
        font-size: 12px;
        color: #0a2351;
        cursor: pointer;
      }

      .teamDelete {
        margin-bottom: 20px;;
      }

      .team-image:hover {
        animation: move 2s infinite alternate;
      }

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
        height: 90%;

        display: flex;
        align-items: center;
        justify-content: center;
      }

      form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 30px;
        margin-top: 50px;

        input {
          outline: none;
          background: none;
          text-align: center;
          margin-left: 10px;
          margin-right: 10px;
        }

        button {
          height: 35px;
          cursor: pointer;
          background-color: #b0c4de;
          color: #0a2351;
          padding: 10px;
          border-radius: 10px;
          margin-bottom: 20px;

          p {
            display: flex;
            text-align: center;
            justify-content: center;
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
    .team-list {
      justify-content: center;

      .card {
        max-width: 18.5%;

        form {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 30px;
          margin-top: 50px;

          input {
            background-color: rgba(255, 255, 255, 0.281);
            text-align: center;
            margin-left: 10px;
            margin-right: 10px;
          }

          button {
            height: 35px;
            cursor: pointer;
            background-color: #b0c4de;
            color: #0a2351;
            padding: 10px;
            border-radius: 10px;
            margin-bottom: 20px;

            p {
              display: flex;
              text-align: center;
              justify-content: center;
            }
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 850px) {
  section {
    .team-list {
      justify-content: center;

      .card {
        max-width: 31%;
        max-height: 45%;

        form {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 30px;
          margin-top: 50px;

          input {
            background-color: rgba(255, 255, 255, 0.281);
            text-align: center;
            margin-left: 10px;
            margin-right: 10px;
          }

          button {
            height: 35px;
            cursor: pointer;
            background-color: #b0c4de;
            color: #0a2351;
            padding: 10px;
            border-radius: 10px;
            margin-bottom: 20px;

            p {
              display: flex;
              text-align: center;
              justify-content: center;
            }
          }
        }
      }
    }
  }
}
</style>
