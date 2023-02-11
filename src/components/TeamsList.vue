<script>
  import { onMounted, reactive } from '@vue/runtime-core'
  import { mapGetters, mapActions } from 'vuex'
  import storeTeams from '../store/teams.js'
  import axios from 'axios'
  
  export default {
    name: "TeamsList",
    components: { },
  
    setup () {
      const state = reactive({
        baseUrl: '',
      })
  
      onMounted(() => {
        storeTeams.dispatch('fetchTeams', state.baseUrl)
        
      })
  
      async function showTeam(url) {
        try {
          const { data } = await axios(url)
          storeTeams.state.pokemonSelected.splice(0, 1, data)
          storeTeams.state.showDetail = true
        } catch (error) {
          console.error(error)
        }
      }
      return {
        state,
        showTeam
      }
      
    },
  
    computed: {
      ...mapGetters([
        'teamsList',
        'showDetails'
      ])
    },
  
    methods: {
      ...mapActions([
        'fetchTeams',
      ]),
    }
  };
  </script>

<template>
    <section>
      <div class="team-list" >
         <div class="card">
          <div class="id">
            <img
              src="../assets/pokeball.png"
              alt="pokeball"
            />
            <p>Create your team</p>
          </div>
            <form>
                <input placeholder="New team's name" />
                <button>Add you team</button>
            </form>
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
          height: 50%;
        }

        img:hover {
          animation: move 2s infinite alternate;
        }
      }
      
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
        }

        button {
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
   .team-list {
     justify-content: center;
     .card {
       max-width: 18.5%;
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
     }
   }
 }
}
</style>