import * as Sentry from '@sentry/browser'
import { h, Component } from 'preact'
import Illust from '../components/Illust'
import {
  IllustEntry,
  getOriginalRanking,
  getNewIllusts,
  getPopularIllusts,
  getRanking,
} from '../lib/api'
import { Options, Modes } from '../lib/options'
import { shuffle } from '../lib/util'

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
  })
}

interface Props {
  options: Options
}

interface State {
  illusts: IllustEntry[]
  isReady: boolean
}

export default class App extends Component<Props, State> {
  private pendingCount = 0

  constructor(props: Props) {
    super(props)
    this.state = {
      illusts: [],
      isReady: false,
    }
  }

  async componentWillMount(): Promise<void> {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js')
      // .then(registration => {
      // console.log('ServiceWorker registration successful with scope: ', registration.scope);
      // })
      // .catch(err => {
      // console.log('ServiceWorker registration failed: ', err);
      // })
    }

    const { options } = this.props
    const allIllusts = await this.loadContent(options)

    const illusts = shuffle(allIllusts)
      .filter(illust => {
        // reject if contains tags to be excluded
        return !illust.tags.some(tag => options.excludingTags.includes(tag))
      })
      .filter(
        illust =>
          illust.height / illust.width <= options.smallestIncludableAspectRatio,
      )
      .filter(illust => {
        if (illust.sl === null) return true
        if (options.isSafe) return illust.sl === 2
        return true
      })

    this.setState({ illusts })
    this.pendingCount = illusts.length
  }

  loadContent(options: Options): Promise<IllustEntry[]> {
    const { mode } = options

    switch (mode) {
      case Modes.Original:
        return getOriginalRanking()
      case Modes.Newer:
        return getNewIllusts()
      case Modes.Popular:
        return getPopularIllusts()
      default:
        return getRanking(mode)
    }
  }

  handleLoadOrError = (): void => {
    if (--this.pendingCount <= 0) {
      setTimeout(() => {
        this.setState({ isReady: true })
      }, 25)
    }
  }

  render(): h.JSX.Element {
    const { illusts, isReady } = this.state
    return (
      <div>
        {
          // TODO: Remove element when error occurred
          illusts.map(illust => (
            <Illust
              key={illust.id}
              isReady={isReady}
              illust={illust}
              onload={this.handleLoadOrError}
            />
          ))
        }
      </div>
    )
  }
}
