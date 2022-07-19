function send(type,contents) {
    chrome.runtime.sendMessage({ type: type , contents:contents}, function(response) {
        console.log("content script got a response" + response.message);
    });
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