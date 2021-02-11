import { h, render } from 'preact'
import SettingPanel from './components/SettingPanel'

document.addEventListener('DOMContentLoaded', () => {
  chrome.runtime.sendMessage({ method: 'getOptions' }, res => {
    const options = {
      mode: res.data.mode,
      excludingTags: res.data.excludingTags,
      isExcludingHighAspectRatio: res.data.isExcludingHighAspectRatio,
      smallestIncludableAspectRatio: res.data.smallestIncludableAspectRatio,
      isSafe: res.data.isSafe,
    }
    const setting = document.getElementById('setting')
    if (setting) {
      render(<SettingPanel initialOptions={options} />, setting)
    }
  })
})
