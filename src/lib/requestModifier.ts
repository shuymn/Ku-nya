const refererValue = 'https://www.pixiv.net/'
const refererTarget = 'https://i.pximg.net/*'

const extraInfoSpec = ['requestHeaders', 'blocking', 'extraHeaders']

/** Modifies request Referer HTTP header */
chrome.webRequest.onBeforeSendHeaders.addListener(
  details => {
    let refererFound = false

    for (const n in details.requestHeaders) {
      refererFound =
        details.requestHeaders[Number(n)].name.toLowerCase() == 'referer'

      if (refererFound) {
        // Rewrite Referer header
        details.requestHeaders[Number(n)].value = refererValue
        break
      }
    }

    if (!refererFound) {
      // If no referer header is set, set one
      details.requestHeaders?.push({ name: 'Referer', value: refererValue })
    }
    return { requestHeaders: details.requestHeaders }
  },
  {
    urls: [refererTarget],
  },
  extraInfoSpec,
)
