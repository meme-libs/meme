<template>
  <div class="meme-with-author">
    <el-card class="detail">
      <meme
        :id="meme.id"
        :title="meme.title"
        :src-list="meme.srcList"
        v-model:value="memeIndex"
      />
      <div class="meta">
        <el-row>
          <el-col :span="12" :xs="24">
            <h2>
              <a :href="issue?.pullRequest?.htmlUrl" target="_blank">
                {{ meme.title }}
              </a>
            </h2>
          </el-col>
          <el-col :span="12" :xs="24">
            <el-badge
              type="primary"
              v-for="reaction in Github.Reactions" :key="reaction"
              :value="issue?.reactions?.[reaction] ?? 0"
            >
              <el-button size="small">{{ Github.ReactionEmoji(reaction) }}</el-button>
            </el-badge>
          </el-col>
        </el-row>
        <el-skeleton
          :animated="animated.issue"
          :loading="loading.issue"
        >
          <template #template>
            <el-row>
              <el-skeleton-item variant="text" />
            </el-row>
            <el-row>
              <el-col :span="8"></el-col>
              <el-col :span="8"><el-skeleton-item variant="text" style="margin-left: 50%; width: 50%;" /></el-col>
              <el-col :span="8"><el-skeleton-item variant="text" style="margin-left: 50%; width: 50%;" /></el-col>
            </el-row>
          </template>
          <el-row>
            <span class="markdown-body" v-if="descMD" v-html="descMD" />
            <span class="markdown-body" v-else v-text="issue?.body" />
          </el-row>
          <el-row>
            <el-col :span="8" :xs="0"></el-col>
            <el-col :span="8" style="justify-content: end;" :xs="12">
              创建时间: {{ new Date(issue?.createdAt).toLocaleString() }}
            </el-col>
            <el-col :span="8" style="justify-content: end;" :xs="12">
              更新时间: {{ new Date(issue?.updatedAt).toLocaleString() }}
            </el-col>
          </el-row>
        </el-skeleton>
      </div>
    </el-card>
    <div class="other-meta">
      <el-skeleton
        :animated="animated.issue"
        :loading="loading.issue"
        :style="{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '10px',
        }"
      >
        <template #template>
          <div style="
            display: flex;
            align-items: center;">
            <el-skeleton-item
              variant="image"
              style="height: 32px; min-width: 32px; border-radius: 50%;"
            />
            <el-skeleton-item
              variant="p"
              style="margin-left: 10px;"
            />
          </div>
          <el-button type="primary" disabled style="width: 100%;">关注</el-button>
          <div class="tags">
            <el-skeleton-item
              variant="p"
              style="width: 40px;"
            />
            <el-skeleton-item
              variant="p"
              style="width: 40px;"
            />
          </div>
        </template>
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
          <template v-if="!issue?.labels">
            暂无标签
          </template>
        </div>
      </el-skeleton>
    </div>
  </div>
  <div id="utteranc"/>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import {
  ElAvatar,
  ElBadge,
  ElButton,
  ElCol,
  ElCard,
  ElTag,
  ElTooltip,
  ElRow,
  ElSkeleton,
  ElSkeletonItem, ElMessage
} from 'element-plus'
import api, { Github } from '@/api'
import Meme from '@/components/meme.vue'
import { getHSL, getRGB } from '@/utils/color'
import { useDark } from '@vueuse/core'

const loading = reactive({
  issue: true
})

const animated = reactive({
  issue: true
})

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

const isDark = useDark()

const theme = computed(() => isDark.value ? 'github-dark' : 'github-light')

const script = document.createElement('script')
script.src = 'https://utteranc.es/client.js'
script.setAttribute('repo', `${ ORG }/${ REPO }`)
script.setAttribute('theme', theme.value)
script.setAttribute('crossorigin', 'anonymous')
script.setAttribute('async', 'true')

function rerenderUtteranc() {
  const utteranc = document.getElementById('utteranc')
  if (utteranc) {
    utteranc.innerHTML = ''
    utteranc.appendChild(script)
  }
}

watch(id, async () => {
  if (!id.value) return

  script.setAttribute('issue-number', id.value.toString())
  rerenderUtteranc()

  loading.issue = true
  animated.issue = true
  try {
    issue.value = await api.repos.issue(id.value)
  } catch (e) {
    if (e instanceof Error) {
      ElMessage.error(e.message)
    } else {
      ElMessage.error('未知错误')
    }
    setTimeout(() => animated.issue = false, 500)
    return
  }
  setTimeout(() => loading.issue = false, 500)
}, { immediate: true })

const descMD = ref<string>()

watch(() => issue.value?.body, async () => {
  if (!issue.value?.body) return

  try {
    descMD.value = await api.markdown(issue.value.body)
  } catch (e) {
    if (e instanceof Error) {
      ElMessage.error(e.message)
    } else {
      ElMessage.error('未知错误')
    }
  }
})

onMounted(() => {
  rerenderUtteranc()
})

function getMemeIndex() {
  const hashV = window.location.hash?.slice(1)
  let i = Number(hashV)
  if (!Number.isInteger(i)) {
    i = meme.value?.srcList.findIndex(src => src.indexOf(hashV)) ?? 0
  }
  return i
}

const memeIndex = ref(getMemeIndex())
</script>

<style lang="scss" scoped>
div.meme-with-author {
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
      display: flex;
      flex-direction: column;
      row-gap: 10px;
      padding: 20px;
      > div.el-row {
        div.el-col:last-child {
          justify-content: end;
          column-gap: 15px;
        }
      }
      > div.el-skeleton {
        display: flex;
        flex-direction: column;
        row-gap: 20px;
      }
      > div.el-row {
        min-height: 20px;
        line-height: 20px;
      }
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
    div.tags {
      display: flex;
      flex-wrap: wrap;
      column-gap: 10px;
      min-height: 40px;
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
.markdown-body {
  font-size: 14px;
  background-color: transparent;
}
#utteranc > :deep(div.utterances) {
  margin: 0;
  max-width: 100%;
}
</style>

<style lang="scss" scoped>
@media screen and (max-width: 400px) {
  div.meme-with-author {
    flex-direction: column;
    > div.el-card.detail {
      div.meta {
        > div.el-row {
          div.el-col:last-child {
            flex-wrap: wrap;
            justify-content: flex-start;
            gap: 15px;
          }
        }
      }
    }
    > div.other-meta {
      max-width: 100%;
      min-width: 100%;
      div.tags {
        min-height: 0px;
      }
    }
  }
}
</style>
