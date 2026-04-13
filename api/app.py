from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import numpy as np
import yfinance as yf
import requests
import os
from groq import Groq
import scipy.stats as stats

# ✅ IMPORTANT: Correct paths for Vercel
app = Flask(
    __name__,
    template_folder="../Templates",
    static_folder="../Static"
)
CORS(app)

GROQ_API_KEY = "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"
client = Groq(api_key=GROQ_API_KEY)

# ---------------------- HOME ----------------------
@app.route("/")
def index():
    return render_template("index.html")

# ---------------------- CONFIG ----------------------
# GROQ_API_KEY = os.environ.get("GROQ_API_KEY")
client = Groq(api_key=GROQ_API_KEY) if GROQ_API_KEY else None

ASSET_STDS = {"equity": 0.18, "gold": 0.12, "bond": 0.03}

# ---------------------- DATA FUNCTIONS ----------------------
def get_india_inflation():
    try:
        url = "https://api.worldbank.org/v2/country/IND/indicator/FP.CPI.TOTL.ZG?format=json"
        response = requests.get(url, timeout=5).json()
        for entry in response[1]:
            if entry["value"] is not None:
                return float(entry["value"]) / 100
        return 0.06
    except:
        return 0.06


def get_live_market_data():
    tickers = {"equity": "^NSEI", "gold": "GC=F", "bond": "^IRX"}
    live_returns = {}

    try:
        for asset, sym in tickers.items():
            hist = yf.Ticker(sym).history(period="1y")

            if not hist.empty:
                ret = (hist["Close"].iloc[-1] - hist["Close"].iloc[0]) / hist["Close"].iloc[0]
                live_returns[asset] = ret
            else:
                live_returns[asset] = 0.10

        return live_returns

    except:
        # fallback (VERY IMPORTANT for Vercel stability)
        return {"equity": 0.12, "gold": 0.09, "bond": 0.07}


def get_ai_insight(eq, gd, bd, years, final_amt, inflation, live_returns):
    if not client:
        return "AI Mentor is offline (no API key)."

    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are a wealth mentor for an Indian investment simulator."
                },
                {
                    "role": "user",
                    "content": f"Equity {eq}%, Gold {gd}%, Bonds {bd}%. Inflation {inflation*100:.1f}%. Final ₹{final_amt:,.0f}. Explain briefly."
                }
            ],
            model="llama-3.1-8b-instant",
        )

        return chat_completion.choices[0].message.content

    except Exception as e:
        print("AI Error:", e)
        return "Simulation complete."


# ---------------------- SIMULATION ----------------------
@app.route("/simulate", methods=["POST"])
def simulate():
    try:
        data = request.json

        initial = float(data.get("initial", 100000))
        sip = float(data.get("sip", 5000))
        years = int(data.get("years", 10))
        num_sims = int(data.get("numSims", 200))

        live_returns = get_live_market_data()
        inflation = get_india_inflation()

        eq_w = float(data.get("equity", 50)) / 100
        gd_w = float(data.get("gold", 20)) / 100
        bd_w = float(data.get("bond", 30)) / 100

        mean_annual = (
            eq_w * live_returns["equity"]
            + gd_w * live_returns["gold"]
            + bd_w * live_returns["bond"]
        )

        vol_annual = np.sqrt(
            (eq_w * 0.18) ** 2
            + (gd_w * 0.12) ** 2
            + (bd_w * 0.05) ** 2
        )

        months = years * 12
        m_mean = (1 + mean_annual) ** (1 / 12) - 1
        m_vol = vol_annual / np.sqrt(12)

        returns = np.random.normal(m_mean, m_vol, (num_sims, months))

        paths = np.zeros((num_sims, months + 1))
        paths[:, 0] = initial

        for m in range(1, months + 1):
            paths[:, m] = paths[:, m - 1] * (1 + returns[:, m - 1]) + sip

        final_vals = paths[:, -1]
        invested_path = [initial + (sip * m) for m in range(months + 1)]

        return jsonify({
            "status": "success",
            "median_path": np.percentile(paths, 50, axis=0).tolist(),
            "upper_path": np.percentile(paths, 95, axis=0).tolist(),
            "lower_path": np.percentile(paths, 5, axis=0).tolist(),
            "invested_path": invested_path,
            "best": float(np.percentile(final_vals, 95)),
            "median": float(np.percentile(final_vals, 50)),
            "worst": float(np.percentile(final_vals, 5)),
            "total_invested": float(initial + (sip * months)),
            "loss_prob": float(
                stats.norm.cdf((0 - mean_annual * years) / (vol_annual * np.sqrt(years))) * 100
            ),
            "ai_advice": get_ai_insight(
                eq_w * 100,
                gd_w * 100,
                bd_w * 100,
                years,
                np.percentile(final_vals, 50),
                inflation,
                live_returns,
            ),
        })

    except Exception as e:
        print("Simulation Error:", e)
        return jsonify({"status": "error", "message": str(e)}), 500


# ---------------------- CHAT ----------------------
@app.route("/chat", methods=["POST"])
def chat():
    try:
        if not client:
            return jsonify({"answer": "AI is not configured."})

        data = request.json
        user_q = data.get("question")

        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are an investment mentor."
                },
                {
                    "role": "user",
                    "content": f"{user_q}"
                }
            ],
            model="llama-3.1-8b-instant",
        )

        return jsonify({
            "answer": chat_completion.choices[0].message.content
        })

    except Exception as e:
        print("Chat Error:", e)
        return jsonify({"answer": "Error processing request."})
