// Load and parse CSV
async function loadCSV() {
    return new Promise((resolve, reject) => {
        Papa.parse('water_footprint.csv', {
            download: true,
            header: true,
            complete: (result) => resolve(result.data),
            error: (error) => reject(error)
        });
    });
}

// Label encoding and normalization
let cropLabels, regionLabels, minArea, maxArea, minGreen, maxGreen, minBlue, maxBlue, minGrey, maxGrey;

async function prepareData() {
    const csvData = await loadCSV();
    
    cropLabels = [...new Set(csvData.map(row => row.crop))];
    regionLabels = [...new Set(csvData.map(row => row.region))];
    
    const areaHectares = csvData.map(row => parseFloat(row.area_hectares));
    const greenWater = csvData.map(row => parseFloat(row.green_water));
    const blueWater = csvData.map(row => parseFloat(row.blue_water));
    const greyWater = csvData.map(row => parseFloat(row.grey_water));

    minArea = Math.min(...areaHectares);
    maxArea = Math.max(...areaHectares);
    minGreen = Math.min(...greenWater);
    maxGreen = Math.max(...greenWater);
    minBlue = Math.min(...blueWater);
    maxBlue = Math.max(...blueWater);
    minGrey = Math.min(...greyWater);
    maxGrey = Math.max(...greyWater);

    const X = csvData.map(row => [
        encodeLabels(row.crop, cropLabels),
        encodeLabels(row.region, regionLabels),
        normalize(parseFloat(row.area_hectares), minArea, maxArea)
    ]);

    const y = csvData.map(row => [
        normalize(parseFloat(row.green_water), minGreen, maxGreen),
        normalize(parseFloat(row.blue_water), minBlue, maxBlue),
        normalize(parseFloat(row.grey_water), minGrey, maxGrey)
    ]);

    return { X, y };
}

function encodeLabels(value, labels) {
    return labels.indexOf(value);
}

function normalize(value, min, max) {
    return (value - min) / (max - min);
}

function denormalize(value, min, max) {
    return value * (max - min) + min;
}

// Enhanced ML Model
const model = tf.sequential();
model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [3] }));
model.add(tf.layers.batchNormalization());
model.add(tf.layers.dropout({ rate: 0.2 }));
model.add(tf.layers.dense({ units: 128, activation: 'relu' }));
model.add(tf.layers.batchNormalization());
model.add(tf.layers.dropout({ rate: 0.2 }));
model.add(tf.layers.dense({ units: 64, activation: 'relu' }));
model.add(tf.layers.batchNormalization());
model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
model.add(tf.layers.dense({ units: 3, activation: 'sigmoid' }));

model.compile({
    optimizer: tf.train.adam(0.001),
    loss: 'meanSquaredError',
    metrics: ['accuracy']
});

// Train the model
async function trainModel() {
    console.log("Training model...");
    const { X, y } = await prepareData();
    const XTensor = tf.tensor2d(X, [X.length, 3]);
    const yTensor = tf.tensor2d(y, [y.length, 3]);

    await model.fit(XTensor, yTensor, {
        epochs: 200,
        batchSize: 64,
        shuffle: true,
        validationSplit: 0.2,
        callbacks: {
            onEpochEnd: (epoch, logs) => {
                console.log(`Epoch ${epoch + 1}: Loss = ${logs.loss.toFixed(4)}`);
            },
            earlyStopping: tf.callbacks.earlyStopping({
                monitor: 'val_loss',
                patience: 10
            })
        }
    });

    console.log("Model training completed.");
    XTensor.dispose();
    yTensor.dispose();
}

// Predict Water Footprint
async function predictWaterFootprint(crop, region, area) {
    const input = [
        encodeLabels(crop, cropLabels),
        encodeLabels(region, regionLabels),
        normalize(area, minArea, maxArea)
    ];

    const inputTensor = tf.tensor2d([input], [1, 3]);
    const prediction = model.predict(inputTensor);
    const predictedValues = await prediction.data();

    const greenWater = denormalize(predictedValues[0], minGreen, maxGreen) * area;
    const blueWater = denormalize(predictedValues[1], minBlue, maxBlue) * area;
    const greyWater = denormalize(predictedValues[2], minGrey, maxGrey) * area;
    const totalWater = greenWater + blueWater + greyWater;

    inputTensor.dispose();
    prediction.dispose();

    return { greenWater, blueWater, greyWater, totalWater };
}

// Train model on page load
trainModel();