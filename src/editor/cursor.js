class Cursor {

    element = undefined;
    rangeObj = undefined;



   saveSelection(containerEl) {


        /*if (window.getSelection().rangeCount < 1) return;
        let range = window.getSelection().getRangeAt(0);

        if (range && range.startContainer.nodeType === 3 &&
            range.endContainer.nodeType === 3 &&
            range.startOffset === range.endOffset) {

            let selectedRange = range.cloneRange();
            this.element = containerEl;
            this.rangeObj = selectedRange;


        }*/

    }

    recoverSelection() {

        if (this.rangeObj && this.rangeObj.startContainer.nodeType === 3 &&
            this.rangeObj.endContainer.nodeType === 3 &&
            this.rangeObj.startOffset === this.rangeObj.endOffset) {

            if (!this.element || this.element.childNodes.length < 1 || !this.rangeObj) return;
            let range = (this.rangeObj).cloneRange();
            range.collapse(true);
            let selection = window.getSelection();
            //selection.removeAllRanges();
            selection.addRange(range);

        }

    }




}

export default Cursor;