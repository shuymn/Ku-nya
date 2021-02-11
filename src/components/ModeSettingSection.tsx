import { h, Component } from 'preact'
import SettingSection from '../components/SettingSection'
import { Modes } from '../lib/options'

interface Props {
  initialValue: Modes
  update(mode: Modes): void
}

interface State {
  value: Modes
}

export default class ModeSettingSection extends Component<Props, State> {
  private selectableOptions: Array<Modes> = [
    Modes.Illust,
    Modes.Manga,
    Modes.Original,
    Modes.Ugoira,
    Modes.Newer,
    Modes.Popular,
  ]

  constructor(props: Props) {
    super(props)
    this.state = {
      value: props.initialValue,
    }
  }

  handleModeChange = (ev: Event): void => {
    const { update } = this.props
    const value = (ev.target as HTMLSelectElement).value as Modes
    this.setState({ value })
    update(value)
  }

  render(): h.JSX.Element {
    const {
      handleModeChange,
      state: { value },
    } = this

    return (
      <SettingSection title="Ranking Mode">
        <label htmlFor="content-selector">Ranking mode:</label>
        <select id="content-selector" value={value} onChange={handleModeChange}>
          {this.selectableOptions.map(selectable => (
            <option key={selectable} value={selectable}>
              {selectable}
            </option>
          ))}
        </select>
      </SettingSection>
    )
  }
}
