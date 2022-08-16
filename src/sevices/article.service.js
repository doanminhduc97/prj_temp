import axios from "../common/api/axios";
import response from "../common/api/response";
import { HTTP_STATUS } from "../common/api/response";

export class Article {
    /**
     ******************************
     * @API
     ******************************
     */

    static async getArticleList(body = {}) {
        try {
            const requestBody = {...body };
            const res = await axios.get(`/temproject/api/v1/baiviet/list`, requestBody);
            return response.create(res, HTTP_STATUS.OK);
        } catch (error) {
            throw new error();
        }
    }

    static async getArticleById(articleId) {
        try {
            const res = await axios.get(`/temproject/api/v1/baiviet/detail/${articleId}`);
            return response.create(res, HTTP_STATUS.OK);
        } catch (error) {
            throw new error();
        }
    }

    static async deleteArticleById(id) {
        try {
            const res = await axios.delete(`/temproject/api/v1/baiviet/delete/${id}`);
            return response.create(res, HTTP_STATUS.OK);
        } catch (error) {
            throw new error();
        }
    }

    static async addArticle(body) {
        try {
            const requestBody = {...body };
            const res = await axios.post(`/temproject/api/v1/baiviet/add`, requestBody);
            return response.create(res, HTTP_STATUS.CREATED);
        } catch (error) {
            throw new error;
        }
    }

    static async updateArticle(body) {
        try {
            const requestBody = {...body };
            const res = await axios.put(`/temproject/api/v1/baiviet/update`, requestBody);
            return response.create(res, HTTP_STATUS.ACCEPTED);
        } catch (error) {
            throw new error;
        }
    }
    static async browseArticle(id) {
        try {
            const res = await axios.patch(`/temproject/api/v1/baiviet/pheduyet`, { id });
            return response.create(res, HTTP_STATUS.ACCEPTED);
        } catch (error) {
            throw new error;
        }
    }

    static async refuseArticle(body) {
        try {
            const requestBody = {...body };
            const res = await axios.patch(`/temproject/api/v1/baiviet/tuchoi`, requestBody);
            return response.create(res, HTTP_STATUS.ACCEPTED);
        } catch (error) {
            throw new error;
        }
    }

}