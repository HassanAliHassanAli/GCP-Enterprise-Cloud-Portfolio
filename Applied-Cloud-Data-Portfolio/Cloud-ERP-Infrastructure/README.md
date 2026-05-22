# 🏢 Cloud ERP Infrastructure Deployment


An enterprise-grade cloud infrastructure built on **Google Cloud Platform (GCP)**. This project demonstrates foundational Cloud Architecture, Networking, and Database Management skills, structured specifically to support large-scale Data Analysis, Business Information Systems (BIS), and ERP workflows (e.g., Odoo, SAP).


---## 🎯 Profile & Strategic Context

Developed as a practical demonstration of integrating **Commercial Science** with modern cloud engineering. The primary objective is to provision a highly secure, scalable infrastructure capable of hosting data-heavy ERP ecosystems. This establishes a robust backend for advanced SQL querying, data cleaning, and business intelligence pipelines.


---## 🏗️ Architecture Diagram```mermaid

graph TD

    Internet((Internet)) -->|HTTP/SSH| Firewall[VPC Firewall Rules]

    

    subgraph "Google Cloud Platform - europe-west1"

        subgraph "Custom VPC (erp-vpc)"

            Firewall --> AppServer[Compute Engine VM \n Nginx Web Server]

            AppServer -->|Internal Routing| DB[(Cloud SQL \n PostgreSQL 14)]

        end

        

        DB -.->|Automated SQL Dumps| Bucket[Cloud Storage \n Backup Bucket]

    end

    

    classDef default fill:#f9f9f9,stroke:#333,stroke-width:2px;

    classDef storage fill:#e1f5fe,stroke:#039be5,stroke-width:2px;

    class Bucket storage;

    class DB storage;

🛠️ Tech Stack & Services Used

Compute: Google Compute Engine (e2-micro) running Nginx web server.

Database Architecture: Google Cloud SQL (PostgreSQL 14) positioned as the central data warehouse for SQL analytics.

Networking: Custom VPC with strict Firewall Rules.

Storage: Google Cloud Storage Bucket for routine data backups.

Infrastructure as Code (IaC): Bash automation for rapid deployment and configuration.

📁 Repository Structure

File / FolderDescription📜 infrastructure_automation.shBash script used to fully automate the deployment of the VPC, Virtual Machine, and Database.🛡️ security_documentation.mdDetailed breakdown of VPC isolation, firewall settings, and database security protocols.🗄️ db_init.sqlFoundational SQL script for initializing core ERP tables (Sales Orders, Inventory Logs).🖼️ images/Directory containing proof of execution and server setup from GCP Cloud Shell.

🚀 Deployment Proof & Execution

1. Network & Firewall Provisioning

Successfully created the custom VPC, Subnets, Firewall rules, and Backup Storage.


2. VM & Cloud SQL Database Creation

Successfully deployed the application server and the managed PostgreSQL instance.