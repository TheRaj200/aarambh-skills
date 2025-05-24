import axios from "axios"
import { authToken } from "../utils/constants"
import envConfig from "../utils/envConfig"

export class course {

    static fetchCourse = async () => {
        try {
            const token = authToken
            const response = await axios.get(`${envConfig.backendUrl}/courses/admin/get_course`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            return { status: true, data: response.data.data }
        } catch (err) {
            console.log("Error in fetching ", err)
            return { status: false, error: err?.response?.data?.error || "Error Fetching Courses" }
        }
    }

    static uploadVideo = async (formData) => {
        try {
            const token = authToken
            const response = await axios.post(`${envConfig.backendUrl}/courses/admin/file_upload`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log("File Upload response is ", response)
            return { status: true, data: response.data.data }
        } catch (error) {
            console.log("Error in Uploading Video ", error)
            return { status: false, error: error?.response?.data?.error || "Error Uploading video" }
        }
    }

    static uploadVideoWithTitleAndDes = async (data, courseId) => {
        try {
            const token = authToken
            const response = await axios.post(`${envConfig.backendUrl}/courses/admin/create_video/${courseId}`, data, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "Application/json"
                }
            });
            console.log("File Upload with title and desc response is ", response)
            return { status: true, data: response.data.data }
        } catch (error) {
            console.log("Error in Uploading Video ", error)
            return { status: false, error: error?.response?.data?.error || "Error Uploading video Data to course" }
        }
    }

    static uploadQuizInBulk = async (data, courseId) => {
        try {
            const token = authToken
            const response = await axios.post(`${envConfig.backendUrl}/courses/admin/quiz_bulk/${courseId}`, data, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "Application/json"
                }
            });
            console.log("Quiz Upload response is ", response)
            return { status: true, data: response.data.data }
        } catch (error) {
            console.log("Error in Uploading Quizz ", error)
            let message = "";
            if (error?.response?.data?.error) message = error?.response?.data?.error;
            else if (error?.response?.data?.message) message = error?.response?.data?.message
            else message = "Error Uploading Quiz Data to course"
            return { status: false, error: message }
        }
    }
}