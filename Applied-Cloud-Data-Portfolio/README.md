# ☁️ Google Cloud Platform (GCP) Solutions Portfolio

This portfolio demonstrates a holistic approach to cloud computing, bridging the gap between Commercial Science, Business Information Systems, and enterprise-grade technical execution. It showcases the ability to architect, deploy, and manage comprehensive cloud solutions across data analytics, serverless application development, and robust IT infrastructure tailored for modern ERP environments.

Strong emphasis is placed on SQL-driven data warehousing, automated deployments, and secure network architectures.

---

## 📊 Project 1: E-Commerce Data Pipeline & Business Intelligence
**Objective:** To build a fully managed, end-to-end data pipeline extracting actionable business insights from raw e-commerce sales data.
        
**Implementation Details:**
* **Data Lake (Cloud Storage):** Raw datasets were ingested and securely stored in Google Cloud Storage buckets.
* **Data Warehousing (BigQuery):** Data was loaded into BigQuery for highly optimized, scalable storage and processing.
* **Data Transformation (SQL):** Advanced SQL queries were engineered to clean the data, calculate core KPIs (such as total revenue and departmental profit margins), and aggregate metrics for business reporting.
* **Data Visualization (Looker Studio):** Connected the BigQuery data warehouse directly to Looker Studio to construct interactive, real-time dashboards for executive decision-making.

---

## 🤖 Project 2: Serverless AI Business Router API
**Objective:** To develop and deploy an intelligent, containerized Web API capable of processing and routing incoming business text (such as customer inquiries or logistical tickets) utilizing a Python backend.
        
**Implementation Details:**
* **Application Development:** Engineered a RESTful API using Python (Flask/FastAPI) to analyze text payloads and categorize them based on business logic.
* **Containerization (Docker):** Packaged the application and its dependencies into a Docker container to ensure consistent and isolated execution across any environment.
* **Image Management (Artifact Registry):** Automated the container build process via Cloud Build and securely stored the resulting Docker images in GCP's Artifact Registry.
* **Serverless Deployment (Cloud Run):** Deployed the containerized API to Cloud Run, utilizing a scale-to-zero serverless architecture. This ensured high availability for incoming requests while maintaining absolute cost-efficiency during idle periods.

---

## 🏢 Project 3: Enterprise ERP Cloud Infrastructure
**Objective:** To architect a secure, highly available cloud infrastructure simulating the exact backend requirements for large-scale Enterprise Resource Planning (ERP) or Customer Relationship Management (CRM) databases.
        
**Implementation Details:**
* **Network Security (VPC & Firewalls):** Configured a custom Virtual Private Cloud (VPC) and implemented strict firewall rules based on the principle of least privilege, restricting inbound traffic to essential ports only.
* **Compute Engine:** Provisioned a scalable Compute Engine virtual machine (VM) and deployed a Linux-based Nginx web server environment to act as the application host.
* **Managed Database (Cloud SQL):** Established a secure, fully managed relational database instance (PostgreSQL/MySQL) tailored for transactional ERP data storage, linking it securely to the application server.
* **Automated Disaster Recovery:** Designed a robust data retention workflow by scripting automated database backups to be routed periodically into isolated Cloud Storage buckets.
---

## 🚀 Project 4: AI-Powered Personal Portfolio Generator (Full-Stack AI App)
**Objective:** To architect and deploy a dynamic, Generative AI-driven web application that instantly parses unstructured professional data (like CVs or LinkedIn summaries) into a responsive, production-ready portfolio website.

**Implementation Details:**
* **AI Integration (Gemini API):** Utilized Google Gemini 3.5 Flash to intelligently extract, structure, and format career timelines and technical skills from raw text inputs.
* **Frontend Development (React & TypeScript):** Engineered a sleek, interactive user interface utilizing React and TypeScript to provide real-time portfolio generation and aesthetic customization.
* **Rapid Prototyping (Google AI Studio):** Leveraged Google AI Studio for prompt engineering, UI scaffolding, and seamless logic integration.
* **Serverless Deployment (Cloud Run):** Hosted the full-stack application on Google Cloud Run, ensuring fast, reliable, and scalable global access without managing underlying infrastructure.
* **Live Demo:** [Portfolio.AI Live App](https://personal-portfolio-generator-34827481300.europe-west3.run.app/) *(Click to view the deployed project)*