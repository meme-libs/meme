<template>
  <div class="gallery-item">
    <div class="imgs">
      <span class="count">
        <span class="material-icons" style="font-size: 14px;">photo_library</span>
        {{ srcList.length }}
      </span>
      <el-carousel trigger="click" :autoplay="false" :loop="false">
        <el-carousel-item v-for="(src, i) in srcList" :key="src">
          <img :src="src" :alt="`${title}-${i}`"/>
        </el-carousel-item>
      </el-carousel>
    </div>
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
  .imgs {
    position: relative;
    width: 100%;
    > span.count {
      z-index: 10;
      position: absolute;
      top: 10px;
      right: 10px;
      display: flex;
      align-items: center;
      column-gap: 4px;
      padding: 1px 5px;
      width: 35px;
      color: white;
      background-color: #afafaf55;
      border-radius: 4px;
    }
    > :deep(.el-carousel) {
      overflow: hidden;
      background-color: #000d;
      border-radius: 4px;
      .el-carousel__container {
        height: auto;
      }
      .el-carousel__item {
        position: relative;
      }
      .el-carousel__item img {
        width: 100%;
        object-fit: contain;
      }
    }
  }
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
