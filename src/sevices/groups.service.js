import axios from "../common/api/axios";
import response from "../common/api/response";
import { HTTP_STATUS } from "../common/api/response";
export class GroupsService {
    /**
     ******************************
     * @API
     ******************************
     */

    static async addGroup(body) {
        try {
            const requestBody = {...body };
            const res = await axios.post(`/temproject/api/v1/nhomnguoidung/add`, requestBody);
            return response.create(res, HTTP_STATUS.CREATED);
        } catch (error) {
            throw new error;
        }
    }

    static async updateGroup(body) {
        try {
            const requestBody = {...body };
            const res = await axios.put(`/temproject/api/v1/nhomnguoidung/update`, requestBody);
            return response.create(res, HTTP_STATUS.ACCEPTED);
        } catch (error) {
            throw new error;
        }
    }

    static async deleteGroupById({ id }) {
        try {
            const res = await axios.delete(`/temproject/api/v1/nhomnguoidung/delete/${id}`);
            return response.create(res, HTTP_STATUS.OK);
        } catch (error) {
            throw new error;
        }
    }

    static async getGroupById(id) {
        try {
            const res = await axios.get(`/temproject/api/v1/nhomnguoidung/detail/${id}`);
            return response.create(res, HTTP_STATUS.OK);
        } catch (error) {
            throw new error;
        }
    }
}