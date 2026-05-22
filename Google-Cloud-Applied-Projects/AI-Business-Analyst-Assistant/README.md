# 📊 AI Business Analyst Assistant (Enterprise Ingestion & ERP Architecture Mapper)


An advanced, production-grade AI-powered business analytics platform engineered to ingest unstructured corporate communications, video briefings, and case studies, transforming them into structured, actionable **Enterprise Resource Planning (ERP)** and **Supply Chain Management (SCM)** blueprints. 


Built with **Streamlit** and integrated dynamically with the **Google Gemini Architecture** utilizing automated infrastructure discovery.


---## 🎯 Strategic Value Proposition


In modern corporate environments, vital operational feedback, stakeholder pain-points, and workflow bottlenecks are often buried inside unstructured formats—such as recorded Zoom briefings, corporate YouTube training videos, or long textual case updates. 


This platform acts as an automated **Senior Business Analyst**, immediately parsing through these dense datasets to:1. **Uncover Invisible Bottlenecks**: Pinpoint where supply chain visibility breaks down, resulting in stockouts or inflated carrying costs.2. **Accelerate Digital Transformation**: Translate manual, legacy workflows (like fragmented Excel sheets) into automated, centralized ERP system specifications (such as **Odoo** or **SAP**).3. **Establish Data-Driven Governance**: Recommend robust Key Performance Indicators (KPIs) engineered to be directly built into executive dashboards via **Power BI** or **Tableau**.


---## 🛠️ Key Architectural & Engineering Features- **Dynamic Infrastructure Auto-Discovery Engine**: Avoids hardcoded model faults (e.g., 404 API errors) by running an automated initialization routine that queries the Google Cloud endpoints to identify and bind to the highest-performing available text generation model assigned to the user's project context.- **Dual Ingestion Framework**: Features a fallback pipeline supporting both automated API transcript harvesting from streamable video assets and zero-latency direct textual pasting to completely bypass external data-center IP scraping restrictions.- **Industrial Prompt Boundary Enforcement**: Employs rigorous consulting prompt frameworks that force the underlying LLM core to behave strictly as an enterprise architect, ensuring outputs exclude conversational filler and adhere to standard corporate reporting patterns.


---

💻 Technology Stack & Prerequisites

Interface Layer: Streamlit Framework (Responsive Dark-Themed Corporate Grid Layout)

Cognitive Layer: Google Gemini API Framework (generativelanguage core microservice)

Data Extractor: Native Python YouTube Transcript Abstractor

Target Environments: Local Workstations, Google Cloud Shell, Cloud Run Containers

🚀 Step-by-Step Installation & Local Deployment

1. Initialize Code Repository

Clone this repository to your target server or local workspace:



2. Configure Dependencies

Execute the bulk library installation via pip:



pip install -r requirements.txt

3. Google Cloud API Activation (Crucial Infrastructure Setup)

Ensure the required text generation endpoints are authorized on your active Google Cloud Project by running this command via the terminal:



gcloud services enable generativelanguage.googleapis.com

4. Execute the Application Instance

Launch the background web server and make it accessible across network zones:



python3 -m streamlit run app.py --server.port=8080 --server.address=0.0.0.0 --server.enableCORS=false --server.enableXsrfProtection=false

📊 Live System Demonstrations & Production Results

The system has been rigorously tested using comprehensive manufacturing use cases. Below is the documentation of successful operation:


1. Unified Corporate Interface Layout

The UI exposes a simplified interactive dashboard with isolated configuration sidebars, enabling managers to safely input credentials without exposing tokens on screen.


2. Live Analytics Generation & ERP Mapping

Here is the production-grade Business & ERP Analysis Report generated dynamically by the AI, showcasing Executive Summaries, Process Optimization, and Recommended KPIs based on a real-world manufacturing case study:


