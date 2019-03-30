class Image {
  constructor(o,s,n,d) {
    this.object = o;
    this.source = s;
    this.id = n;
    this.display = d;
  }

  unblock() {
    this.object.style.display = this.display;
  }
}

var allImages = document.getElementsByTagName("img");
var imgSrcs = [];
var imageObs = [];
for (var i = 0; i < allImages.length; i ++) {
    console.log(allImages[i].src);
    imgSrcs.push(allImages[i].src);
    imageObs.push(new Image(allImages[i],allImages[i].src,i,allImages[i].getAttribute("display")));
    allImages[i].style.display = "none";
    console.log(allImages[i].getAttribute("display"));
}
var param = {imgs : imgSrcs}
chrome.runtime.sendMessage(param);

for (var i = 0; i < imageObs.length; i++) {
  imageObs[i].unblock();
}
