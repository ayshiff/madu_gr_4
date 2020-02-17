import { observable, action } from "mobx";
import { get, apiDelete, postJson } from "madu/services/commun";
import { editReference, removeReference } from "../utils";

export interface IClient {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    roles: string[];
    company_id: string;
}

const { REACT_APP_API_BASE_URL } = process.env;

class ClientStore {
    @observable all: IClient[] = [];
    @observable byId: IClient | null = null;

    @action get = () => {
        const endpoint = `${REACT_APP_API_BASE_URL}/`;
        return get(endpoint)
            .then((data: any) => {
                const processedData: IClient[] = data;
                // Process store once the call has succeed
                this.all = processedData;
                return;
            })
            .catch(err => console.log(err));
    };

    @action getById = (id: string) => {
        const endpoint = `${REACT_APP_API_BASE_URL}/${id}`;
        return get(endpoint)
            .then((data: any) => {
                const processedData: IClient = data;
                // Process store once the call has succeed
                this.byId = processedData;
                return;
            })
            .catch(err => console.log(err));
    };

    @action add = (client: IClient) => {
        const endpoint = `${REACT_APP_API_BASE_URL}/`;
        return postJson(endpoint, client)
            .then(data => {
                // Process store once the call has succeed
                this.all.push(data as any);
                return;
            })
            .catch(err => console.log(err));
    };

    @action edit = (id: string, client: IClient) => {
        const endpoint = `${REACT_APP_API_BASE_URL}/${id}`;

        return postJson(endpoint, client)
            .then(data => {
                // Process store once the call has succeed
                this.all = editReference(id, client, this.all);
                return;
            })
            .catch(err => console.log(err));
    };

    @action remove = (id: string) => {
        const endpoint = `${REACT_APP_API_BASE_URL}/${id}`;
        return apiDelete(endpoint)
            .then(_data => {
                // Process store once the call has succeed
                this.all = removeReference(id, this.all);
                return;
            })
            .catch(err => console.log(err));
    };

    @action reset = () => {
        this.all = [];
    };
}

export default ClientStore;
