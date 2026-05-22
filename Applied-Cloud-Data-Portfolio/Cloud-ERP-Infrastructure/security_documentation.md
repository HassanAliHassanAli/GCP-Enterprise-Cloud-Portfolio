# 🛡️ ERP Security & Isolation Architecture

To ensure the integrity of enterprise data (essential for ERP modules like Finance and Supply Chain), the following security measures were implemented:

1. **Virtual Private Cloud (VPC) Isolation:**
   - The infrastructure is deployed within a custom VPC (`erp-vpc`) rather than the default network. This isolates the ERP traffic from other cloud resources.
   - A dedicated subnet (`10.0.0.0/24`) is used to manage internal IP addressing efficiently.

2. **Firewall Rules (Principle of Least Privilege):**
   - **Rule Name:** `allow-erp-ssh-http`
   - **Protocol/Ports:** Only TCP ports `22` (SSH for secure admin access) and `80` (HTTP for web traffic) are allowed.
   - All other inbound ports are implicitly denied by the GCP network architecture.

3. **Database Security (PostgreSQL):**
   - The Cloud SQL instance relies on strong authentication mechanisms (`root-password` generation).
   - Automated backups are routed to a secure Cloud Storage bucket (`gs://[PROJECT_ID]-erp-backups`) located in the same region (`europe-west1`) to comply with data residency standards.