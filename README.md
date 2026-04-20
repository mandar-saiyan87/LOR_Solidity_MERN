# 🧾 TrustDoc — Decentralized Document Approval System
Demonstrated through a University Letter of Recommendation workflow

TrustDoc is a proof-of-concept decentralized document approval system built on Ethereum, demonstrating how blockchain technology can bring transparency, authenticity, and immutability to any workflow involving sensitive or legally significant documents.
The system is demonstrated through a University Letter of Recommendation workflow — where students request documents and authorized approvers accept or reject them — but the underlying architecture is designed to be replicable across any domain requiring trusted, verifiable document issuance.
Potential real-world applications include employment verification letters, legal affidavits, medical clearance certificates, government-issued approvals, financial compliance documents, and academic credential issuance — any scenario where document authenticity and tamper-proof audit trails matter.


---


## 🔍 Why Blockchain for Document Approval?

Traditional document approval workflows face three core problems:
- **Authenticity** — Documents can be forged or tampered with after issuance
- **Traceability** — No reliable audit trail of who approved what and when
- **Dependency** — Verification requires contacting the issuing authority directly

Blockchain solves all three:
- Every request, approval, and rejection is recorded immutably on-chain
- The approval history is publicly verifiable without contacting anyone
- IPFS storage ensures the document itself cannot be silently altered after issuance
- Smart contract logic enforces role-based access — no central authority can override the rules


---


## 🔁 Replicable Architecture

This project is structured so the core approval workflow can be 
adapted to other document-sensitive domains with minimal changes:

| Domain | Requester | Approver | Document |
|---|---|---|---|
| Academia | Student | Professor / University | Letter of Recommendation |
| Employment | Employee | HR / Manager | Experience / Relieving Letter |
| Legal | Applicant | Lawyer / Court | Affidavit / NOC |
| Healthcare | Patient | Doctor / Hospital | Medical Certificate |
| Government | Citizen | Authorised Officer | Permit / Clearance |
| Finance | Client | Compliance Officer | KYC / Audit Report |

The smart contract, event listener, and PDF generation pipeline 
remain largely the same across all these scenarios. 
Only the roles, form fields, and document templates change.


---


## 🚀 Tech Stack & Architecture Overview

The system runs across three layers:

**🔗 Blockchain Layer (Source of Truth)**
Smart contract on Sepolia handles all state changes — requests, 
approvals, rejections. This is the authoritative record.
- Solidity, Hardhat, Ethers.js
- Deployed on Sepolia: `0x039BAA8aD060f61F792f7F13d323bBaFbE267Bce`

**🧠 Backend Layer (Operational)**
Handles user sessions, email verification, PDF generation, 
and IPFS uploads. MongoDB mirrors blockchain state for fast 
querying, synced via event listeners with a cron-based 
recovery script for missed events.
- Node.js / Express, MongoDB

**🌐 Frontend Layer (Interface)** *(Active Development)*
React/Next.js DApp with MetaMask wallet integration. 
Communicates with the smart contract via Ethers.js and 
the backend API for off-chain operations.
- React.js / Next.js


---


## ✅ Core Features

- **On-Chain Request Lifecycle** — Every document request, approval, 
  and rejection is recorded as an immutable blockchain transaction
- **Role-Based Access Control** — Smart contract enforces strict 
  separation between requesters and approvers at the protocol level
- **Tamper-Proof Document Storage** — Approved documents are stored 
  on IPFS; the hash stored on-chain makes silent alteration detectable
- **Sybil Resistance** — Institutional email verification prevents 
  duplicate identities and spam requests
- **Verifiable Without Trust** — Any third party can verify an 
  approved document directly on-chain without contacting the issuing authority
- **PDF Generation & Download** — Approved documents are generated 
  server-side and made available for download, with IPFS archival (in progress)
- **Event-Driven DB Sync** — MongoDB stays in sync with blockchain 
  events via listeners, with a recovery script for missed events


---


## 📦 Current Status

### ✅ Completed
- Smart contract development, testing, Deployment on Sepolia
- LOR Request Management:
  - Create, Approve, Reject requests on-chain
- Event Listeners: Real-time MongoDB sync with blockchain events (`LORRequested`, `LORApproved`, `LORREjected`).
- PDF generation and download for approved LORs

### 🚧 In Progress
- Frontend UI in React/Next.js
- Password setup for wallet-registered users
- Password change flow for existing users


### ⚡Upcoming Updates
- Cron-based recovery script for missed blockchain events (DB connection failures, downtime gaps)
- IPFS Integration via Pinata:
  - Upload approved LOR documents to decentralized storage 
  - Store and retrieve IPFS hash on-chain  
  - Permanent download link for approved LORs  
- Soft delete flag for LOR requests to prevent ghost re-fetching.
- PDF hash stored alongside transaction hash for tamper-proof verification.
- Improved transaction state handling and UI feedback.


---


## ⚙️ System Design & Security

The system is designed around two core principles — **trust minimization** 
and **identity integrity**. Every access control decision is intentional, 
addressing real-world concerns around document authenticity and abuse prevention.

### 1. Authority & Role Management

> [!IMPORTANT]
> Admin and Approver roles are strictly controlled to maintain 
> a high level of institutional trust.

- **Controlled Admin/Approver Registration** — Admins and Approvers 
  are never self-registered. Accounts are pre-created and managed 
  exclusively by the Admin, keeping the list of authorized authorities 
  verified and constant. Wallet connection happens post-login, 
  separating identity verification from authentication.

- **Strict Authority Hierarchy** — Only the Admin can create new 
  Approver accounts, ensuring no lateral privilege escalation 
  is possible within the system.

- **Wallet Binding by Admin Only** — Wallet addresses for Admin and 
  Approver accounts can only be updated by the Admin. This prevents 
  unauthorized account takeovers while allowing legitimate key recovery.

### 2. Student Identity & Sybil Resistance

- **Institutional Email Restriction** — Students must register with 
  a verified university email address. Personal email providers 
  (Gmail, Yahoo, etc.) are blocked, ensuring each real-world identity 
  maps to exactly one student profile — preventing spam requests 
  and duplicate identities.

- **Multi-Wallet Support per Identity** — A single verified student 
  profile can have multiple wallet addresses associated with it. 
  This gives students flexibility across devices and wallets without 
  compromising identity uniqueness.
  *(Currently MetaMask only — multi-wallet provider support planned.)*


---


## 📌 Scope & Known Limitations

This is a proof-of-concept built to demonstrate the architectural 
pattern of blockchain-based document approval — not a production deployment. 
The focus is on validating the concept and demonstrating a full-stack 
Web3 development workflow end-to-end.

| Limitation | Status |
|---|---|
| Frontend UI | In progress |
| Multi-wallet provider support | Planned (currently MetaMask only) |
| IPFS integration via Pinata | Pending |
| Smart contract gas optimization | Not yet applied |
| Email verification | Domain-restricted but not cryptographically signed |


---


## 🌍 Live Project

🚧 🚧 Actively in development. The current live version demonstrates the core approval workflow end-to-end. IPFS integration and full frontend are in progress.  
👉 [Live Demo — TrustDoc on Sepolia](https://lor-solidity-frontend.vercel.app/)

---
