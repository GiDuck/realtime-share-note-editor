export function saveSelection(saveCaretPosition, containerEl){

    console.log("range saving....");

    if(window.getSelection().rangeCount < 1) return;
    let range = window.getSelection().getRangeAt(0);

    let selectedRange = range.cloneRange();


    if(selectedRange.collapsed){
        selectedRange.selectNodeContents(containerEl);
        selectedRange.setEnd(range.startContainer, range.startOffset);
        let start = selectedRange.toString().length;
        saveCaretPosition.position = start;
        saveCaretPosition.element = containerEl;
        saveCaretPosition.rangeObj = selectedRange;
    }

}

export function recoverSelection(saveCaretPosition, containerEl){

    console.log("range recovering....");

    let range = document.createRange();
    if(containerEl === undefined || containerEl.childNodes.length < 1) return;

    if(!saveCaretPosition.rangeObj) return;
    range = (saveCaretPosition.rangeObj).cloneRange();

    range.collapse(true);
    let selection = window.getSelection();
    //selection.removeAllRanges();
    selection.addRange(range);

}
