<template>
  <div class="meme">
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
</template>

<script lang="ts" setup>
import { ElCarousel, ElCarouselItem } from 'element-plus'

defineProps<{
  title: string
  srcList: string[]
}>()
</script>

<style lang="scss" scoped>
.meme {
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
    user-select: none;
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
      display: block;
      > img {
        display: block;
        width: 100%;
        object-fit: contain;
      }
    }
  }
}
</style>
