import axios from "../common/api/axios";
import response from "../common/api/response";
import { HTTP_STATUS } from "../common/api/response";
export class FeatureService {
    /**
     ******************************
     * @API
     ******************************
     */

    static async getListFeatures(param = {}) {
        try {
            const param = { ...param };
            const res = await axios.get(`/temproject/api/v1/chucnang/list`, param);
            return response.create(res, HTTP_STATUS.OK);
        } catch (error) {
            throw new error;
        }
    }

    static async getDropdownKey(param = {}) {
        try {
            const param = { ...param };
            const res = await axios.get(`/temproject/api/v1/chucnang/dropdownkhoacha`, param);
            return response.create(res, HTTP_STATUS.OK);
        } catch (error) {
            throw new error;
        }
    }

    static async getDropdownAction(param = {}) {
        try {
            const param = { ...param };
            const res = await axios.get(`/temproject/api/v1/chucnang/dropdownaction`, param);
            return response.create(res, HTTP_STATUS.OK);
        } catch (error) {
            throw new error;
        }
    }

    static async changeStatus(body) {
        try {
            const requestBody = {...body };
            const res = await axios.put(`/temproject/api/v1/chucnang/changestatus`, requestBody);
            return response.create(res, HTTP_STATUS.ACCEPTED);
        } catch (error) {
            throw new error;
        }
    }

    static async getDetailFeature(id, param = {}) {
        try {
            const param = { ...param };
            const res = await axios.get(`/temproject/api/v1/chucnang/detail/${id}`, param);
            return response.create(res, HTTP_STATUS.OK);
        } catch (error) {
            throw new error;
        }
    }

    static async checkCode(param = {}) {
        try {
            const param = { ...param };
            const res = await axios.get(`/temproject/api/v1/chucnang/checkcode`, param);
            return response.create(res, HTTP_STATUS.OK);
        } catch (error) {
            throw new error;
        }
    }

    static async deleteFeature({ id }) {
        try {
            const res = await axios.delete(`/temproject/api/v1/chucnang/delete/${id}`);
            return response.create(res, HTTP_STATUS.OK);
        } catch (error) {
            throw new error;
        }
    }

    static async updateFeature(body) {
        try {
            const requestBody = {...body };
            const res = await axios.put(`/temproject/api/v1/chucnang/update`, requestBody);
            return response.create(res, HTTP_STATUS.ACCEPTED);
        } catch (error) {
            throw new error;
        }
    }

    static async addFeature(body) {
        try {
            const requestBody = {...body };
            const res = await axios.post(`/temproject/api/v1/chucnang/add`, requestBody);
            return response.create(res, HTTP_STATUS.CREATED);
        } catch (error) {
            throw new error;
        }
    }

    static async checkExistsFeatureId(body) {
        try {
            const requestBody = {...body };
            const res = await axios.get(`/temproject/api/v1/chucnang/checkcode`, requestBody);
            return response.create(res, HTTP_STATUS.CREATED);
        } catch (error) {
            throw new error;
        }
    }

}