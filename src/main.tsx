import { h, render } from 'preact'
import App from './components/App'
import './lib/requestModifier'

document.addEventListener('DOMContentLoaded', async () => {
  chrome.runtime.sendMessage({ method: 'getOptions' }, res => {
    const options = {
      mode: res.data.mode,
      excludingTags: res.data.excludingTags,
      isExcludingHighAspectRatio: res.data.isExcludingHighAspectRatio,
      smallestIncludableAspectRatio: res.data.smallestIncludableAspectRatio,
      isSafe: res.data.isSafe,
    }
    const gallery = document.getElementById('gallery')
    if (gallery) {
      render(<App options={options} />, gallery)
    }
  })
})
