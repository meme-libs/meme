<template>
  <el-card class="random-meme">
    <template #header>
      <h2 :id="meme.title">#{{meme.title}}</h2>
      <span>
        <el-button link>
          <a
            class="material-icons"
            download
            :href="meme.srcList[curI]"
          >
            download
          </a>
        </el-button>
        <el-button link @click="setRandomCount">
          <span class="material-icons">refresh</span>
        </el-button>
        <el-button link @click="$router.push(`/${meme.id}`)">
          <span class="material-icons">pending</span>
        </el-button>
      </span>
    </template>
    <meme
      :id="meme.id"
      :title="meme.title"
      :src-list="meme.srcList"
      v-model:value="curI"
    />
  </el-card>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { ElCard, ElButton } from 'element-plus'
import Meme from './meme.vue'

const randomMemeIndex = ref(0)

function setRandomCount() {
  randomMemeIndex.value = Math.floor(
    Math.random() * MEMES.length
  )
}

setRandomCount()

const meme = computed(() => {
  return MEMES[randomMemeIndex.value]
})

const curI = ref(0)
</script>

<style lang="scss" scoped>
div.random-meme {
  :deep(div.el-card__header) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  :deep(div.el-card__body) {
    .meme {
      > .el-carousel > .el-carousel__container {
        height: 55vh;
        .el-carousel__item img {
          height: 100%;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
@media screen and (max-width: 400px) {
  div.random-meme {
    :deep(div.el-card__header) {
      flex-direction: column;
      > span {
        margin-left: auto;
      }
    }
  }
}
</style>
