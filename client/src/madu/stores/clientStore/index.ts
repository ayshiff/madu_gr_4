import { observable, action } from "mobx";
import { post, get, apiDelete } from "madu/services/commun";
import { editReference, removeReference } from "../utils";

export interface IClient {
    id: string;
    phone: string;
    name: string;
    adress: string;
    contact_email: string;
    contact_name: string;
    domain_mail: string;
}

class ClientStore {
    @observable clients: IClient[] = [];

    @action get = () => {
        const endpoint = "";
        return get(endpoint)
            .then((data: any) => {
                const processedData: IClient[] = data;
                // Process store once the call has succeed
                this.clients = processedData;
                return;
            })
            .catch(err => console.log(err));
    };

    @action getById = (id: string) => {
        const endpoint = "";
        return get(endpoint)
            .then((data: any) => {
                const processedData: IClient[] = data;
                // Process store once the call has succeed
                this.clients = processedData;
                return;
            })
            .catch(err => console.log(err));
    };

    @action add = (client: IClient) => {
        const payload = {};
        const endpoint = "";
        return post(endpoint, payload)
            .then(data => {
                // Process store once the call has succeed
                this.clients.push(data as any);
                return;
            })
            .catch(err => console.log(err));
    };

    @action edit = (client: IClient) => {
        const payload = {};
        const endpoint = "";

        return post(endpoint, payload)
            .then(data => {
                // Process store once the call has succeed
                this.clients = editReference(client, this.clients);
                return;
            })
            .catch(err => console.log(err));
    };

    @action remove = (id: string) => {
        const endpoint = "";
        return apiDelete(endpoint)
            .then(_data => {
                // Process store once the call has succeed
                this.clients = removeReference(id, this.clients);
                return;
            })
            .catch(err => console.log(err));
    };

    @action reset = () => {
        this.clients = [];
    };
}

export default ClientStore;
