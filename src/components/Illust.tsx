import { h, Component } from 'preact'
import { IllustEntry } from '../lib/api'

export default class Illust extends Component<{
  illust: IllustEntry
  isReady: boolean
  onload(): void
}> {
  render(): h.JSX.Element {
    const { illust, isReady, onload } = this.props
    return (
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://www.pixiv.net/i/${illust.id}`}
      >
        <img
          className={isReady ? 'loaded' : undefined}
          alt={`${illust.authorName} / ${illust.title}`}
          src={illust.imageUrl}
          ref={(img: HTMLImageElement | null) => {
            img && (img.onload = img.onerror = onload)
          }}
        />
      </a>
    )
  }
}
