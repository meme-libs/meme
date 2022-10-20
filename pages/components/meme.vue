<template>
  <div class="meme" :class="{
    'able-jump': ableJump
  }">
    <span class="count">
      <span class="material-icons" style="font-size: 14px;">photo_library</span>
      {{ srcList.length }}
    </span>
    <el-carousel
      trigger="click"
      :loop="false"
      :autoplay="false"
      :initial-index="value"
      @change="i => $emit('update:value', i)"
    >
      <el-carousel-item v-for="(src, i) in srcList" :key="src">
        <img
          class="meme-item"
          :src="src"
          :alt="`${title}-${i}`"
          @click="router.push(`/${id}#${i}`)"
        />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts" setup>
import { ElCarousel, ElCarouselItem } from 'element-plus'
import { useRouter } from 'vue-router'

withDefaults(defineProps<{
  id: number
  title: string
  srcList: string[]
  value?: number
  ableJump?: boolean
}>(), {
  value: 0,
  ableJump: true
})

defineEmits<{
  'update:value': (i: number) => void
}>()

const router = useRouter()
</script>

<style lang="scss" scoped>
.meme {
  position: relative;
  width: 100%;
  &.able-jump img.meme-item {
    cursor: pointer;
  }
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
      > img.meme-item {
        display: block;
        width: 100%;
        object-fit: contain;
      }
    }
  }
}
</style>
