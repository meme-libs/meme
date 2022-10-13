<template>
  <header>
    <h1>Meme</h1>
    <div class="icons">
      <span class="icon material-icons">dark_mode</span>
      <span class="icon material-icons">
        <img src="assets/github/GitHub-D.png" alt="github" width="24">
      </span>
    </div>
  </header>
  <main class="content">
    <random-meme />
    <gallery />
  </main>
  <footer>
    <p>© 2022 Meme</p>
  </footer>
</template>

<script lang="ts" setup>
import Gallery from './components/gallery.vue'
import RandomMeme from './components/random-meme.vue'
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  padding: 0.5rem 10rem;
  > h1 { flex-grow: 1; }
  > div.icons {
    display: flex;
    column-gap: 10px;
    user-select: none;
    > span.icon {
      cursor: pointer;
    }
  }
}
main.content {
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  padding: 0.5rem 30rem;
}
footer {
  padding: 0.5rem 10rem;
  text-align: center;
}
</style>
