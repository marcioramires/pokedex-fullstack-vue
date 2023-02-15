<script>
export default {
  name: "Footer",
  components: {},
};
</script>

<template>
  <footer>
    <div class="about">
      <img src="../assets/pokeball.png" alt="pokeball" />
      <p>Pokédex</p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  width: 100%;
  height: 10%;
  background: #72a0c1;

  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  .about {
    width: 15%;
    height: 50%;
    background: #f0f8ff;
    color: #0a2351;
    border-radius: 0 10px 0 0;
    font-size: 0.9rem;

    display: flex;
    align-items: center;

    img {
      width: 12%;
      margin: 0 10px;
    }
  }

  @media only screen and (max-width: 850px) {
    footer {
      height: 5%;
      .about {
        width: 20%;
        height: 90%;

        img {
          width: 10%;
        }
      }
    }
  }

  @media only screen and (max-width: 600px) {
    footer {
      display: none;
      .about {
        width: 35%;
        height: 90%;
        justify-content: space-around;

        img {
          width: 10%;
        }
      }
    }
  }
}
</style>
