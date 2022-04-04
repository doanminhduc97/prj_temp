import axios from "../common/api/axios";
import response from "../common/api/response";
import { HTTP_STATUS } from "../common/api/response";
export class UserGroup {
    /**
     ******************************
     * @API
     ******************************
     */

    static async deleteGroupById({ id }) {
        try {
            const res = await axios.delete(`/temproject/api/v1/nhomnguoidung/delete/${id}`);
            return response.create(res, HTTP_STATUS.OK);
        } catch (error) {
            throw new error;
        }
    }
}