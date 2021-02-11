import axios from 'axios'
import {
  Body,
  Content,
  Illust,
  IllustsDetailResponse,
  IllustsResponse,
  RankingResponse,
} from '../lib/pixiv'

export interface IllustEntry {
  id: number
  imageUrl: string
  title: string
  tags: string[]
  width: number
  height: number
  authorName: string
  sl: number | null
}
const IMAGE_RESOLUTION = '480x960'

const toIllustEntry = (
  content: Illust | Content | Body,
): IllustEntry | null => {
  if (
    'illust_title' in content &&
    typeof content.illust_id !== 'undefined' &&
    typeof content.url !== 'undefined' &&
    typeof content.illust_title !== 'undefined' &&
    typeof content.tags !== 'undefined' &&
    typeof content.illust_width !== 'undefined' &&
    typeof content.illust_height !== 'undefined' &&
    typeof content.user_name !== 'undefined' &&
    typeof content.illust_sanity_level !== 'undefined'
  ) {
    return {
      id: Number(content.illust_id),
      imageUrl: content.url
        .replace(/c\/\d+x\d+_\d+_\w+\//, `c/${IMAGE_RESOLUTION}/`)
        .replace('_square', '_master'),
      title: content.illust_title,
      tags: content.tags,
      width: Number(content.illust_width),
      height: Number(content.illust_height),
      authorName: content.user_name,
      sl: content.illust_sanity_level,
    }
  }

  if ('date' in content) {
    return {
      id: content.illust_id,
      imageUrl: content.url.replace(/c\/\d+x\d+\//, `c/${IMAGE_RESOLUTION}/`),
      title: content.title,
      tags: content.tags,
      width: content.width,
      height: content.height,
      authorName: content.user_name,
      sl: null,
    }
  }

  if ('restrict' in content) {
    return {
      id: Number(content.id),
      imageUrl: content.url
        .replace(/c\/\d+x\d+\//, `c/${IMAGE_RESOLUTION}/`)
        .replace('_square', '_master')
        .replace('250x250_80_a2', '480x960'),
      title: content.title,
      tags: content.tags,
      width: content.width,
      height: content.height,
      authorName: content.userName,
      sl: content.sl,
    }
  }

  return null
}

export const getNewIllusts = async (): Promise<IllustEntry[]> => {
  const URL =
    'https://www.pixiv.net/touch/ajax_api/ajax_api.php?mode=new_illust'
  const responses = await Promise.all(
    [4, 5, 6, 7].map(n => axios.get<IllustsResponse>(`${URL}&p=${n}`)),
  )

  return responses
    .filter(res => res.status === 200)
    .map(res =>
      res.data
        .map(toIllustEntry)
        .filter((entry): entry is Exclude<typeof entry, null> => entry != null),
    )
    .reduce((l, r) => l.concat(...r), []) // flatten
}

export const getPopularIllusts = async (): Promise<IllustEntry[]> => {
  const URL =
    'https://www.pixiv.net/touch/ajax_api/ajax_api.php?mode=popular_illust&type='
  const responses = await Promise.all(
    [1, 2, 3, 4].map(n => axios.get<IllustsResponse>(`${URL}&p=${n}`)),
  )

  return responses
    .filter(res => res.status === 200)
    .map(res =>
      res.data
        .map(toIllustEntry)
        .filter((entry): entry is Exclude<typeof entry, null> => entry != null),
    )
    .reduce((l, r) => l.concat(...r), []) // flatten
}

export const getOriginalRanking = async (): Promise<IllustEntry[]> => {
  const URL = 'https://www.pixiv.net/ranking.php?format=json&mode=original'
  const responses = await Promise.all(
    [1, 2, 3].map(n => axios.get<RankingResponse>(`${URL}&p=${n}`)),
  )

  return responses
    .filter(res => res.status == 200)
    .map(res =>
      res.data.contents
        .map(toIllustEntry)
        .filter((entry): entry is Exclude<typeof entry, null> => entry != null),
    )
    .reduce((l, r) => l.concat(...r), []) // flatten
}

export const getRanking = async (
  content: 'illust' | 'manga' | 'ugoira',
): Promise<IllustEntry[]> => {
  const URL = `https://www.pixiv.net/ranking.php?mode=daily&format=json&content=${content}`
  // cannnot fetch ugoira ranking over page 3.
  const pages = content !== 'ugoira' ? [1, 2, 3] : [1, 2]
  const responses = await Promise.all(
    pages.map(n => axios.get<RankingResponse>(`${URL}&p=${n}`)),
  )

  const id_chunk = responses
    .filter(res => res.status == 200)
    .map(res => res.data.contents.map(content => content.illust_id))

  const promises = await Promise.all(id_chunk.map(ids => getIllustsDetail(ids)))
  return promises.reduce((l, r) => l.concat(...r), []) // flatten
}

const getIllustsDetail = async (ids: Array<number>): Promise<IllustEntry[]> => {
  ids = ids.slice(0, 100) // NOTICE: this can't work over 100 ids because endpoint returns 400.
  const URL = encodeURI(
    `https://www.pixiv.net/ajax/user/11/illusts?ids[]=${ids.join('&ids[]=')}`,
  )

  const responses = await Promise.all([axios.get<IllustsDetailResponse>(URL)])
  return responses
    .filter(res => res.status == 200)
    .map(res => {
      const entities: IllustEntry[] = []
      for (const id in res.data.body) {
        const body = res.data.body[id]
        const entry = toIllustEntry(body)
        if (entry) {
          entities.push(entry)
        }
      }
      return entities
    })
    .reduce((l, r) => l.concat(...r), []) // flatten
}
