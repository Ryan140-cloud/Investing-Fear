// ===== 1. GLOBAL STATE & UI HELPERS =====
let state = { equity: 50, gold: 20, bond: 30 };
let myChart = null;

const fmt = (n) => "₹" + Math.round(n).toLocaleString('en-IN');

document.getElementById('timeHorizon').addEventListener('input', function() {
    document.getElementById('horizonLabel').textContent = this.value + ' years';
    document.getElementById('horizonValue').textContent = this.value + 'Y';
});

document.getElementById('numSims').addEventListener('input', function() {
    document.getElementById('simLabel').textContent = this.value;
    document.getElementById('simValue').textContent = this.value;
});

// ===== 2. ASSET ALLOCATION LOGIC =====
function updateAllocation() {
    state.equity = parseInt(document.getElementById('eqSlider').value);
    state.gold = parseInt(document.getElementById('goldSlider').value);
    state.bond = parseInt(document.getElementById('bondSlider').value);
    
    document.getElementById('eqLabel').textContent = state.equity + '%';
    document.getElementById('goldLabel').textContent = state.gold + '%';
    document.getElementById('bondLabel').textContent = state.bond + '%';
    
    document.getElementById('barEq').style.width = state.equity + '%';
    document.getElementById('barGold').style.width = state.gold + '%';
    document.getElementById('barBond').style.width = state.bond + '%';

    document.querySelectorAll('.tab-pill').forEach(t => t.classList.remove('active'));
}

function setPreset(name, btn) {
    const presets = {
        conservative: { eq: 30, gold: 20, bond: 50 },
        balanced: { eq: 50, gold: 20, bond: 30 },
        aggressive: { eq: 80, gold: 10, bond: 10 }
    };
    const p = presets[name];
    document.getElementById('eqSlider').value = p.eq;
    document.getElementById('goldSlider').value = p.gold;
    document.getElementById('bondSlider').value = p.bond;
    
    updateAllocation();
    btn.classList.add('active');
}

// ===== 3. CORE SIMULATION CALL (UPDATED FOR RENDER) =====
async function runSimulation() {
    const btn = document.getElementById('runBtn');
    btn.innerHTML = '<i class="ph-bold ph-spinner"></i> Python Processing...';
    btn.disabled = true;

    const payload = {
        initial: parseFloat(document.getElementById('initialAmount').value),
        sip: parseFloat(document.getElementById('monthlySIP').value),
        years: parseInt(document.getElementById('timeHorizon').value),
        numSims: parseInt(document.getElementById('numSims').value),
        equity: state.equity,
        gold: state.gold,
        bond: state.bond
    };

    try {
        // FIXED: Removed http://127.0.0.1:5000 to use relative path for Render
        const response = await fetch('/simulate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (data.status === "success") {
            renderChart(data);
            updateUIStats(data);

            const lossProb = data.loss_prob;
            const lossBar = document.getElementById('lossBar');
            const lossText = document.getElementById('lossText');

            if (lossBar && lossText) {
                lossBar.style.width = lossProb + "%";
                lossText.innerText = `Loss Probability: ${lossProb.toFixed(1)}%`;

                if (lossProb > 20) {
                    lossBar.style.backgroundColor = "#ff4d4d"; 
                } else if (lossProb > 10) {
                    lossBar.style.backgroundColor = "#f1c40f"; 
                } else {
                    lossBar.style.backgroundColor = "#2ecc71"; 
                }
            }
            
            if (data.ai_advice) {
                showAIMessage(data.ai_advice);
            }
        }

    } catch (error) {
        console.error("Connection failed:", error);
        showAIMessage("Connection Error: Render is waking up, please try again in 30 seconds!");
    } finally {
        btn.innerHTML = '<i class="ph-bold ph-play"></i> Run Simulation';
        btn.disabled = false;
    }
}

// ===== 4. CHART & STAT UPDATES =====
function renderChart(data) {
    const ctx = document.getElementById('mcChart').getContext('2d');
    const labels = Array.from({ length: data.median_path.length }, (_, i) => i % 12 === 0 ? `Y${i/12}` : '');

    if (myChart) myChart.destroy();

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                { 
                    label: 'Median (Expected)', 
                    data: data.median_path, 
                    borderColor: '#4f6ef7', 
                    borderWidth: 3, 
                    pointRadius: 0, 
                    fill: false, 
                    tension: 0.4 
                },
                { 
                    label: 'Best Case (95th)', 
                    data: data.upper_path, 
                    borderColor: '#10b981', 
                    borderDash: [5, 5], 
                    borderWidth: 1.5, 
                    pointRadius: 0, 
                    fill: false 
                },
                { 
                    label: 'Worst Case (5th)', 
                    data: data.lower_path, 
                    borderColor: '#ef4444', 
                    borderDash: [5, 5], 
                    borderWidth: 1.5, 
                    pointRadius: 0, 
                    fill: false 
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { 
                y: { 
                    ticks: { callback: (v) => fmt(v) }, 
                    grid: { color: '#edf0f7' } 
                },
                x: { grid: { display: false } }
            }
        }
    });
}

function updateUIStats(data) {
    document.getElementById('statBest').innerText = fmt(data.best || 0);
    document.getElementById('statMedian').innerText = fmt(data.median || 0);
    document.getElementById('statWorst').innerText = fmt(data.worst || 0);
    document.getElementById('statInvested').innerText = fmt(data.total_invested || 0);
    document.getElementById('simCountText').innerText = document.getElementById('numSims').value;
}

// ===== 5. AI EXPLAINER LOGIC =====
function showAIMessage(text) {
    const chat = document.getElementById('aiChat');
    const msg = document.createElement('div');
    msg.className = 'ai-msg';
    msg.innerHTML = `
        <div class="ai-avatar"><i class="ph-bold ph-robot"></i></div>
        <div class="ai-bubble">
            <div class="tip-tag">AI Mentor Analysis</div>
            <p>${text}</p>
        </div>
    `;
    chat.prepend(msg);
    chat.scrollTop = 0;
}

async function askCustomQuestion() {
    const input = document.getElementById('userQuery');
    const query = input.value.trim();
    if (!query) return;

    input.value = '';
    const chat = document.getElementById('aiChat');
    const userMsg = document.createElement('div');
    userMsg.className = 'ai-msg user-msg';
    userMsg.innerHTML = `<div class="ai-bubble user"><p>${query}</p></div>`;
    chat.prepend(userMsg);

    try {
        // FIXED: Removed http://127.0.0.1:5000 for Render compatibility
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                question: query,
                equity: state.equity,
                gold: state.gold,
                bond: state.bond,
                median: document.getElementById('statMedian').innerText
            })
        });
        const data = await
