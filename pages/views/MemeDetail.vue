<template>
  <div class="meme-with-autor">
    <el-card class="meme">
      <meme
        :title="meme.title"
        :src-list="meme.srcList"
      />
      <div class="meta">
        <el-row>
          <el-col :span="8">
            创建时间: {{ new Date(issue?.createdAt).toLocaleString() }}
          </el-col>
          <el-col :span="8">
            更新时间: {{ new Date(issue?.updatedAt).toLocaleString() }}
          </el-col>
          <el-col :span="8"
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
      </div>
    </el-card>
    <div class="autor-meta">
      <el-avatar
        :src="issue?.user.avatarUrl"
      />
      {{ issue?.user.login }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { ElAvatar, ElBadge, ElButton, ElCol, ElCard, ElRow } from 'element-plus'
import api, { Github } from '@/api'
import Meme from '@/components/meme.vue'

const props = defineProps<{
  idOrTitle: string
}>()

const id = computed(() => Number.isInteger(+props.idOrTitle)
  ? +props.idOrTitle
  : undefined
)

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
  > div.el-card {
    :deep(div.el-card__body) > .meme {
      > .el-carousel > .el-carousel__container {
        height: 75vh;
        .el-carousel__item img {
          height: 100%;
        }
      }
    }
    div.meta {
      margin-top: 15px;
      > div.el-row > div.el-col {
        display: flex;
        align-items: center;
      }
    }
  }
  > div.autor-meta {
    padding: 10px;
    max-width: 20vw;
    min-width: 20vw;
  }
}
</style>
