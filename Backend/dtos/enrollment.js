export default class EnrollmentDTO {
    constructor(data) {
        this.student = data.student
        this.course = data.course
        this.createdAt = new Date()
        this.active = true
    }
}