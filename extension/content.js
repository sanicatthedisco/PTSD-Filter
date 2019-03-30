var allImages = document.getElementsByTagName("img");
for (var i = 0; i < allImages.length; i ++) {
    console.log(allImages[i].src);
    chrome.downloads.download({
        "url": allImages[i].src
    });
}
