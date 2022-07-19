function send(type,contents) {
    chrome.runtime.sendMessage({ type: type , contents:contents});
}

document.addEventListener('mouseup',() =>{
    const selected = window.getSelection().toString();
    if (selected.length < 1){
        send("none")
    }
    else {
        console.log(selected);
        send("str",selected);
    }
})