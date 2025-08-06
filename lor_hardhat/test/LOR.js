const hre = require("hardhat")
const { expect } = require("chai")
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers")


describe("LOR", function () {

    async function deployLORFixture() {

        const [owner, approver, student] = await hre.ethers.getSigners()
        const lorContractFactory = await hre.ethers.getContractFactory("LOR")
        const LOR = await lorContractFactory.deploy()
        await LOR.waitForDeployment()

        console.log(`LOR deployed to ${LOR.target}`)
        console.log(`Owner: ${owner.address}`)
        console.log(`Approver: ${owner.address}`)
        console.log(`Student: ${student.address}`)
        return { LOR, owner, student, approver }
    }


    it("Student request LOR", async function () {
        const { LOR, student } = await loadFixture(deployLORFixture)

        const requestId = 1001
        const name = "Mandar Deshpande"
        const program = "Blockchain Development"
        const university = "XYZ University"
        const studentAddress = student.address

        const tx = await LOR.connect(student).createLORRequest(requestId, studentAddress, name, program, university)

        // Check for LORRequested event emitted


        // const receipt = await tx.wait()
        // await expect(tx).to.emit(contract, "Requestname").withArgs(args emitted by event seperated with comma)
        await expect(tx).to.emit(LOR, "LORRequested").withArgs(requestId, studentAddress)

        // const iface = LOR.interface
        // const lorEvent = receipt.logs.map(logs => {
        //     try {
        //         return iface.parseLog(logs)
        //     } catch (error) {
        //         return null
        //     }
        // }).find(log => log?.name === "LORRequested")
        // if (lorEvent) {
        //     console.log(lorEvent.args.requestId)
        //     console.log(lorEvent.args.studentAddress)
        // }

    })

    it("Approver approves LOR", async function () {
        const { LOR, owner, student } = await loadFixture(deployLORFixture)

        const requestId = 1001
        const name = "Mandar Deshpande"
        const program = "Blockchain Development"
        const university = "XYZ University"
        const studentAddress = student.address

        const tx = await LOR.connect(student).createLORRequest(requestId, studentAddress, name, program, university)

        await tx.wait()

        const approve = await LOR.approveLORRequest(requestId)

        await expect(approve).to.emit(LOR, "LORApproved").withArgs(requestId, owner, studentAddress)
    })
    it("Only owner can change approver", async function () {
        const { LOR, owner, approver, student } = await loadFixture(deployLORFixture)
        await LOR.updateApprover(approver.address)

        console.log(`Owner: ${owner.address}`)
        console.log(`Approver: ${approver.address}`)

        const requestId = 1001
        const name = "Mandar Deshpande"
        const program = "Blockchain Development"
        const university = "XYZ University"
        const studentAddress = student.address

        const tx = await LOR.connect(student).createLORRequest(requestId, studentAddress, name, program, university)

        await tx.wait()

        const approve = await LOR.connect(approver).approveLORRequest(requestId)
        await expect(approve).to.emit(LOR, "LORApproved").withArgs(requestId, approver.address, studentAddress)

    })

})
