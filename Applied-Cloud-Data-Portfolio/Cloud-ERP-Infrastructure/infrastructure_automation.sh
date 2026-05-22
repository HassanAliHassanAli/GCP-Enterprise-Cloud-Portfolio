#!/bin/bash
# ==============================================================================
# Cloud ERP Infrastructure Automation Script
# Purpose: Automate the deployment of a secure VPC, Web Server, and PostgreSQL DB
# ==============================================================================

echo "🚀 Starting ERP Infrastructure Deployment..."

# 1. Network Setup (VPC & Subnets)
gcloud compute networks create erp-vpc --subnet-mode=custom
gcloud compute networks subnets create erp-subnet \
    --network=erp-vpc \
    --region=europe-west1 \
    --range=10.0.0.0/24

# 2. Security Configuration (Firewall)
gcloud compute firewall-rules create allow-erp-ssh-http \
    --network=erp-vpc \
    --allow tcp:22,tcp:80 \
    --source-ranges=0.0.0.0/0 \
    --description="Allow SSH and HTTP traffic for ERP application routing"

# 3. Application Server (Compute Engine + Nginx)
gcloud compute instances create erp-app-server \
    --zone=europe-west1-b \
    --machine-type=e2-micro \
    --network=erp-vpc \
    --subnet=erp-subnet \
    --metadata=startup-script="#! /bin/bash
    apt-get update
    apt-get install -y nginx
    systemctl start nginx
    systemctl enable nginx" \
    --tags=allow-erp-ssh-http

# 4. Database Provisioning (Cloud SQL - PostgreSQL)
gcloud sql instances create erp-db-instance \
    --database-version=POSTGRES_14 \
    --tier=db-f1-micro \
    --region=europe-west1 \
    --root-password="SuperSecurePassword123!"

# 5. Backup Storage Setup
gcloud storage buckets create gs://$GOOGLE_CLOUD_PROJECT-erp-backups --location=europe-west1

echo "✅ Infrastructure Successfully Deployed!"