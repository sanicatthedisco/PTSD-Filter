var allImages = document.getElementsByTagName("img");
var imgSrcs = [];
for (var i = 0; i < allImages.length; i ++) {
    console.log(allImages[i].src);
    imgSrcs.push(allImages[i].src);
    allImages[i].style.display = "none";
    console.log(allImages[i].getAttribute("display"));
}
var param = {imgs : imgSrcs}
chrome.runtime.sendMessage(param);
