<template>
  <header>
    <router-link to="/">
      <h1>{{ TITLE }}</h1>
    </router-link>
    <div class="icons">
      <span
        class="icon material-icons style-mode"
        :class="{
          'is-dark': isDark,
        }"
        @click="toggleDark()"
      >
        {{!isDark ? 'dark_mode' : 'light_mode'}}
      </span>
      <span
        class="icon material-icons"
        @click="jumpToGithubRepo"
      >
        <img :src="`/${REPO}/github/GitHub-${ !isDark ? 'D' : 'L' }.png`" alt="github" width="24">
      </span>
    </div>
  </header>
  <main class="content">
    <router-view />
  </main>
  <footer>
    <p>© 2022 Meme</p>
  </footer>
</template>

<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

function jumpToGithubRepo() {
  window.open(`https://github.com/${ORG}/${REPO}`, '_blank')
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 10rem;
  > div.icons {
    display: flex;
    column-gap: 10px;
    user-select: none;
    > span.icon {
      cursor: pointer;
      opacity: 0.5;
      transition: opacity 0.5s;
      &:hover { opacity: 1; }
      &.style-mode {
        color: #f1c40f;
        filter: drop-shadow(0 0 0.5rem #f1c40f);
        &.is-dark {
          color: #f39c12;
          filter: drop-shadow(0 0 0.5rem #f39c12);
        }
      }
    }
  }
}
main.content {
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  padding: 0.5rem 10vw;
}
footer {
  padding: 0.5rem 10rem;
  text-align: center;
}
</style>

<style lang="scss" scoped>
@media screen and (max-width: 400px) {
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 10vw;
  }
}
</style>
