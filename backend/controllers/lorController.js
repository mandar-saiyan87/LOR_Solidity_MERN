import LORRequest from "../models/LOR.js"
import ejs from 'ejs'
import path from 'path'
import puppeteer from 'puppeteer'

export async function GetLORbyUserController(req, res) {
    try {

        if (req.user.role === "Admin" || req.user.role === "Approver") {
            const lorRequests = await LORRequest.find()
            return res.status(200).json({ message: "LOR Requests fetched successfully", lorRequests })
        }

        const lorRequests = await LORRequest.find({ studentId: req.user._id })
        return res.status(200).json({ message: "LOR Requests fetched successfully", lorRequests })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error, Something went wrong!", error: error.message })
    }
}

export async function GenerateLORLetter(req, res) {
    try {

        const templateData = req.body
        // console.log(templateData)

        const htmltemplate = path.join(process.cwd(), "lortemplate", "lortemplate.ejs")
        const html = await ejs.renderFile(htmltemplate, { templateData })
        // console.log(html)

        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        // await page.setContent(html, { waitUntil: 'networkidle0' }) // Wait until the page is fully loaded
        await page.setContent(html) // Wait until the page is fully loaded
        const pdfdoc = await page.pdf({ format: 'A4', printBackground: true, })
        await browser.close();

        res.status(200).set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `inline; filename='${templateData.studentName}-${templateData.courseName}-LOR.pdf'`
        }).send(pdfdoc);

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error generating LOR", error: error.message })
    }
}