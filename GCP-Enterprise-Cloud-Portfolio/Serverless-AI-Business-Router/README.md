# 🤖 Serverless AI Business Router API

An intelligent, serverless REST API built with Python (Flask) and deployed on **Google Cloud Run**. This microservice acts as an automated routing engine, analyzing incoming business text (e.g., customer complaints, logistics updates, invoice queries) and automatically classifying them to the correct ERP department.

---

## 🎯 Strategic Business Value
In large-scale enterprise environments (using Odoo, SAP, etc.), manual ticket routing creates operational bottlenecks. This API automates the triage process by inspecting text payloads and mapping them to specific organizational departments (Finance, Supply Chain, General). 

**Key Benefits:**
- **Zero-Downtime:** Containerized with Docker to run uniformly in any environment.
- **Cost-Optimized (Scale-to-Zero):** Deployed on Google Cloud Run, meaning it scales down to 0 instances when not in use, incurring absolutely no cost during idle times.
- **High Throughput:** Designed to handle real-time webhook events from frontend applications or ERP systems.

---

## 🏗️ Tech Stack & Cloud Architecture
- **Language/Framework:** Python 3.11, Flask, Gunicorn.
- **Containerization:** Docker (`python:3.11-slim` base image for minimal footprint).
- **Google Cloud Platform (GCP):**
  - **Artifact Registry:** Secure storage and versioning for Docker images.
  - **Cloud Build:** Automated building of the Docker image in the cloud.
  - **Cloud Run:** Fully managed, serverless execution environment.

---

## 📁 Repository Structure
```text
Serverless-AI-Business-Router/
│
├── app.py                # Main Flask application and ERP routing logic
├── Dockerfile            # Container configuration for Cloud Run deployment
├── requirements.txt      # Python dependencies (Flask, Gunicorn)
├── README.md             # Project documentation
└── images/               # Screenshots of live API testing

## ⚙️ How It Works (API Endpoints)

### `POST /api/analyze`
Accepts a JSON payload containing raw text and returns a structured JSON response with the classified department.

**Request (`cURL`):**
```bash
curl -X POST https://[YOUR_CLOUD_RUN_URL]/api/analyze \
     -H "Content-Type: application/json" \
     -d '{"text": "Customer is complaining about a delay in their shipping."}'

Response:
JSON

{
  "agent_version": "1.0",
  "analyzed_text": "customer is complaining about a delay in their shipping.",
  "assigned_department": "Supply Chain & Logistics",
  "status": "success"
}