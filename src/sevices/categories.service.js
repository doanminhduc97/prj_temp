import axios from "../common/api/axios";
import response from "../common/api/response";
import { HTTP_STATUS } from "../common/api/response";

export class Categories {
  /**
   ******************************
   * @API
   ******************************
   */

  static async getCategoriesList(body = {}) {
    try {
      const requestBody = { ...body };
      const res = await axios.get(`/temproject/api/v1/chuyenmuc/list`,requestBody);
      return response.create(res, HTTP_STATUS.OK);
    } catch (error) {
      throw new error();
    }
  }

  static async getCategoryById(catId) {
    try {
      const res = await axios.get(`/temproject/api/v1/chuyenmuc/detail/${catId}`);
      return response.create(res, HTTP_STATUS.OK);
    } catch (error) {
      throw new error();
    }
  }

  static async deleteCategoriesById(id) {
    try {
      const res = await axios.delete(`/temproject/api/v1/chuyenmuc/delete/${id}`);
      return response.create(res, HTTP_STATUS.OK);
    } catch (error) {
      throw new error();
    }
  }

  static async addCategory(body) {
    try {
      const requestBody = {...body };
      const res = await axios.post(`/temproject/api/v1/chuyenmuc/add`, requestBody);
      return response.create(res, HTTP_STATUS.CREATED);
    } catch (error) {
      throw new error;
    }
  }

  static async updateCategory(body) {
    try {
        const requestBody = {...body };
        const res = await axios.put(`/temproject/api/v1/chuyenmuc/update`, requestBody);
        return response.create(res, HTTP_STATUS.ACCEPTED);
    } catch (error) {
        throw new error;
    }
  }
  static async browseCategory(id) {
    try {
        const res = await axios.patch(`/temproject/api/v1/chuyenmuc/pheduyet`, { id });
        return response.create(res, HTTP_STATUS.ACCEPTED);
    } catch (error) {
        throw new error;
    }
  }

  static async refuseCategory(body) {
    try {
        const requestBody = {...body };
        const res = await axios.patch(`/temproject/api/v1/chuyenmuc/tuchoi`, requestBody);
        return response.create(res, HTTP_STATUS.ACCEPTED);
    } catch (error) {
        throw new error;
    }
  }

}
