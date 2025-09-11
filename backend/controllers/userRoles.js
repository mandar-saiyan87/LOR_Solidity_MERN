import Student from "../models/Users/Student.js"
import Admin from "../models/Users/Admin.js"
import Approver from "../models/Users/Approver.js"

export const UserRoles = {
    student: Student,
    admin: Admin,
    approver: Approver
}
