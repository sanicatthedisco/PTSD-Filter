console.log("hi");
var mod;

async function init_model() {
    mod = await tf.loadLayersModel("keras/model/model.json");
}

init_model();

chrome.runtime.onMessage.addListener(
    function(arg, send, sendResponse) {
        console.log(arg.imgs[0].src);
        var args = arg.imgs;
        for (var i = 0; i < args.length; i ++) {
            console.log(args[i].source);
            pred = mod.predict(tf.tensor([args[i].data]), {batchSize: 1, verbose: true});
            pred.print();

        }
    }
);
/*
// Define a model for linear regression.
const model = tf.sequential();
model.add(tf.layers.dense({units: 1, inputShape: [1]}));

model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

// Generate some synthetic data for training.
const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);

// Train the model using the data.
model.fit(xs, ys, {epochs: 10}).then(() => {
  // Use the model to do inference on a data point the model hasn't seen before:
  model.predict(tf.tensor2d([5], [1, 1])).print();
  // Open the browser devtools to see the output
});
console.log(model.predict(tf.tensor2d([5], [1, 1])));
console.log("hi");
model.save('downloads://my-model');

/*
a = [];
for (var i = 0; i < 100; i ++) {
    b = []
    for (var j = 0; j < 100; j ++) {
        b.push([0,0,0]);
    }
    a.push(b);
}
var test = tf.tensor([a]);

async function testfunc (img) {
    const mod = await tf.loadLayersModel("keras/model/model.json");
    console.log(mod.predict(img));
    console.log(mod);
}

testfunc(test);
*/
