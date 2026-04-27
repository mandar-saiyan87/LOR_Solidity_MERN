/*
This script file has scripts to fetch LORs based on events (New LOR Fetch, Approved LOR, REJETED LOR)
These scripts are created for the scenario where if LOR is created or updated (APPROVED, REJETED)
at blockchain but not updated/fetched in the database due to backend failure. So by running these scripts we can sync data between blockchaoin and database.
These scripts can be run manually or set as cron job.
*/

import { connectDB } from "./dbConnection.js";
import LORRequest from "../models/LOR.js";
import { getContractEventLogs } from "../utils/ethersprovider.js";
import { config } from 'dotenv'
import { get } from "mongoose";
import Student from "../models/Users/Student.js";

config()

const contractEventLogs = getContractEventLogs()

// Fetch LOR which are created but not fetched (status = PENDING)
async function lorcronjob() {
    const isConnectDB = await connectDB()

    if (!isConnectDB) {
        console.log("Database connection failed")
        return
    }

    // get latest blocknumber from database (Last added block for pending LOR requests)
    try {

        const latestblock = await LORRequest.findOne({ status: "PENDING" }).sort({ blockNumber: -1 })
        const startBlock = latestblock && latestblock.blockNumber ? latestblock.blockNumber + 1 : Number(process.env.STARTING_BLOCK_NUMBER)

        // Filter instance
        const contractLORFilter = contractEventLogs.filters.LORRequested()

        const contractLORLogs = await contractEventLogs.queryFilter(contractLORFilter, startBlock, "latest")
        // console.log(contractLORLogs)
        // If there are new LOR requests in this range
        if (contractLORLogs && contractLORLogs.length > 0) {
            for (let i = 0; i < contractLORLogs.length; i++) {
                const lorRequest = await contractEventLogs.getLORRequest(contractLORLogs[i].args.requestId)

                const lorExist = await LORRequest.findOne({ requestId: lorRequest.requestId.toString() })
                // If LOR does not exist in database then create new LOR request
                if (!lorExist) {

                    const studentDetails = await Student.findOne({ walletaddress: lorRequest.studentAddress })

                    const requestData = {
                        requestId: lorRequest.requestId.toString(),
                        studentId: studentDetails._id,
                        studentAddress: lorRequest.studentAddress,
                        requesterAddress: lorRequest.requester,
                        approverAddress: lorRequest.approver,
                        fullname: lorRequest.name,
                        program: lorRequest.program,
                        university: lorRequest.university,
                        status: "PENDING",
                        txHash: contractLORLogs[i].transactionHash,
                        blockNumber: contractLORLogs[i].blockNumber,
                        pdfLink: null,
                        requestedAt: new Date().toISOString()
                    }
                    const newLORRequest = new LORRequest(requestData)
                    const result = await newLORRequest.save()
                }

            }
            console.log(`✅ LOR-GET fetching job completed successfully — ${contractLORLogs.length} logs processed.`)
            return
        } else {
            console.log("ℹ️ No new LOR requests found in this range.")
            return
        }
    } catch (error) {
        console.log(error)
        return
    }

}


// LOR approved but not fetched in databse (status = APPROVED)
async function lorapprovedcronjob() {
    const isConnectDB = await connectDB()

    if (!isConnectDB) {
        console.log("Database connection failed")
        return
    }

    // get latest blocknumber from database (Last added block for approved LOR requests)
    try {

        const latestblock = await LORRequest.findOne({ status: "APPROVED" }).sort({ updatedblockNumber: -1 })
        const startBlock = latestblock && latestblock.updatedblockNumber ? latestblock.updatedblockNumber + 1 : Number(process.env.STARTING_BLOCK_NUMBER)

        // Filter instance
        const contractLORFilter = contractEventLogs.filters.LORApproved()

        const contractLORLogs = await contractEventLogs.queryFilter(contractLORFilter, startBlock, "latest")
        // console.log(contractLORLogs)
        // If there are new LOR approved requests in this range
        if (contractLORLogs && contractLORLogs.length > 0) {
            for (let i = 0; i < contractLORLogs.length; i++) {
                const lorRequest = await contractEventLogs.getLORRequest(contractLORLogs[i].args.requestId)
                const lorExist = await LORRequest.findOne({ requestId: lorRequest.requestId.toString() })
                //LOR in database showing status as PENDING but on chain it is approved
                if (lorExist && lorExist.status !== lorRequest.isApproved) {

                    // console.log(`lorid: ${lorRequest.requestId.toString()} status: ${lorRequest.isApproved && "APPROVED"}`)
                    const requestData = {
                        status: "APPROVED",
                        updatedtxHash: contractLORLogs[i].transactionHash,
                        updatedblockNumber: contractLORLogs[i].blockNumber,
                        approverAddress: lorRequest.approver,
                        approvedAt: lorRequest.isApproved ? new Date().toISOString() : null,
                        rejectedAt: lorRequest.isRejected ? new Date().toISOString() : null
                    }

                    await LORRequest.updateOne({ requestId: lorRequest.requestId.toString() }, { $set: requestData })

                }

            }
            console.log(`✅ LOR-APPROVED fetching job completed successfully — ${contractLORLogs.length} logs processed.`)

        } else {
            console.log("ℹ️ No new LOR requests found in this range.")
        }
    } catch (error) {
        console.log(error)
    }

}

// LOR rejected but not fetched in databse (status = REJECTED)
async function lorrejectedcronjob() {
    const isConnectDB = await connectDB()

    if (!isConnectDB) {
        console.log("Database connection failed")
        return
    }


    // get latest blocknumber from database (Last added block for rejected LOR requests)
    try {

        const latestblock = await LORRequest.findOne({ status: "REJECTED" }).sort({ updatedblockNumber: -1 })
        const startBlock = latestblock && latestblock.updatedblockNumber ? latestblock.updatedblockNumber + 1 : Number(process.env.STARTING_BLOCK_NUMBER)

        // Filter instance
        const contractLORFilter = contractEventLogs.filters.LORRejected()

        const contractLORLogs = await contractEventLogs.queryFilter(contractLORFilter, startBlock, "latest")
        // console.log(contractLORLogs)
        // If there are new LOR rejected requests in this range
        if (contractLORLogs && contractLORLogs.length > 0) {
            for (let i = 0; i < contractLORLogs.length; i++) {
                const lorRequest = await contractEventLogs.getLORRequest(contractLORLogs[i].args.requestId)
                const lorExist = await LORRequest.findOne({ requestId: lorRequest.requestId.toString() })
                // LOR in database showing status as PENDING but on chain it is rejected
                if (lorExist && lorExist.status !== lorRequest.isRejected) {

                    // console.log(`lorid: ${lorRequest.requestId.toString()} status: ${lorRequest.isApproved && "APPROVED"}`)
                    const requestData = {
                        status: "REJECTED",
                        updatedtxHash: contractLORLogs[i].transactionHash,
                        updatedblockNumber: contractLORLogs[i].blockNumber,
                        approverAddress: lorRequest.approver,
                        approvedAt: lorRequest.isApproved ? new Date().toISOString() : null,
                        rejectedAt: lorRequest.isRejected ? new Date().toISOString() : null
                    }

                    await LORRequest.updateOne({ requestId: lorRequest.requestId.toString() }, { $set: requestData })

                }

            }
            console.log(`✅ LOR-REJECTED fetching job completed successfully — ${contractLORLogs.length} logs processed.`)
        } else {
            console.log("ℹ️ No new LOR requests found in this range.")
        }
    } catch (error) {
        console.log(error)
    }

}

// lorcronjob()
// lorapprovedcronjob()
// lorrejectedcronjob()