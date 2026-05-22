# ☁️ Google Cloud Applied Projects: Data Analytics & Generative AI Solutions

An advanced portfolio of applied cloud-native applications engineered to bridge the gap between Data Analytics, Artificial Intelligence, and Enterprise Resource Planning (ERP). This repository serves as a comprehensive demonstration of deploying scalable, serverless, and AI-driven business solutions utilizing the Google Cloud Platform (GCP) ecosystem.

---

## 🎯 Executive Summary & Strategic Vision

In today's fast-paced corporate environment, data silos and manual analytical workflows often hinder strategic decision-making. The core objective of this repository is to showcase practical, production-grade implementations of modern data engineering and Generative AI to automate business analysis, visualize supply chain metrics, and democratize data access. 

By leveraging Large Language Models (LLMs) alongside traditional data processing libraries, these projects demonstrate how to transform unstructured operational data into structured, actionable business intelligence. The entire suite is designed with enterprise architecture in mind, prioritizing cloud-native deployment, zero-downtime serverless execution, and seamless user experiences.

---

## 📁 Repository Architecture & Core Projects

This repository is structured into three primary domains, each addressing a specific challenge in modern business analytics and cloud engineering:

### 1. AI Business Analyst Assistant
**Domain:** Natural Language Processing (NLP) & Strategic Consulting Automation
**Objective:** To automate the extraction of business bottlenecks and supply chain inefficiencies from unstructured corporate data (transcripts, case studies, reports).
**Key Capabilities:**
- Dynamically ingests vast amounts of operational text.
- Utilizes Google Gemini's reasoning capabilities to map identified challenges directly to standard ERP workflows (e.g., Odoo, SAP).
- Formulates optimized 'To-Be' process recommendations and constructs measurable Key Performance Indicators (KPIs) for immediate executive dashboarding.
- Features dynamic AI infrastructure auto-discovery to ensure resilient API connectivity.

### 2. Agentic Data UI Visualizer
**Domain:** Agentic Workflows & Dynamic Data Visualization
**Objective:** To bypass rigid, pre-configured BI dashboards by introducing conversational analytics, allowing stakeholders to generate complex visualizations purely through natural language.
**Key Capabilities:**
- Acts as a dynamic Python execution sandbox.
- Parses uploaded CSV datasets (such as raw sales or inventory logs) and intelligently maps the underlying data schema.
- Translates natural language prompts into executable Python code (utilizing Pandas and Matplotlib).
- Renders customized, ad-hoc charts dynamically within the Streamlit UI, providing instant insights without requiring engineering intervention.

### 3. Enterprise BI Dashboard (Cloud Run Deployment)
**Domain:** Serverless Cloud Engineering & Data Democratization
**Objective:** To provide a robust, highly available, and interactive Business Intelligence interface hosted entirely on Google Cloud infrastructure.
**Key Capabilities:**
- Simulates real-world ERP transactional data to track regional sales volume and operational profit margins.
- Employs Plotly for highly interactive, boardroom-ready data visualizations (Donut charts, Bar graphs).
- Packaged securely using Docker containerization (Dockerfile) for consistent cross-environment execution.
- Deployed via Google Cloud Run, demonstrating proficiency in Serverless computing, Infrastructure as Code (IaC), and Identity and Access Management (IAM) configurations.

---

## 🛠️ Technical Stack & Methodologies

The solutions within this repository were engineered utilizing a modern data and cloud stack, highlighting cross-functional technical proficiency:

- **Cloud Infrastructure (GCP):** Cloud Run (Serverless computing), Cloud Build, Artifact Registry, Cloud Shell, IAM Security Policies.
- **Generative AI & Agentic Frameworks:** Google Gemini API (`generativelanguage`), Prompt Engineering, Dynamic Code Execution (`exec()` sandboxing).
- **Data Engineering & Analysis:** Python 3.11+, Pandas (Vectorized Data Manipulation), NumPy.
- **Data Visualization:** Matplotlib, Plotly Express.
- **Frontend & App Architecture:** Streamlit (Rapid UI deployment, Session State Management).
- **DevOps & Containerization:** Docker (Microservices packaging).

---

## 💡 Industry Applications & Business Impact

The methodologies applied across these three projects are directly translatable to high-level enterprise operations:
- **Supply Chain Optimization:** Rapidly identifying delivery bottlenecks and mapping them to automated procurement modules.
- **Financial Analytics Democratization:** Empowering non-technical managers to generate instant profit/loss visualizations through Agentic UI.
- **Scalable IT Infrastructure:** Reducing operational overhead by deploying analytical tools on auto-scaling, serverless cloud architectures that only incur costs during active computation.