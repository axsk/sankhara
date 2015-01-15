chrome.contextMenus.create({
    "title": "Highlight this", 
    "contexts":["selection"], 
    "id":"highlight"
})
                                                                           
function contextMenuHandler(info, tab) {
    if (info.menuItemId == "highlight") {
        chrome.tabs.sendMessage(
            tab.id,
            "highlight",
            selectionResponse)
    }   
}

function selectionResponse(response) {
    
}

chrome.contextMenus.onClicked.addListener(contextMenuHandler)