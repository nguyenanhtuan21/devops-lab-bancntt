<template>
  <div class="header">
    <div class="header__option">
      <router-link to="/">
        <div>Home</div>
      </router-link>
      <router-link to="/about">
        <div>About</div>
      </router-link>
    </div>
    <p>TodoList</p>
  </div>
</template>

<script>
export default {
  name: "HeaderComp",
};
</script>

<style scoped>
.header {
}

.header > p {
  margin-bottom: 10px;
}

.header__option {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
}

.header__option > a {
  text-decoration: none;
}

.header__option > a > div {
  font-size: 24px;
  font-weight: bold;
  color: #000;
}

.router-link-active > div {
  color: greenyellow;
}
</style>