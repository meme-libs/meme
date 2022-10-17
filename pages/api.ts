import { camelCaseObjKeys, ResolverOptions } from '@/utils/string'

const config = {
  host: HOST,
  org: ORG,
  repo: REPO
}

const prefix = `${config.host}`

const repoPrefix = `${prefix}/repos/${config.org}/${config.repo}`

const resolveFetch = async (p: Promise<Response>) => {
  const res = await p
  if (res.ok) {
    return res
  } else {
    throw new Error(res.statusText)
  }
}

const resolveJsonFetch = async <T>(p: Promise<Response>, options?: ResolverOptions) => {
  return camelCaseObjKeys(await (
    await resolveFetch(p)
  ).json(), options) as T
}

export namespace Github {
  export interface User {
    login: string
    id: number
    avatarUrl: string
    type: 'User' | 'Organization'
    htmlUrl: string
  }
  export interface Label {
    id: number
    url: string
    name: string
    color: string
    default: boolean
    description: string
  }
  export enum Reactions {
    THUMBS_UP = '+1',
    THUMBS_DOWN = '-1',
    LAUGH = 'laugh',
    HOORAY = 'hooray',
    CONFUSED = 'confused',
    HEART = 'heart',
    ROCKET = 'rocket',
    EYES = 'eyes'
  }
  export function ReactionEmoji(r: Reactions) {
    switch (r) {
      case Reactions.THUMBS_UP:
        return '👍'
      case Reactions.THUMBS_DOWN:
        return '👎'
      case Reactions.LAUGH:
        return '😄'
      case Reactions.HOORAY:
        return '🎉'
      case Reactions.CONFUSED:
        return '😕'
      case Reactions.HEART:
        return '❤️'
      case Reactions.ROCKET:
        return '🚀'
      case Reactions.EYES:
        return '👀'
    }
  }
  export interface Issue {
    id: number
    number: number
    title: string
    user: User
    body: string
    state: 'open' | 'closed'
    labels: Label[]
    comments: number
    createdAt: string
    updatedAt: string
    pullRequest: {
      url: string
      htmlUrl: string
      mergedAt?: string
    }
    reactions: Record<Reactions, number> & {
      url: string
      totalCount: number
    }
  }

  export interface MDInn {
    text: string
    mode: 'markdown' | 'gfm' | 'html' | 'rst'
    context?: string
  }
}

export default {
  repos: {
    async issue(id: number) {
      return resolveJsonFetch<Github.Issue>(fetch(`${repoPrefix}/issues/${id}`), {
        excludes: [ '-1' ]
      })
    }
  },
  async markdown(inn: Github.MDInn | string) {
    const body: Github.MDInn = (typeof inn === 'string') ? {
      text: inn,
      mode: 'gfm'
    } : inn
    body.context ??= `${ORG}/${REPO}`
    return (await resolveFetch(fetch(`${prefix}/markdown`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }))).text()
  }
}
