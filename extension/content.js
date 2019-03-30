class Image {
  constructor(o,n,d) {
    this.object = o;
    this.source = o.src;
    this.id = n;
    this.data = d;
    this.display = o.getAttribute("display");
  }
  unblock() {
    this.object.style.display = this.display;
  }
  block() {
    this.object.style.display = "none";
  }
}

function getDataFromImage(img) {
    /*
    var c = document.createElement("canvas");
    c.width = img.width;
    c.height = img.height;

    var ctx1 = c.getContext("2d");
    ctx1.drawImage(img, 0, 0);

    var strDataURI = c.toDataURL();
    var img2 = new Image;
    img2.onload = function () {
        ctx.drawImage(img2, 0, 0);
    }
    img2.src = strDataURI;
    */

    var canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 100;

    var ctx = canvas.getContext("2d");
    ctx.scale(100 / img.width, 100 / img.height);
    ctx.drawImage(img, 0, 0);

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    var pixels = imageData.data;
    var w = imageData.width;
    var h = imageData.height;

    var l = w * h;
    processedData = [];

    for (var i = 0; i < w; i ++) {
        a = [];
        for (var j = 0; j < h; j ++) {
            a.push([0, 0, 0]);
        }
        processedData.push(a);
    }

    for (var i = 0; i < l; i++) {
        // get color of pixel
        var r = pixels[i*4]; // Red
        var g = pixels[i*4+1]; // Green
        var b = pixels[i*4+2]; // Blue
        var a = pixels[i*4+3]; // Alpha

        // get the position of pixel
        var y = parseInt(i / w, 10);
        var x = i - y * w;

        processedData[x][y][0] = r/255;
        processedData[x][y][1] = g/255;
        processedData[x][y][2] = b/255;
    }

    return processedData;
}

var allImages = document.getElementsByTagName("img");
var imgSrcs = [];
var imageObs = [];
for (var i = 0; i < allImages.length; i ++) {
    console.log(allImages[i].src);
    imageObs.push(new Image(allImages[i], i, getDataFromImage(allImages[i])));
    imageObs[i].block();
    console.log(allImages[i].getAttribute("display"));
}
var param = {imgs : imageObs}
chrome.runtime.sendMessage(param);

//Testing unblock method
for (var i = 0; i < imageObs.length; i++) {
  imageObs[i].unblock();
}

d = getDataFromImage(allImages[0]);

console.log(d);

c = document.createElement("canvas");
c.width = 100;
c.height = 100;
ctx = c.getContext("2d");

document.getElementById("bdy").appendChild(c);

for (var x = 0; x < 100; x ++) {
    for (var y = 0; y < 100; y ++) {
        var r = d[x][y][0] * 255;
        var g = d[x][y][1] * 255;
        var b = d[x][y][2] * 255;
        console.log(r);

        ctx.fillStyle = "rgb("+r+","+g+","+b+")";
        console.log(ctx.fillStyle);
        ctx.fillRect(x, y, 1, 1);
    }
}
