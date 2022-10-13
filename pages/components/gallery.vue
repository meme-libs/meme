<template>
  <div class="gallery">
    <el-col
      v-for="i in [...new Array(3).keys()]" :key="i"
      :span="8"
    >
      <gallery-item
        v-for="item in MEMES.filter((_, index) => (index % 3 === i))"
        :key="JSON.stringify(item.srcList)"
        :id="item.id"
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
