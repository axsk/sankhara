chrome.contextMenus.create({"title": "Highlight this", "contexts":["selection"], "id":"highlight"})
chrome.contextMenus.onClicked.addListener( 
    function(info, tab) {
        if (info.menuItemId == "highlight")
            chrome.tabs.sendMessage(tab.id, "highlightSelected", addHighlight)
    })

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request == "getHighlights")
        highlights = getHighlights(sender.tab.url)
        sendResponse(highlights)
  })

testrange =   {start: {offset: 20, xpath:"/HTML[1]/BODY[1]/P[1]/text()[1]"}, end: {offset: 30, xpath: "/HTML[1]/BODY[1]/P[1]/text()[1]"}}
testrange2 = {start: {offset: 40, xpath:"/HTML[1]/BODY[1]/P[1]/text()[1]"}, end: {offset: 60, xpath: "/HTML[1]/BODY[1]/P[1]/text()[1]"}}

ranges = []
ranges.push(testrange)
ranges.push(testrange2)

function addHighlight(range) {
    ranges.push(range)
}

function getHighlights(url) {
    return ranges
}
