InvestNova — Investing Without Fear 📈
InvestNova is an AI-powered investment simulation platform designed to help beginners overcome the fear of market volatility. By combining Monte Carlo simulations with Generative AI (Llama 3.1), it allows users to visualize thousands of possible futures and understand risk through data-driven confidence rather than guesswork.

🚀 Live Demo
Access the live application here: https://invest-4lc4.vercel.app/

🧠 Solution Overview
The primary hurdle for new investors is "Loss Aversion"—the psychological fear that a market dip will lead to total capital loss. InvestNova addresses this by:

Quantifying Risk: Moving away from static CAGR calculators to probabilistic models.

Visualizing Uncertainty: Showing that while markets are volatile in the short term, historical patterns favor long-term growth.

Humanizing Data: Using an AI Mentor to explain complex statistical outputs in simple, encouraging language.

🛠️ Tech Stack & Technical Details
Frontend (The Interface)
Vanilla JavaScript (ES6+): Utilized for lightweight, high-speed DOM manipulation and state management without framework overhead.

Chart.js: A powerful rendering engine used to plot 200+ individual stochastic paths simultaneously.

Custom CSS3: Features a modern "Glassmorphism" UI design with a fully responsive grid system.

Phosphor Icons: Integrated for a professional, clean FinTech aesthetic.

Backend (The Engine)
Python Flask: Acts as the RESTful API bridge between the frontend and the mathematical/AI models.

NumPy: Powers the core simulation engine, performing vectorized operations to generate random walk return paths.

SciPy: Specifically used for its Normal Cumulative Distribution Function (CDF) to calculate the statistical "Loss Probability."

yfinance: Provides real-time market ingestion for Nifty 50 and Gold spot prices.

Artificial Intelligence
Model: Llama 3.1 8B (Meta).

Inference Engine: Groq LPU (Language Processing Unit) — chosen for its sub-second response times, allowing for a near-instant "chat" experience.

Role: Acts as a Reasoning Layer, translating raw math (Standard Deviation/Variance) into plain-English advice.

Deployment
Vercel: The application is deployed as a Serverless Function architecture, ensuring it is cost-effective, scalable, and highly available.

📂 Project Structure
Plaintext
Investing-Fear/
├── InvestNova_Backend.py  # Core Flask logic & API routes
├── requirements.txt       # Python library dependencies
├── vercel.json           # Vercel serverless configuration
├── static/                # Client-side assets
│   ├── style.css          # Global styles & layout
│   └── script.js          # Charting logic & API fetching
└── templates/             # UI Layer
    └── index.html         # Main dashboard structure
🧠 Core Mathematical Logic
The simulation uses a Geometric Brownian Motion (GBM) inspired approach:

Fetches live annual returns and volatility for Equity, Gold, and Bonds.

Calculates the weighted Portfolio Mean and Variance.

Runs N simulations (N=200+) across the user's time horizon.

Applies the Normal CDF to determine what percentage of these paths end below the total invested capital, resulting in the Loss Probability Meter.

⚙️ Local Installation
Clone the Repository

Bash
git clone https://github.com/ridhiambala87/Investing-Fear.git
cd Investing-Fear
Install Requirements

Bash
pip install -r requirements.txt
Set API Environment Variable

Bash
# Windows
set GROQ_API_KEY=your_key_here
# Mac/Linux
export GROQ_API_KEY='your_key_here'
Run Application

Bash
python InvestNova_Backend.py
👥 Team: FinOrial
Ridhi Jain (Team Lead & Solution Architect)

Ryan Sharma (Lead Developer & AI-ML Integration)
