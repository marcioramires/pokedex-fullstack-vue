<script>
import { mapGetters } from "vuex";

export default {
  name: "TeamDetails",
  components: {},

  methods: {
    teste() {
      console.log(this.selectedTeamName)
      console.log(this.selectedPokemonsTeam)
    }
  },

  computed: {
    ...mapGetters(["selectedTeamName", "selectedPokemonsTeam"]),
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
    </div>
    <div class="status">
      <div class="table-status">
        <div class="title">
          <p>{{ selectedTeamName }}'s Team</p>
        </div>
        <div class="progress-bar">
          <div class="items">
            <p>#1 {{ selectedPokemonsTeam[0] }}</p>
            <p>#2 {{ selectedPokemonsTeam[1] }}</p>
            <p>#3 {{ selectedPokemonsTeam[2] }}</p>
            <p>#4 {{ selectedPokemonsTeam[3] }}</p>
            <p>#5 {{ selectedPokemonsTeam[4] }}</p>
            <p>#6 {{ selectedPokemonsTeam[5] }}</p>
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
    height: 45%;
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
      margin-top: 20px;
      display: flex;
      align-items: right;
      cursor: pointer;
    }
  }

  .status {
    width: 100%;
    height: 55%;

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

      .progress-bar {
        width: 100%;
        height: 85%;
        background: #b0c4de;

        display: flex;

        .items {
          height: 100%;
          width: 30%;
          padding-left: 10px;

          display: flex;
          flex-direction: column;
          justify-content: space-around;

          p {
            font-size: 0.9rem;
          }
        }

        .values {
          width: 70%;
          height: 100%;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;

          .types {
            width: 100%;
            height: 10%;
            display: flex;
            align-items: center;
            justify-content: center;

            p {
              margin: 10px;
              text-transform: capitalize;
            }
          }

          p {
            font-size: 0.8rem;
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
