chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request=="highlightSelected") {
        	selected = serializeSelection()        	
            sendResponse(selected)
            updateHighlights([selected])
        }
    }
)

getHighlights()

function getHighlights() {
	// request highlights for current page
	chrome.runtime.sendMessage("getHighlights", function(ranges) { updateHighlights(ranges) })
}

function serializeSelection() {
	selection = window.getSelection()
    // alternatively hash each node by its content
    return serializeRange(selection.getRangeAt(0))
}

function updateHighlights(ranges) {
	// remove old highlight spans
	// insert new highlight spans
	
	for (var i=0, range; range = ranges[i]; i++) {
		ranges[i] = deserializeRange(range)
	}
	
    for (var i=0, range; range = ranges[i]; i++) {
    	node = document.createElement("span")
    	node.style.backgroundColor = "yellow"
		range.surroundContents(node)
    }	
}

function serializeRange(range) {
	return {start: {offset: range.startOffset, xpath:  getXPathForElement(range.startContainer)},
	 	    end:   {offset: range.endOffset,   xpath:  getXPathForElement(range.endContainer)}   }
}

function deserializeRange(serializedRange) {
	range = document.createRange()
	range.setStart(lookupElementByXPath(serializedRange.start.xpath), serializedRange.start.offset)
	range.setEnd  (lookupElementByXPath(serializedRange.end.xpath),   serializedRange.end.offset)
	return range
}

function lookupElementByXPath(path) {
    var evaluator = new XPathEvaluator(); 
    var result = evaluator.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null); 
    return  result.singleNodeValue; 
} 

function getXPathForElement(el) {
	var xpath = '';
	var pos, tmp;
	while(el !== null && el.nodeType !== 9) {		
		pos = 0;
		tmp = el;
		while(tmp) {
			if (tmp.nodeType === el.nodeType && tmp.nodeName === el.nodeName) { // If it is ELEMENT_NODE of the same name
				pos += 1;
			}
			tmp = tmp.previousSibling;
		}
		if (el.nodeType !== 3) 
			xpath = '/'+el.nodeName+'['+pos+']' + xpath;
		else
			xpath = '/text()['+pos+']' + xpath;
		
		el = el.parentNode;
	}
	return xpath;
}