// the number of API responses checked in creating this is small.
// so it's likely not the exact type.

export type IllustsResponse = Illust[]

export type Illust = {
  illust_id?: string
  illust_user_id?: string
  illust_title?: string
  illust_ext?: IllustExt
  illust_width?: string
  illust_height?: string
  illust_restrict?: string
  illust_x_restrict?: string
  illust_create_date?: string
  illust_upload_date?: string
  illust_server_id?: string
  illust_hash?: null
  illust_type?: string
  illust_sanity_level?: number
  illust_book_style?: string
  illust_page_count?: string
  illust_custom_thumbnail_upload_datetime?: null | string
  illust_tag_full_lock?: string
  user_account?: string
  user_name?: string
  is_manga?: boolean
  url?: string
  illust_content_type?: IllustContentType
  tags?: string[]
  illust_series?: boolean
  is_ad_container?: number
}

export type IllustContentType = {
  sexual: number
  lo: boolean
  grotesque: boolean
  violent: boolean
  homosexual: boolean
  drug: boolean
  thoughts: boolean
  antisocial: boolean
  religion: boolean
  original: boolean
  furry: boolean
  bl: boolean
  yuri: boolean
}

export const IllustExt = {
  JPG: 'jpg',
  PNG: 'png',
} as const
// eslint-disable-next-line no-redeclare
export type IllustExt = typeof IllustExt[keyof typeof IllustExt]

export type RankingResponse = {
  contents: Content[]
  mode: Mode
  content: string
  page: number
  prev: boolean
  next: number
  date: string
  prev_date: string
  next_date: boolean
  rank_total: number
}

export type Content = {
  title: string
  date: string
  tags: string[]
  url: string
  illust_type: string
  illust_book_style: string
  illust_page_count: string
  user_name: string
  profile_img: string
  illust_content_type: IllustContentType
  illust_series: boolean | IllustSeriesClass
  illust_id: number
  width: number
  height: number
  user_id: number
  rank: number
  yes_rank: number
  rating_count: number
  view_count: number
  illust_upload_timestamp: number
  attr: Attr
}

export type IllustSeriesClass = {
  illust_series_id: string
  illust_series_user_id: string
  illust_series_title: string
  illust_series_caption: string
  illust_series_content_count: string
  illust_series_create_datetime: string
  illust_series_content_illust_id: string
  illust_series_content_order: string
  page_url: string
}

export const Mode = {
  Empty: '',
  Original: 'original',
} as const
// eslint-disable-next-line no-redeclare
export type Mode = typeof Mode[keyof typeof Mode]

export const Attr = {
  Empty: '',
  LoFurry: 'lo furry',
  Original: 'original',
}
// eslint-disable-next-line no-redeclare
export type Attr = typeof Attr[keyof typeof Attr]

export type IllustsDetailResponse = {
  error: boolean
  message: string
  body: { [key: string]: Body }
}

export type Body = {
  id: string
  title: string
  illustType: number
  xRestrict: number
  restrict: number
  sl: number
  url: string
  description: string
  tags: string[]
  userId: string
  userName: string
  width: number
  height: number
  pageCount: number
  isBookmarkable: boolean
  bookmarkData: null
  alt: string
  titleCaptionTranslation: TitleCaptionTranslation
  createDate: string
  updateDate: string
  isUnlisted: boolean
  isMasked: boolean
  profileImageUrl: string
}

export type TitleCaptionTranslation = {
  workTitle: string
  workCaption: string
}
