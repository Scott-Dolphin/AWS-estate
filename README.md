# AWS-Estate

**Live Demo:** [https://dhsfy8233s5x7.cloudfront.net/](https://dhsfy8233s5x7.cloudfront.net/)

This repository contains the source code for a cloud-native real estate application. The frontend is deployed on **Amazon S3** and distributed globally via **Amazon CloudFront**. We implemented a hybrid cloud architecture using AWS to handle authentication, data processing, and API requests.

## Architecture Overview

![AWS Architecture Diagram](diagram.jpg)

### **Backend Services**

* **Compute & Processing:**
    * **AWS Lambda:** Serverless functions (`getHouseDataHandler`, `getFavoriteHandler`, `toggleFavoriteHandler`) handle API logic and data retrieval.
    * **Amazon EC2:** Hosts the **MCP (Model Context Protocol) Server**, providing specialized processing alongside our serverless stack.
    * **GitHub Actions:** Manages the CI/CD pipeline, automatically building and deploying frontend updates to S3.

* **Storage & Database:**
    * **Amazon S3:** Two buckets are utilized—one for hosting the static frontend assets (`juststore`) and another for raw housing data ingestion (`mockhousingdata`).
    * **Amazon DynamoDB:** Stores processed real estate listings and user favorites for low-latency access.

* **Networking:**
    * **Amazon VPC:** Provides network isolation for the backend resources (Lambda and EC2), ensuring secure internal communication.
    * **Amazon CloudFront:** A CDN ensuring low-latency delivery of the frontend to users worldwide.
    * **Amazon API Gateway:** Acts as the secure entry point, routing client requests to the appropriate Lambda functions.

* **Security & Auth:**
    * **Amazon Cognito:** Manages user identity (Sign-up/Sign-in) and secures API access.

* **Monitoring:**
    * **Amazon CloudWatch:** Configured to track Lambda metrics and aggregate logs for debugging and performance monitoring.
