/*
This script file has scripts to fetch LORs based on events (New LOR Fetch, Approved LOR, REJETED LOR)
These scripts are created for the scenario where if LOR is created or updated (APPROVED, REJETED)
updated at blockchain but not updated in the database due to backend failure. So by running these scripts we can sync data between blockchaoin and database.
These scripts can be run manually or set as cron job.
*/


import { connectDB } from "./dbConnection.js";
import LORRequest from "../models/LOR.js";
import { contractEventLogs } from "../utils/ethersprovider.js";
import { getYesterdayRange } from "../utils/LORDateFunc.js";
import { config } from 'dotenv'

config()


async function lorcronjob() {
    const isConnectDB = await connectDB()

    if (!isConnectDB) {
        console.log("Database connection failed")
        return
    }

    // get latest blocknumber from yesterday i.e. last block
    try {
        const { yesterdaystart, yesterdayEnd } = getYesterdayRange()
        const yesterdayLatestLORBlock = await LORRequest.find({ requestedAt: { $gte: yesterdaystart, $lte: yesterdayEnd } }).sort({ blockNumber: -1 })
        const startBlock = yesterdayLatestLORBlock && yesterdayLatestLORBlock.length > 0 ? yesterdayLatestLORBlock[0].blockNumber : Number(process.env.STARTING_BLOCK_NUMBER)

        // Filter instance
        const contractLORFilter = contractEventLogs.filters.LORRequested()

        const contractLORLogs = await contractEventLogs.queryFilter(contractLORFilter, startBlock, "latest")
        // console.log(contractLORLogs)
        if (contractLORLogs && contractLORLogs.length > 0) {
            for (let i = 0; i < contractLORLogs.length; i++) {
                const lorRequest = await contractEventLogs.getLORRequest(contractLORLogs[i].args.requestId)
                const lorExist = await LORRequest.findOne({ requestId: lorRequest.requestId.toString() })

                if (!lorExist) {
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
        } else {
            console.log("ℹ️ No new LOR requests found in this range.")
        }
    } catch (error) {
        console.log(error)
    }

}



async function lorapprovedcronjob() {
    const isConnectDB = await connectDB()

    if (!isConnectDB) {
        console.log("Database connection failed")
        return
    }

    // get latest blocknumber from yesterday i.e. last block
    try {
        const { yesterdaystart, yesterdayEnd } = getYesterdayRange()
        const yesterdayLatestLORBlock = await LORRequest.find({ requestedAt: { $gte: yesterdaystart, $lte: yesterdayEnd } }).sort({ blockNumber: -1 })
        const startBlock = yesterdayLatestLORBlock && yesterdayLatestLORBlock.length > 0 ? yesterdayLatestLORBlock[0].blockNumber : Number(process.env.STARTING_BLOCK_NUMBER)

        // Filter instance
        const contractLORFilter = contractEventLogs.filters.LORApproved()

        const contractLORLogs = await contractEventLogs.queryFilter(contractLORFilter, startBlock, "latest")
        // console.log(contractLORLogs)
        if (contractLORLogs && contractLORLogs.length > 0) {
            for (let i = 0; i < contractLORLogs.length; i++) {
                const lorRequest = await contractEventLogs.getLORRequest(contractLORLogs[i].args.requestId)
                const lorExist = await LORRequest.findOne({ requestId: lorRequest.requestId.toString() })

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


async function lorrejectedcronjob() {
    const isConnectDB = await connectDB()

    if (!isConnectDB) {
        console.log("Database connection failed")
        return
    }


    // get latest blocknumber from yesterday i.e. last block
    try {
        const { yesterdaystart, yesterdayEnd } = getYesterdayRange()
        const yesterdayLatestLORBlock = await LORRequest.find({ requestedAt: { $gte: yesterdaystart, $lte: yesterdayEnd } }).sort({ blockNumber: -1 })
        const startBlock = yesterdayLatestLORBlock && yesterdayLatestLORBlock.length > 0 ? yesterdayLatestLORBlock[0].blockNumber : Number(process.env.STARTING_BLOCK_NUMBER)

        // Filter instance
        const contractLORFilter = contractEventLogs.filters.LORRejected()

        const contractLORLogs = await contractEventLogs.queryFilter(contractLORFilter, startBlock, "latest")
        // console.log(contractLORLogs)
        if (contractLORLogs && contractLORLogs.length > 0) {
            for (let i = 0; i < contractLORLogs.length; i++) {
                const lorRequest = await contractEventLogs.getLORRequest(contractLORLogs[i].args.requestId)
                const lorExist = await LORRequest.findOne({ requestId: lorRequest.requestId.toString() })

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