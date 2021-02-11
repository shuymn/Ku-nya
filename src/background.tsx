import { getOptions } from './lib/options'
import * as storageUtil from './lib/StorageUtil'

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.method) {
    case 'getOptions':
      sendResponse({ data: getOptions() })
      break
    case 'setMode':
      storageUtil.setValue('content', request.params.mode)
      sendResponse({ data: 'setMode' })
      break
    case 'setAspectRatioSettings':
      storageUtil.setBoolean(
        'is_excluding_high_aspect_ratio',
        request.params.is_excluding_high_aspect_ratio,
      )
      storageUtil.setValue(
        'smallest_includable_aspect_ratio',
        request.params.smallest_includable_aspect_ratio,
      )
      sendResponse({ data: 'setAspectRatioSettings' })
      break
    case 'setExcludingTags':
      storageUtil.setJSON('excluding_tags', request.params.tags)
      sendResponse({ data: 'setExcludingTags' })
      break
    case 'setSafe':
      storageUtil.setBoolean('is_safe', request.params.is_safe)
      sendResponse({ data: 'setSafe', isSafe: request.params.is_safe })
      break
    default:
  }
  return true
})
