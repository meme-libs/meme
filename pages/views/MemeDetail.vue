<template>
  <div class="meme-with-autor">
    <el-card class="detail">
      <meme
        :title="meme.title"
        :src-list="meme.srcList"
      />
      <div class="meta">
        <el-row>
          <el-col :span="12">
            <h2>
              <a :href="issue?.pullRequest.htmlUrl" target="_blank">
                {{ meme.title }}
              </a>
            </h2>
          </el-col>
          <el-col :span="12"
                  style="justify-content: end; column-gap: 15px;">
            <el-badge
              type="primary"
              v-for="reaction in Github.Reactions" :key="reaction"
              :value="issue?.reactions[reaction]"
            >
              <el-button size="small">{{ Github.ReactionEmoji(reaction) }}</el-button>
            </el-badge>
          </el-col>
        </el-row>
        <el-row>
          {{ issue?.body }}
        </el-row>
        <el-row>
          <el-col :span="8"></el-col>
          <el-col :span="8" style="justify-content: end;">
            创建时间: {{ new Date(issue?.createdAt).toLocaleString() }}
          </el-col>
          <el-col :span="8" style="justify-content: end;">
            更新时间: {{ new Date(issue?.updatedAt).toLocaleString() }}
          </el-col>
        </el-row>
      </div>
    </el-card>
    <div class="other-meta">
      <div class="author">
        <el-avatar
          :src="issue?.user.avatarUrl"
        />
        <h3 class="username">
          <a :href="issue?.user.htmlUrl" target="_blank">{{ issue?.user.login }}</a>
        </h3>
      </div>
      <el-button type="primary" @click="toUserProfile">关注</el-button>
      <div class="tags">
        <el-tooltip
          v-for="tag in issue?.labels" :key="tag"
          :content="tag.description"
        >
          <el-tag round :style="tagStyle(tag.color)">
            {{ tag.name }}
          </el-tag>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { ElAvatar, ElBadge, ElButton, ElCol, ElCard, ElTag, ElTooltip, ElRow } from 'element-plus'
import api, { Github } from '@/api'
import Meme from '@/components/meme.vue'

function getRGB(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  return [r, g, b]
}

function getHSL(hex: string): [number, number, number] {
  let [r, g, b] = getRGB(hex)
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0, l = (max + min) / 2

  if(max !== min){
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return [Math.round(h * 360), Math.round(s * 100) | 0, Math.round(l * 100) | 0]
}

function tagStyle(hex: string) {
  const [r, g, b] = getRGB(hex)
  const [h, s, l] = getHSL(hex)
  return `
    --label-r: ${r};
    --label-g: ${g};
    --label-b: ${b};
    --label-h: ${h};
    --label-s: ${s};
    --label-l: ${l};
  `
}

function toUserProfile() {
  window.open(issue.value?.user.htmlUrl, '_blank')
}

const props = defineProps<{
  idOrTitle: string
}>()

const id = computed(() => Number.isInteger(+props.idOrTitle)
  ? +props.idOrTitle
  : undefined)

const meme = computed(() => {
  return MEMES.find(m => m.id === id.value || m.title === props.idOrTitle)
})

const issue = ref<Github.Issue>()

watch(id, async () => {
  if (!id.value) return

  issue.value = await api.repos.issue(id.value)
}, { immediate: true })
</script>

<style lang="scss" scoped>
div.meme-with-autor {
  display: flex;
  > div.el-card.detail {
    :deep(div.el-card__body) {
      padding: 0;
    }
    :deep(div.el-card__body) > .meme {
      > .el-carousel > .el-carousel__container {
        height: 75vh;
        .el-carousel__item img {
          height: 100%;
        }
      }
    }
    div.meta {
      padding: 20px;
      > div.el-row > div.el-col {
        display: flex;
        align-items: center;
      }
    }
  }
  > div.other-meta {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    padding: 10px;
    max-width: 20vw;
    min-width: 20vw;
    > div.author {
      display: flex;
      align-items: center;
      > h3.username {
        margin-left: 10px;
      }
    }
    // stylelint-disable max-line-length
    > div.tags > :deep(.el-tag) {
      --perceived-lightness: calc(((var(--label-r) * 0.2126) + (var(--label-g) * 0.7152) + (var(--label-b) * 0.0722)) / 255);
      --lightness-switch: max(0, min(calc((var(--perceived-lightness) - var(--lightness-threshold)) * -1000), 1));
      --lightness-threshold: 0.6;
      --background-alpha: 0.18;
      --border-alpha: 0.3;
      --lighten-by: calc(((var(--lightness-threshold) - var(--perceived-lightness)) * 100) * var(--lightness-switch));

      color: hsl(var(--label-h) calc(var(--label-s) * 1%) calc((var(--label-l) + var(--lighten-by)) * 1%));
      background: rgb(var(--label-r) var(--label-g) var(--label-b) / var(--background-alpha));
      border-color: hsl(var(--label-h) calc(var(--label-s) * 1%) calc((var(--label-l) + var(--lighten-by)) * 1%) / var(--border-alpha));
    }
    // stylelint-enable max-line-length
  }
}
</style>
