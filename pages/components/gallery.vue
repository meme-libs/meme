<template>
  <div class="gallery">
    <el-col
      v-for="i in [...new Array(3).keys()]" :key="i"
      :span="8"
    >
      <gallery-item
        v-for="item in images.filter((_, index) => (index % 3 === i))"
        :key="JSON.stringify(item.srcList)"
        :title="item.title"
        :description="item.description"
        :srcList="item.srcList"
      />
    </el-col>
  </div>
</template>

<script lang="ts" setup>
import { ElCol } from 'element-plus'
import GalleryItem from './gallery-item.vue'

const images = [...new Array(19).keys()].map(i => ({
  title: `第 ${i} 张`,
  srcList: ['memes/[1][第 一 张 梗 图].png', 'memes/[1][第 一 张 梗 图].png'],
  description: `这是第 ${i} 张图`
}))
</script>

<style lang="scss" scoped>
div.gallery {
  display: flex;
  column-gap: 1rem;
  > div.el-col {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
  }
}
</style>
