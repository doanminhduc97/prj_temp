import axios from "../common/api/axios";
import response from "../common/api/response";
import { HTTP_STATUS } from "../common/api/response";
export class UsersService {
    /**
     ******************************
     * @API
     ******************************
     */

    static async getListUsers(param = {}) {
        try {
            const param = { ...param };
            const res = await axios.get(`/temproject/api/v1/nguoidung/list`, param);
            return response.create(res, HTTP_STATUS.OK);
        } catch (error) {
            throw new error;
        }
    }

    static async addUser(body) {
        try {
            const requestBody = {...body };
            const res = await axios.post(`/temproject/api/v1/nguoidung/add`, requestBody);
            return response.create(res, HTTP_STATUS.CREATED);
        } catch (error) {
            throw new error;
        }
    }

    static async updateUser(body) {
        try {
            const requestBody = {...body };
            const res = await axios.put(`/temproject/api/v1/nguoidung/update`, requestBody);
            return response.create(res, HTTP_STATUS.ACCEPTED);
        } catch (error) {
            throw new error;
        }
    }

    static async deleteUserById({ id }) {
        try {
            const res = await axios.delete(`/temproject/api/v1/nguoidung/delete/${id}`);
            return response.create(res, HTTP_STATUS.OK);
        } catch (error) {
            throw new error;
        }
    }

    static async getUserById(param = {}) {
        try {
            const sMaNguoiDung = param.sMaNguoiDung
            const res = await axios.get(`/temproject/api/v1/nguoidung/list`, { sMaNguoiDung: sMaNguoiDung });
            return response.create(res, HTTP_STATUS.OK);
        } catch (error) {
            throw new error;
        }
    }
}