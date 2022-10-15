<template>
  <meme
    :title="title"
    :src-list="meme.srcList"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
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
</style>
