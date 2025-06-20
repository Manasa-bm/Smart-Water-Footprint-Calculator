// Crop data with detailed information
const cropData = {
    Rice: {
        name: "Rice",
        description: "Staple food for half the world's population, primarily grown in flooded fields.",
        image: "https://th.bing.com/th/id/OIP.W7OjKTKCGC2-XdKk2dxpeAHaE7?w=290&h=192&c=7&r=0&o=7&cb=iwp2&dpr=1.3&pid=1.7&rm=3",
        growthDuration: "120-150 days",
        waterSensitivity: 85,
        stages: [
            { name: "Seedling", duration: "Days 0-20", waterNeed: 3, description: "Requires consistent shallow flooding (2-5cm) for proper establishment.", icon: "fa-seedling" },
            { name: "Tillering", duration: "Days 20-60", waterNeed: 3, description: "Critical growth phase needing 5-10cm water depth for maximum tiller production.", icon: "fa-leaf" },
            { name: "Reproductive", duration: "Days 60-90", waterNeed: 3, description: "Flowering stage requiring careful water management to prevent stress.", icon: "fa-spa" },
            { name: "Ripening", duration: "Days 90-120", waterNeed: 2, description: "Gradual water reduction to 0cm by harvest time for proper grain filling.", icon: "fa-wheat-alt" }
        ],
        tips: [
            "Alternate wetting and drying can reduce water use by 15-30% without yield loss",
            "Use laser leveling to ensure uniform water distribution across fields",
            "Adopt System of Rice Intensification (SRI) for better water productivity"
        ]
    },
    Wheat: {
        name: "Wheat",
        description: "The most widely grown cereal crop, adaptable to various climates.",
        image: "https://th.bing.com/th/id/OIP.HyZnHIfotmj1udm1MAhwsQHaEo?w=270&h=180&c=7&r=0&o=7&cb=iwp2&dpr=1.3&pid=1.7&rm=3",
        growthDuration: "90-110 days",
        waterSensitivity: 60,
        stages: [
            { name: "Germination", duration: "Days 0-15", waterNeed: 2, description: "Requires moist soil but not waterlogged conditions for proper emergence.", icon: "fa-seedling" },
            { name: "Tillering", duration: "Days 15-45", waterNeed: 3, description: "Adequate moisture needed for maximum tiller development and survival.", icon: "fa-leaf" },
            { name: "Stem Extension", duration: "Days 45-70", waterNeed: 3, description: "Critical period for yield determination requiring sufficient water.", icon: "fa-arrow-up" },
            { name: "Ripening", duration: "Days 70-90", waterNeed: 1, description: "Reduced water needs during grain filling to prevent lodging.", icon: "fa-wheat-alt" }
        ],
        tips: [
            "Deficit irrigation during less sensitive growth stages can save 20-40% water",
            "Use soil moisture sensors to optimize irrigation timing",
            "Mulching helps retain soil moisture and reduce evaporation losses"
        ]
    },
    Maize: {
        name: "Maize",
        description: "Versatile crop used for food, feed, and industrial products worldwide.",
        image: "https://ts1.mm.bing.net/th?id=OIP.9iSzm_T3_zpKXhdmF-9EjQHaEK&pid=15.1",
        growthDuration: "90-120 days",
        waterSensitivity: 70,
        stages: [
            { name: "Emergence", duration: "Days 0-10", waterNeed: 2, description: "Uniform moisture needed for even stand establishment.", icon: "fa-seedling" },
            { name: "Vegetative", duration: "Days 10-45", waterNeed: 3, description: "Rapid growth phase requiring adequate water for leaf development.", icon: "fa-leaf" },
            { name: "Reproductive", duration: "Days 45-80", waterNeed: 3, description: "Critical period around silking when water stress severely impacts yield.", icon: "fa-spa" },
            { name: "Maturity", duration: "Days 80-110", waterNeed: 1, description: "Reduced water needs as plant focuses on grain filling.", icon: "fa-wheat-alt" }
        ],
        tips: [
            "Precision irrigation can reduce water use by 25% while maintaining yields",
            "Plant drought-tolerant hybrids in water-scarce regions",
            "Use conservation tillage to improve water retention in soil"
        ]
    },
    Cotton: {
        name: "Cotton",
        description: "Important fiber crop requiring careful water management for optimal yield.",
        image: "https://th.bing.com/th/id/OIP.NLVGYsXIiF5G9otz0-bE6AHaD5?w=298&h=180&c=7&r=0&o=7&cb=iwp2&dpr=1.3&pid=1.7&rm=3",
        growthDuration: "150-180 days",
        waterSensitivity: 75,
        stages: [
            { name: "Germination", duration: "Days 0-15", waterNeed: 2, description: "Requires warm, moist soil conditions for uniform emergence.", icon: "fa-seedling" },
            { name: " biên", duration: "Days 15-60", waterNeed: 3, description: "Steady growth phase needing consistent moisture for canopy development.", icon: "fa-leaf" },
            { name: "Flowering", duration: "Days 60-120", waterNeed: 3, description: "Critical period requiring careful irrigation to maximize boll set.", icon: "fa-spa" },
            { name: "Boll Development", duration: "Days 120-170", waterNeed: 2, description: "Gradual water reduction as bolls mature to promote fiber quality.", icon: "fa-tshirt" }
        ],
        tips: [
            "Deficit irrigation strategies can reduce water use by 30% with minimal yield impact",
            "Use drip irrigation to deliver water directly to root zone",
            "Monitor soil moisture to avoid over-irrigation during boll opening"
        ]
    }
};

// Login Logic
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const farmerid = document.getElementById('farmerid').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Simulated authentication (replace with real backend in production)
    if (farmerid && password) {
        localStorage.setItem('isLoggedIn', 'true');
        if (rememberMe) {
            localStorage.setItem('userid', farmerid);
        }
        window.location.href = 'calculator.html';
    } else {
        alert('Please enter valid credentials.');
    }
});

// Logout Logic
document.getElementById('logoutBtn')?.addEventListener('click', function() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userid');
    window.location.href = 'index.html';
});

// Check if user is logged in
if (window.location.pathname.includes('calculator.html') && !localStorage.getItem('isLoggedIn')) {
    window.location.href = 'index.html';
}

// Water Footprint Prediction (from model.js)
document.getElementById('waterForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    const crop = document.getElementById('cropType').value;
    const region = document.getElementById('region').value;
    const area = parseFloat(document.getElementById('area').value);

    if (!crop || !region || !area) {
        alert('Please fill in all fields.');
        return;
    }

    try {
        const { greenWater, blueWater, greyWater, totalWater } = await predictWaterFootprint(crop, region, area);
        displayResults(greenWater, blueWater, greyWater, totalWater, crop, region, area);
        displayCropInfo(crop);
    } catch (error) {
        console.error('Prediction error:', error);
        alert('Error predicting water footprint. Please try again.');
    }
});

// Display Results
function displayResults(green, blue, grey, total, crop, region, area) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <div class="mb-3">
            <h6>Crop: <span class="text-primary">${crop}</span></h6>
            <h6>Region: <span class="text-primary">${region}</span></h6>
            <h6>Area: <span class="text-primary">${area} hectares</span></h6>
        </div>
        <div class="water-result text-success">
            <i class="fas fa-tint me-2"></i>Green Water: ${green.toFixed(2)} liters
        </div>
        <div class="water-result text-primary">
            <i class="fas fa-tint me-2"></i>Blue Water: ${blue.toFixed(2)} liters
        </div>
        <div class="water-result text-secondary">
            <i class="fas fa-tint me-2"></i>Grey Water: ${grey.toFixed(2)} liters
        </div>
        <div class="water-result text-info mt-3">
            <i class="fas fa-tint me-2"></i>Total Water Footprint: ${total.toFixed(2)} liters
        </div>
    `;
    document.getElementById('resultsCard').style.display = 'block';
}

// Display Crop Info, Growth Stages, and Tips
function displayCropInfo(crop) {
    const cropInfo = cropData[crop];
    document.getElementById('cropName').textContent = cropInfo.name;
    document.getElementById('cropDescription').textContent = cropInfo.description;
    document.getElementById('cropImage').src = cropInfo.image;
    document.getElementById('growthDuration').textContent = cropInfo.growthDuration;
    document.getElementById('waterSensitivity').style.width = `${cropInfo.waterSensitivity}%`;
    document.getElementById('cropInfoCard').style.display = 'block';

    const growthStagesDiv = document.getElementById('growthStages');
    growthStagesDiv.innerHTML = cropInfo.stages.map(stage => `
        <div class="growth-stage">
            <div class="d-flex align-items-center">
                <div class="stage-icon">
                    <i class="fas ${stage.icon}"></i>
                </div>
                <div>
                    <h6 class="mb-1">${stage.name} (${stage.duration})</h6>
                    <p class="text-muted small mb-0">${stage.description}</p>
                    <div class="water-indicator">
                        ${'<div class="water-drop"></div>'.repeat(stage.waterNeed)}
                        <small class="text-muted">Water Need: ${stage.waterNeed}/3</small>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    document.getElementById('cultivationGuide').style.display = 'block';

    const savingTipsDiv = document.getElementById('savingTips');
    savingTipsDiv.innerHTML = `
        <ul class="list-group list-group-flush">
            ${cropInfo.tips.map(tip => `
                <li class="list-group-item border-0">
                    <i class="fas fa-check-circle text-success me-2"></i>${tip}
                </li>
            `).join('')}
        </ul>
    `;
    document.getElementById('waterTips').style.display = 'block';
}

// Comparison Chart
let compareData = [];
let compareChart;

document.getElementById('addCompare')?.addEventListener('click', async function() {
    const crop = document.getElementById('compareCrop').value;
    const region = document.getElementById('compareRegion').value;

    try {
        const { greenWater, blueWater, greyWater } = await predictWaterFootprint(crop, region, 1);
        compareData.push({
            label: `${crop} (${region})`,
            green: greenWater,
            blue: blueWater,
            grey: greyWater
        });
        updateCompareChart();
    } catch (error) {
        console.error('Comparison error:', error);
        alert('Error adding comparison. Please try again.');
    }
});

function updateCompareChart() {
    const ctx = document.getElementById('compareChart').getContext('2d');
    if (compareChart) {
        compareChart.destroy();
    }

    compareChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: compareData.map(d => d.label),
            datasets: [
                {
                    label: 'Green Water (L/kg)',
                    data: compareData.map(d => d.green),
                    backgroundColor: 'rgba(46, 204, 113, 0.6)',
                    borderColor: 'rgba(46, 204, 113, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Blue Water (L/kg)',
                    data: compareData.map(d => d.blue),
                    backgroundColor: 'rgba(52, 152, 219, 0.6)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Grey Water (L/kg)',
                    data: compareData.map(d => d.grey),
                    backgroundColor: 'rgba(149, 165, 166, 0.6)',
                    borderColor: 'rgba(149, 165, 166, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: 'Crop (Region)' } },
                y: { beginAtZero: true, title: { display: true, text: 'Water Footprint (L/kg)' } }
            },
            plugins: { legend: { position: 'top' } }
        }
    });
}

// Populate Insights Table
function populateInsightsTable() {
    const cropDataTable = document.getElementById('cropData');
    cropDataTable.innerHTML = Object.keys(cropData).map(crop => `
        <tr>
            <td>${crop}</td>
            <td>${(Math.random() * 1000 + 500).toFixed(0)}</td>
            <td>${(Math.random() * 1000 + 500).toFixed(0)}</td>
            <td>${(Math.random() * 500 + 100).toFixed(0)}</td>
            <td>${(Math.random() * 2500 + 1100).toFixed(0)}</td>
        </tr>
    `).join('');
}

// Google Maps Integration
function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 },
        zoom: 2,
        styles: [
            {
                featureType: "all",
                elementType: "all",
                stylers: [{ saturation: -20 }]
            },
            {
                featureType: "water",
                elementType: "all",
                stylers: [{ hue: "#00aaff" }, { saturation: 50 }]
            }
        ]
    });

    // Sample water stress regions (for demonstration)
    const waterStressRegions = [
        { lat: 30, lng: 70, stress: 'high', name: 'Middle East' },
        { lat: -20, lng: 140, stress: 'medium', name: 'Australia' },
        { lat: 50, lng: 10, stress: 'low', name: 'Europe' }
    ];

    waterStressRegions.forEach(region => {
        const marker = new google.maps.Marker({
            position: { lat: region.lat, lng: region.lng },
            map: map,
            title: region.name,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: region.stress === 'high' ? '#ff0000' : region.stress === 'medium' ? '#ffa500' : '#00ff00',
                fillOpacity: 0.8,
                strokeWeight: 1
            }
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `<h6>${region.name}</h6><p>Water Stress: ${region.stress.charAt(0).toUpperCase() + region.stress.slice(1)}</p>`
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    });
}

// Initialize Insights Table
if (document.getElementById('cropData')) {
    populateInsightsTable();
}