<template>
  <div class="meme-with-autor">
    <el-card>
      <meme
        :title="title"
        :src-list="meme.srcList"
      />
    </el-card>
    <div class="autor-meta">
      some
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { ElCard } from 'element-plus'
import Meme from '@/components/meme.vue'

const props = defineProps<{
  idOrTitle: string
}>()

const id = computed(() => Number.isInteger(+props.idOrTitle) ? +props.idOrTitle : undefined)

const meme = computed(() => {
  return MEMES.find(m => m.id === id.value || m.title === props.idOrTitle)
})

const title = computed(() => meme.value?.title ?? '')
</script>

<style lang="scss" scoped>
div.meme-with-autor {
  display: flex;
  :deep(div.el-card__body) > .meme {
    > .el-carousel > .el-carousel__container {
      height: 75vh;
      .el-carousel__item img {
        height: 100%;
      }
    }
  }
  > div.autor-meta {
    padding: 10px;
    min-width: 20vw;
  }
}
</style>
