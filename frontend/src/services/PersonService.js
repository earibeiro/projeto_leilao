import BaseService from "./BaseService";

class PersonService extends BaseService {

    constructor(){
        super('person');
    }

    async login(credentials){
        const response = await this.api.post(`${this.endPoint}/login`, credentials);
        return response.data;
    }

    async logout(){
        const response = await this.api.post(`${this.endPoint}/logout`);
        return response.data;
    }

    async create(data){
        const response = await this.api.post(`${this.endPoint}`, data);
        return response.data;
    }

    async passwordCodeRequest(data){
        const response = await this.api.post(`${this.endPoint}/passwordCodeRequest`, data);
        return response.data;
    }

    async passwordRecovery(data){
        const response = await this.api.post(`${this.endPoint}/passwordRecovery`, data);
        return response.data;
    }

    async validateEmail(data){
        const response = await this.api.post(`${this.endPoint}/emailValidate`, data);
        return response.data;
    }

    async delete(id){
        const response = await this.api.delete(`${this.endPoint}/${id}`);
        return response.data;
    }

    async list(){
        const response = await this.api.get(this.endPoint);
        return response.data;
    }

    async insert(data){
        const response = await this.api.post(this.endPoint, data);
        return response.data;
    }

    async update(data){
        const response = await this.api.put(this.endPoint, data);
        return response.data;
    }
    
}

export default PersonService;