# RiskWise – Invest Without Fear

## Overview

RiskWise is an AI-powered investment simulation platform designed to help beginners overcome the fear of investing. It allows users to simulate potential outcomes before investing real money, understand risks clearly, and make confident financial decisions.

The application provides tools such as risk simulation, AI-based portfolio explanation, and a loss probability meter to make investing simple and transparent.

The system follows a full-stack architecture with a modern frontend, backend logic for simulations, and AI-based explanation modules.

---

## User Preferences

Preferred communication style: Simple, beginner-friendly financial explanations.

---

## System Architecture

### Frontend Architecture

* **Framework**: React.js with JavaScript/TypeScript
* **Styling**: Tailwind CSS (modern fintech UI)
* **Charts**: Recharts (for risk visualization)
* **Animations**: Framer Motion (smooth UI interactions)
* **Build Tool**: Vite

---

### Backend Architecture

* **Framework**: Node.js with Express / Python Flask
* **API Pattern**: RESTful APIs (`/api/simulate`, `/api/explain`)
* **Logic Layer**: Handles simulation and probability calculations

---

### Data Layer

* **Data Source**: Mock data / Yahoo Finance API
* **Storage**: Optional PostgreSQL / in-memory storage
* **Purpose**: Used for simulation and risk calculations

---

### Shared Logic

* Risk calculation functions
* Probability estimation logic
* AI explanation templates

---

## Key Design Decisions

1. **Simulation First Approach**
   Users can see possible outcomes before investing real money

2. **Explainable AI**
   AI explains investment risk in simple, human-readable language

3. **Beginner-Friendly UI**
   Designed specifically for Gen-Z and new investors

4. **Modular Architecture**
   Easy to scale and integrate with real trading platforms

---

## Core Features

### 1. Risk Simulation Sandbox

* Simulates investment outcomes
* Shows best-case, worst-case, and average returns

### 2. AI-Based Portfolio Explainer

* Explains risk level (low / medium / high)
* Provides simple reasoning for portfolio behavior

### 3. Loss Probability Meter

* Displays chances of loss vs profit
* Uses visual indicators like charts and gauges

### 4. Try Before You Invest Mode (Optional)

* Demo portfolio tracking
* Simulated real-time results

---

## Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Recharts

### Backend

* Node.js / Express OR Python Flask

### AI/ML

* OpenAI API / Rule-based logic

### APIs

* Yahoo Finance API / Mock Data

---

## External Dependencies

### Frontend Libraries

* react
* tailwindcss
* recharts
* framer-motion

### Backend Libraries

* express / flask
* axios / requests

---

## Project Structure

riskwise/
│── frontend/
│── backend/
│── README.md
│── package.json / requirements.txt
│── screenshots/

---

## Installation & Setup

### Clone the Repository

```bash
git clone https://github.com/ridhiambala87/riskwise.git
cd riskwise
```

### Install Dependencies

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd backend
npm install
# OR
pip install -r requirements.txt
```

---

## Run the Project

### Start Backend

```bash
npm start
# OR
python app.py
```

### Start Frontend

```bash
npm start
```

---

## API Endpoints

* `/api/simulate` → Runs investment simulation
* `/api/explain` → Generates AI-based explanation
* `/api/probability` → Calculates loss probability

---

## Impact

* Reduces fear of investing
* Improves financial literacy
* Encourages smart financial decisions

---

## Challenges

* Accurate simulation modeling
* Building trust in AI explanations
* Simplifying complex financial concepts

---

## Future Scope

* Real-time stock market integration
* Advanced AI risk prediction
* Mobile application
* Integration with trading platforms (Zerodha, Groww)

---

## Team Details

* Team Name: FinOrial
* Team Lead: Ridhi Jain
* Members: Ridhi Jain and Ryan Sharma
