chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request="highlight") {
            highlightSelection()
            sendResponse(selection.toString())
        }
    }
)

function highlightSelection() {
    selection = window.getSelection()
    range = selection.getRangeAt(0)
    node = document.createElement("span")
    node.style.backgroundColor = "yellow"
    range.surroundContents(node)
}
