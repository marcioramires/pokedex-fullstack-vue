<script>
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
import TeamsList from "../components/TeamsList.vue";

export default {
  name: "TeamsView",
  components: { Header, Footer, TeamsList },
};
</script>

<template>
  <main>
    <Header />
    <div class="display">
      <TeamsList />
    </div>
    <Footer />
  </main>
</template>

<style lang="scss" scoped>
main {
  width: 80%;
  height: 90%;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.3);

  .display {
    height: 70%;
    width: 100%;
    display: flex;
    align-items: center;
  }
}

@media only screen and (max-width: 1050px) {
  main {
    width: 90%;
  }
}

@media only screen and (max-width: 850px) {
  main {
    width: 95%;

    .display {
      height: 75%;
    }
  }
}

@media only screen and (max-width: 600px) {
  main {
    width: 100%;
    height: 100%;

    .display {
      height: 90%;

      flex-direction: column;
    }
  }
}
</style>
