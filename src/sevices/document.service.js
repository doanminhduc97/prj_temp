import axios from "../common/api/axios";
import response from "../common/api/response";
import { HTTP_STATUS } from "../common/api/response";
export class DocumentService {
    /**
     ******************************
     * @API
     ******************************
     */

    static async getListDocument(param = {}) {
        try {
            const param = {...param };
            const res = await axios.get(`/temproject/api/v1/tailieu/list`, param);
            return response.create(res, HTTP_STATUS.OK);
        } catch (error) {
            throw new error;
        }
    }

    static async getDocumentDetail(param = {}, { id }) {
        try {
            const param = {...param };
            const res = await axios.get(`/temproject/api/v1/tailieu/detail/${id}`, param);
            return response.create(res, HTTP_STATUS.OK);
        } catch (error) {
            throw new error;
        }
    }

    static async getDetailDocument(id, param = {}) {
        try {
            const param = {...param };
            const res = await axios.get(`/temproject/api/v1/tailieu/detail/${id}`, param);
            return response.create(res, HTTP_STATUS.OK);
        } catch (error) {
            throw new error;
        }
    }

    static async approveDocument(body) {
        try {
            const requestBody = {...body };
            const res = await axios.patch(`/temproject/api/v1/tailieu/pheduyet`, requestBody);
            return response.create(res, HTTP_STATUS.OK);
        } catch (error) {
            throw new error;
        }
    }

    static async rejectDocument(body) {
        try {
            const requestBody = {...body };
            const res = await axios.patch(`/temproject/api/v1/tailieu/tuchoi`, requestBody);
            return response.create(res, HTTP_STATUS.OK);
        } catch (error) {
            throw new error;
        }
    }

    static async deleteDocument({ id }) {
        try {
            const res = await axios.delete(`/temproject/api/v1/tailieu/delete/${id}`);
            return response.create(res, HTTP_STATUS.OK);
        } catch (error) {
            throw new error;
        }
    }

    static async updateDocument(body) {
        try {
            const requestBody = {...body };
            const res = await axios.put(`/temproject/api/v1/tailieu/update`, requestBody);
            return response.create(res, HTTP_STATUS.ACCEPTED);
        } catch (error) {
            throw new error;
        }
    }

    static async addDocument(body) {
        try {
            const requestBody = {...body };
            const res = await axios.post(`/temproject/api/v1/tailieu/add`, requestBody);
            return response.create(res, HTTP_STATUS.CREATED);
        } catch (error) {
            throw new error;
        }
    }

    static async uploadFile(file) {
        try {
            const res = await axios.post(`/temproject/uploadMultipleFiles`, file);
            return response.create(res, HTTP_STATUS.CREATED);
        } catch (error) {
            throw new error;
        }
    }
    static async browseDocument(id) {
        try {
            const res = await axios.patch(`/temproject/api/v1/tailieu/pheduyet`, { id });
            return response.create(res, HTTP_STATUS.ACCEPTED);
        } catch (error) {
            throw new error;
        }
      }
    
      static async refuseDocument(body) {
        try {
            const requestBody = {...body };
            const res = await axios.patch(`/temproject/api/v1/tailieu/tuchoi`, requestBody);
            return response.create(res, HTTP_STATUS.ACCEPTED);
        } catch (error) {
            throw new error;
        }
      }

}