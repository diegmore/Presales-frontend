import axios from 'axios';

export class ProductService{

    baseUrl = "http://localhost:8080/"
    getAll(){
        return axios.get(this.baseUrl+"products").then(res =>res.data);
    }

    save(persona) {
        return axios.post(this.baseUrl + "products", persona).then(res => res.data);
    }

}