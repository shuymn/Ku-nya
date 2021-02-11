import { h, Component } from 'preact'

interface Props {
  label: string
  placeholder: string
  add(value: string): void
}

interface State {
  value: string
}

export default class TagInput extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { value: '' }
  }

  handleChange = (ev: Event): void => {
    const target = ev.target as HTMLInputElement
    this.setState({ value: target.value })
  }

  handleAddClick = (): void => {
    const {
      props: { add },
      state: { value },
    } = this
    add(value)
    this.setState({ value: '' })
  }

  render(): h.JSX.Element {
    const {
      props: { label, placeholder },
      state: { value },
      handleChange,
      handleAddClick,
    } = this

    return (
      <span>
        <label>
          {label}
          <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
          />
        </label>
        <button onClick={handleAddClick}>Add</button>
      </span>
    )
  }
}
