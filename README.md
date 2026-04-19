# 🧾 LOR - Letter of Recommendation (Web3 DApp)

A decentralized application for managing **Letter of Recommendation (LOR)** requests using blockchain, offering transparency, authenticity, and immutability. Students can request LORs, and authorized approvers (like professors) can approve or reject them. The metadata is stored on-chain, and the signed LOR PDF is stored on IPFS.

---

## 🚀 Tech Stack

### 🔐 Smart Contract & Blockchain
- **Solidity** – Smart contract for LOR request & approval
- **Hardhat** – Development, testing, and deployment environment
- **Ethers.js** – Interacting with smart contracts
- **Sepolia Testnet** – Deployed contract: `0x039BAA8aD060f61F792f7F13d323bBaFbE267Bce`

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
- LOR Request Management:
  - Create request  
  - Approve request (by Admin/Approver)  
  - Reject request (by Admin/Approver)
- Event Listeners: Syncing the MongoDB database with blockchain events (e.g., `LORApproved / LORREject etc`).
- Generate LOR letter PDF and download

### 🚧 In Progress
- Frontend UI in React/Next.js
- Set user password for users registered via wallet (Currently user registering via wallet doesn't have password)
- Change password for existing user
- Scripts to fetch events (LOR creation / Approved / Rejected) missed and didn't added to database (could be due to DB connection failures)
- Integration with IPFS (Pinata):
  - Upload / save Generated LOR document to Pinata storage 
  - Storing IPFS hash  
  - Allowing users to download LOR anytime  
- Refining transaction states and UI feedback during minting/approval.

## ⚙️ System Design & Limitations

To ensure the integrity of the recommendation process and prevent spam or duplicate identities, the system follows these strict rules:

### 1. Administrative Controls
> [!IMPORTANT]
> To maintain a high level of trust, Admin and Approver roles are strictly controlled.

* **Restricted Registration:** Admins and Approvers **cannot** register & login themselves via wallet login. This keeps the list of authorized academic authorities constant and verified. Once logged in they need to connect to wallet.
* **Authority Management:** Only the **Admin** has the permission to create new Approver accounts.
* **Wallet Binding:** Only the Admin can update or change the authorized wallet addresses for themselves or Approvers to ensure account recovery and security.

### 2. Student Verification & Sybil Resistance
* **Domain Restriction:** Students can register using their crypto wallet, but they **must** provide a verified university email address (e.g., `student@exampleuniversity.edu`). Personal emails (Gmail, Yahoo, etc.) are restricted to prevent a single user from creating multiple student profiles.
* **Multi-Address Support:** A single student profile can have multiple wallet addresses associated with it, allowing students flexibility in how they interact with the DApp while maintaining a single verified academic identity.(Currently only supports Metamask Addresses, will add support for other wallets.)

---

## 🌍 Live Project

🚧 The project is still **in progress**, but you can check out the live version here:  
👉 [LOR DApp - Live Demo](https://lor-solidity-frontend.vercel.app/)

---
