# 🧾 LOR - Letter of Recommendation (Web3 DApp)

A decentralized application for managing **Letter of Recommendation (LOR)** requests using blockchain, offering transparency, authenticity, and immutability. Students can request LORs, and authorized approvers (like professors) can approve or reject them. The metadata is stored on-chain, and the signed LOR PDF is stored on IPFS.

---

## 🚀 Tech Stack

### 🔐 Smart Contract & Blockchain
- **Solidity** – Smart contract for LOR request & approval
- **Hardhat** – Development, testing, and deployment environment
- **Ethers.js** – Interacting with smart contracts
- **Sepolia Testnet** – Deployed contract: `0x2228E6e0D43246684A1a193d5a0303A5B2C4d980`

### 🌐 Frontend *(Work in Progress)*
- **React.js** / **Next.js** – Frontend with Web3 integration

### 🧠 Backend *(Work in Progress)*
- **Node.js / Express** – REST API for managing users and requests
- **MongoDB** – Database for user, approver, and request metadata

### 🗃️ File Storage
- **IPFS (InterPlanetary File System)** – Decentralized storage for signed LOR PDFs

---

## ✅ Features

- Student can request an LOR via the DApp
- Approver (e.g., professor) can approve or reject requests
- Each LOR request is stored immutably on-chain
- Signed PDFs are uploaded to IPFS
- Role-based access for approvers and students
- Designed with verifiability and transparency

---

## 📦 Current Status

### ✅ Completed
- Smart contract development
- Unit testing using Hardhat
- Deployment on Sepolia
- Repository initialized on GitHub

### 🚧 In Progress
- Frontend UI in React/Next.js
- Backend REST API (request management, listen to smart contract events)
- Integration with IPFS and blockchain
- Web3 wallet connection & transaction handling

---

## 🌍 Live Project

🚧 The project is still **in progress**, but you can check out the live version here:  
👉 [LOR DApp - Live Demo](https://lor-solidity-frontend.vercel.app/)

---
