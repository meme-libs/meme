<template>
  <el-card>
    <template #header>
      <h2>#{{meme.title}}</h2>
      <span>
        <el-button link>
          <span class="material-icons">download</span>
        </el-button>
        <el-button link>
          <span class="material-icons">refresh</span>
        </el-button>
      </span>
    </template>
    <meme :src-list="meme.srcList"/>
  </el-card>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { ElCard, ElButton } from 'element-plus'
import Meme from './Meme.vue'


const randomCount = ref(Math.floor(
  // @ts-ignore
  Math.random() * MEMES.length
))
const meme = computed(() => {
  // @ts-ignore
  return MEMES[randomCount.value]
})
</script>

<style lang="scss" scoped>
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
</style>
