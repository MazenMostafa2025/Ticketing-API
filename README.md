# 🚀 Ticketing API - Microservices Architecture

## Overview
This project is a **microservices-based ticketing system** that allows users to **reserve tickets and put them for sale**. It follows a **scalable and event-driven architecture** using:  
✅ **Node.js & Express** – Backend framework  
✅ **TypeScript** – Type-safe development  
✅ **NATS Streaming** – Event-driven communication  
✅ **Kubernetes** – Container orchestration  
✅ **Docker & Skaffold** – Containerized development workflow  

---

## 🛠 Tech Stack
- **Backend**: Node.js, Express, TypeScript  
- **Event Bus**: NATS Streaming Server  
- **Containerization**: Docker  
- **Orchestration**: Kubernetes (K8s)  
- **Development Workflow**: Skaffold
- Ingress NGINX (API Gateway)
- Node.js, Express, TypeScript
- Jest (Unit Testing)

## Features
- Authentication
- Ticket Management with optimistic concurrency control
- Expiration periods for tickets using redis-based queue (bull)
- Payments service using stripe
- Event driven architecture using NATS Streaming
- Unit tests using Jest




