# 🚀 InvestNova — Investing Without Fear 📈

InvestNova is an AI-powered investment simulation platform designed to help beginners overcome the fear of market volatility. By combining Monte Carlo simulations with Generative AI (Llama 3.1), it enables users to visualize multiple possible investment outcomes and understand risk through data-driven insights rather than guesswork.

---

## 🚀 Live Demo

🔗 https://invest-4lc4.vercel.app/

---

## 🧠 Solution Overview

The primary barrier for new investors is **loss aversion** — the fear that market fluctuations may lead to significant losses.

InvestNova addresses this by:

* **Quantifying Risk**
  Moves beyond static CAGR calculators using probabilistic models

* **Visualizing Uncertainty**
  Demonstrates how short-term volatility differs from long-term growth

* **Humanizing Data**
  Uses an AI Mentor to explain complex financial metrics in simple, encouraging language

---

## 🛠️ Tech Stack & Technical Details

### 🎨 Frontend (User Interface)

* **Vanilla JavaScript (ES6+)** – Lightweight and fast DOM handling
* **Chart.js** – Visualizes 200+ stochastic simulation paths
* **Custom CSS3** – Glassmorphism UI with responsive layout
* **Phosphor Icons** – Clean and modern FinTech design

---

### ⚙️ Backend (Simulation Engine)

* **Python Flask** – REST API handling frontend requests
* **NumPy** – Vectorized computations for simulation
* **SciPy** – Used for Normal CDF in probability calculations
* **yfinance** – Fetches real-time market data (Nifty 50, Gold)

---

### 🤖 Artificial Intelligence

* **Model**: Llama 3.1 (8B)
* **Inference Engine**: Groq LPU (ultra-fast responses)

**Role:**
Acts as a reasoning layer to convert statistical outputs into simple, human-friendly explanations.

---

### ☁️ Deployment

* **Platform**: Vercel
* **Architecture**: Serverless Functions
* **Benefits**: Scalable, fast, and cost-efficient

---

## 📂 Project Structure

```
Investing-Fear/
├── InvestNova_Backend.py     # Flask API & simulation logic
├── requirements.txt          # Python dependencies
├── vercel.json               # Deployment config
├── static/                   # Frontend assets
│   ├── style.css
│   └── script.js
└── templates/
    └── index.html            # Main UI dashboard
```

---

## 🧠 Core Mathematical Logic

The system uses a **Geometric Brownian Motion (GBM)** inspired model:

* Fetches real-time return & volatility data
* Calculates **portfolio mean and variance**
* Runs **200+ simulations** across time horizon
* Uses **Normal CDF** to compute probability of loss

👉 Final Output:

* 📉 Loss Probability Meter
* 📈 Multiple simulated future paths
* ⚖️ Risk vs Reward analysis

---

## ⚙️ Local Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/ridhiambala87/Investing-Fear.git
cd Investing-Fear
```

### 2️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

### 3️⃣ Set API Key

```bash
# Windows
set GROQ_API_KEY=your_key_here

# Mac/Linux
export GROQ_API_KEY='your_key_here'
```

### 4️⃣ Run Application

```bash
python InvestNova_Backend.py
```

---

## 🌍 Impact

* Builds confidence in beginner investors
* Promotes financial literacy
* Reduces fear-driven decision making
* Encourages data-backed investing

---

## ⚠️ Challenges

* Accurate simulation of real-world markets
* Ensuring trust in AI explanations
* Simplifying complex financial models

---

## 🔮 Future Scope

* Real-time trading integration (Zerodha, Groww)
* Advanced AI portfolio optimization
* Mobile application
* Personalized investment advisor

---

## 👥 Team: FinOrial

* **Ridhi Jain** – Team Lead & Solution Architect
* **Ryan Sharma** – Lead Developer & AI/ML Integration

---

## 💡 Final Note

> “InvestNova doesn’t just predict outcomes — it builds confidence.” 🚀
