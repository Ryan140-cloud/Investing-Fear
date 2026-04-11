# Investing-Fear – Invest Without Fear

## Overview

Investing-Fear is an AI-powered investment simulation platform designed to help beginners overcome the fear of investing. It allows users to simulate possible outcomes before investing real money, understand risks clearly, and make confident financial decisions.

The platform focuses on simplifying complex financial concepts using simulation, visualization, and AI-based explanations.

---

## User Preferences

Preferred communication style: Simple, beginner-friendly financial explanations.

---

## System Architecture

### Frontend Architecture

* **Framework**: React.js with JavaScript/TypeScript
* **Styling**: Tailwind CSS
* **Charts**: Recharts (for risk visualization)
* **Animations**: Framer Motion
* **Build Tool**: Vite

---

### Backend Architecture

* **Framework**: Node.js with Express / Python Flask
* **API Pattern**: RESTful APIs (`/api/simulate`, `/api/explain`)
* **Logic Layer**: Handles simulation and probability calculations

---

### Data Layer

* **Data Source**: Mock data / Yahoo Finance API
* **Storage**: In-memory storage / PostgreSQL (optional)
* **Purpose**: Used for simulation and risk estimation

---

### Shared Logic

* Risk calculation functions
* Probability estimation algorithms
* AI explanation templates

---

## Key Design Decisions

1. **Simulation-First Approach**
   Users can see potential outcomes before investing real money

2. **Explainable AI**
   Provides simple explanations instead of complex financial jargon

3. **User-Centric Design**
   Designed specifically for beginners and Gen-Z investors

4. **Scalable Architecture**
   Can be extended to real trading platforms

---

## Core Features

### 1. Risk Simulation Sandbox

* Simulates investment outcomes
* Displays best-case, worst-case, and average returns

### 2. AI-Based Portfolio Explainer

* Explains risk level (low / medium / high)
* Provides clear reasoning behind investment behavior

### 3. Loss Probability Meter

* Shows probability of loss vs profit
* Uses visual indicators like graphs and meters

### 4. Try Before You Invest (Optional)

* Demo portfolio tracking
* Simulated real-time results

---

## Tech Stack

### Frontend

* React.js
* CSS
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
* css
* recharts
* framer-motion

### Backend Libraries

* express / flask
* axios / requests

---

## Project Structure

Investing-Fear/
│── frontend/
│── backend/
│── README.md
│── package.json / requirements.txt
│── screenshots/

---

## Installation & Setup

### Clone the Repository

```bash
git clone https://github.com/ridhiambala87/Investing-Fear.git
cd Investing-Fear
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
* Encourages confident decision-making

---

## Challenges

* Accurate risk simulation
* Building trust in AI explanations
* Simplifying financial data

---

## Future Scope

* Real-time stock market integration
* Advanced AI-based predictions
* Mobile app development
* Integration with platforms like Zerodha, Groww

---

## Team Details

* Team Name: FinOrial
* Team Lead: Ridhi Jain
* Members: Ridhi Jain and Ryan Sharma
