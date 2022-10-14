<template>
  <div class="gallery-item">
    <meme
      :title="title"
      :src-list="srcList"
    />
    <div class="title">
      <h5>{{ title }}</h5>
    </div>
    <div class="description">
      {{ description }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElCarousel, ElCarouselItem } from 'element-plus'
import Meme from './meme.vue'

defineProps<{
  id: number
  title: string
  description: string
  srcList: string[]
}>()
</script>

<style lang="scss" scoped>
div.gallery-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
  .title {
    padding: 5px;
    width: 100%;
    h5 {
      padding: 0;
      margin: 0;
    }
  }
  .description {
    padding: 5px;
    width: 100%;
    height: 2rem;
    overflow: hidden;
    font-size: 1rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    -webkit-line-clamp: 2;
  }
}
</style>
