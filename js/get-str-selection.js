function send(type,contents) {
    chrome.runtime.sendMessage({ type: type , contents:contents}, function() {});
}

document.addEventListener('mouseup',() =>{
    const selectedText = window.getSelection().toString();
    if (selectedText.length < 1){
        send("none")
    }
    else {
        console.log(selectedText);
        send("str",selectedText);
    }
})