<template>
  <el-card class="random-meme">
    <template #header>
      <h2 :id="meme.title">#{{meme.title}}</h2>
      <span>
        <el-button link>
          <span class="material-icons">download</span>
        </el-button>
        <el-button link>
          <span class="material-icons">refresh</span>
        </el-button>
      </span>
    </template>
    <meme
      :title="meme.title"
      :src-list="meme.srcList"
    />
  </el-card>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { ElCard, ElButton } from 'element-plus'
import Meme from './meme.vue'

const randomCount = ref(Math.floor(
  Math.random() * MEMES.length
))
const meme = computed(() => {
  return MEMES[randomCount.value]
})
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
