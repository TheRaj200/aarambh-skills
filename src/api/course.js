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

    static uploadProject = async (data, courseId) => {
        try {
            const token = authToken
            const response = await axios.post(`${envConfig.backendUrl}/courses/admin/course_project/${courseId}`, data, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "Application/json"
                }
            });
            console.log("Project Upload response is ", response)
            return { status: true, data: response.data.data }
        } catch (error) {
            console.log("Error in Uploading Project ", error)
            let message = "";
            if (error?.response?.data?.error) message = error?.response?.data?.error;
            else if (error?.response?.data?.message) message = error?.response?.data?.message
            else message = "Error Uploading Project Data "
            return { status: false, error: message }
        }
    }

    static fetchCourseDetailById = async (courseId) => {
        try {
            const token = authToken
            const response = await axios.get(`${envConfig.backendUrl}/courses/admin/course_detail/${courseId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "Application/json"
                }
            });
            return { status: true, data: response.data.data }
        } catch (error) {
            console.log("Error in Getting Course By Id", error)
            let message = "";
            if (error?.response?.data?.error) message = error?.response?.data?.error;
            else if (error?.response?.data?.message) message = error?.response?.data?.message
            else message = "Error in Getting Course"
            return { status: false, error: message }
        }
    }

    static getALLBundles = async () => {
        try {
            const token = authToken
            const response = await axios.get(`${envConfig.backendUrl}/courses/admin/get_bundles`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "Application/json"
                }
            });
            return { status: true, data: response.data.data }
        } catch (error) {
            console.log("Error in Getting Bundles", error)
            let message = "";
            if (error?.response?.data?.error) message = error?.response?.data?.error;
            else if (error?.response?.data?.message) message = error?.response?.data?.message
            else message = "Error in Getting Bundles"
            return { status: false, error: message }
        }
    }

    static toggleBundleStatus = async (status, id) => {
        try {
            const token = authToken
            console.log("Token si ", authToken, status)
            const response = await axios.put(`${envConfig.backendUrl}/courses/admin/update_bundle/${id}`,
                {
                    status
                },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "Application/json"
                    }
                });
            return { status: true, data: response.data.data }
        } catch (error) {
            console.log("Error in Updating  Bundles", error)
            let message = "";
            if (error?.response?.data?.error) message = error?.response?.data?.error;
            else if (error?.response?.data?.message) message = error?.response?.data?.message
            else message = "Error in Updating Bundles"
            return { status: false, error: message }
        }
    }

    static deleteBundle = async (id) => {
        try {
            const token = authToken
            console.log("Token si ", authToken, status)
            const response = await axios.put(`${envConfig.backendUrl}/courses/admin/delete_bundle/${id}`, {},
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "Application/json"
                    }
                });
            return { status: true, data: response.data.data }
        } catch (error) {
            console.log("Error in Updating  Bundles", error)
            let message = "";
            if (error?.response?.data?.error) message = error?.response?.data?.error;
            else if (error?.response?.data?.message) message = error?.response?.data?.message
            else message = "Error in Updating Bundles"
            return { status: false, error: message }
        }
    }

    static createCoupenCode = async (data) => {
        try {
            const token = authToken
            const response = await axios.post(`${envConfig.backendUrl}/cart/admin/add_coupon`, data,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "Application/json"
                    }
                });
            return { status: true, data: response.data.data }
        } catch (error) {
            console.log("Error in Adding  Coupen", error)
            let message = "";
            if (error?.response?.data?.error) message = error?.response?.data?.error;
            else if (error?.response?.data?.message) message = error?.response?.data?.message
            else message = "Error in Adding Coupen"
            return { status: false, error: message }
        }
    }

    static getALLCoupenCode = async () => {
        try {
            const token = authToken
            const response = await axios.get(`${envConfig.backendUrl}/cart/admin/get_coupon`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "Application/json"
                    }
                });
            return { status: true, data: response.data.data }
        } catch (error) {
            console.log("Error in Adding  Coupen", error)
            let message = "";
            if (error?.response?.data?.error) message = error?.response?.data?.error;
            else if (error?.response?.data?.message) message = error?.response?.data?.message
            else message = "Error in Adding Coupen"
            return { status: false, error: message }
        }
    }

    static toggleCouponStatus = async (status, id) => {
        try {
            const token = authToken
            const response = await axios.put(`${envConfig.backendUrl}/cart/admin/update_coupon/${id}`,
                {
                    status
                },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "Application/json"
                    }
                });
            return { status: true, data: response.data.data }
        } catch (error) {
            console.log("Error in Updating  Bundles", error)
            let message = "";
            if (error?.response?.data?.error) message = error?.response?.data?.error;
            else if (error?.response?.data?.message) message = error?.response?.data?.message
            else message = "Error in Updating Bundles"
            return { status: false, error: message }
        }
    }

    static deleteCoupon = async (id) => {
        try {
            const token = authToken
            const response = await axios.put(`${envConfig.backendUrl}/cart/admin/delete_coupon/${id}`, {},
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "Application/json"
                    }
                });
            return { status: true, data: response.data.data }
        } catch (error) {
            console.log("Error in Updating  Bundles", error)
            let message = "";
            if (error?.response?.data?.error) message = error?.response?.data?.error;
            else if (error?.response?.data?.message) message = error?.response?.data?.message
            else message = "Error in Updating Bundles"
            return { status: false, error: message }
        }
    }
}