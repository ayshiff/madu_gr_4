import { observable, action } from "mobx";
import { post, get } from "madu/services/commun";

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
        get(endpoint)
            .then((data: any) => {
                const processedData: IClient[] = data;
                // Process store once the call has succeed
                this.clients = processedData;
            })
            .catch(err => console.log(err));
    };

    @action add = (client: IClient) => {
        const payload = {};
        const endpoint = "";
        post(endpoint, payload)
            .then(_data => {
                // Process store once the call has succeed
                this.clients.push(client);
            })
            .catch(err => console.log(err));
    };

    @action edit = (client: IClient) => {
        const payload = {};
        const endpoint = "";
        post(endpoint, payload)
            .then(_data => {
                // Process store once the call has succeed
                const editedClient = this.clients.map((clientRef: IClient) =>
                    clientRef.id === client.id ? client : clientRef
                );
                this.clients = editedClient;
            })
            .catch(err => console.log(err));
    };

    @action remove = (id: string) => {
        const payload = {};
        const endpoint = "";
        post(endpoint, payload)
            .then(_data => {
                // Process store once the call has succeed
                this.clients = this.clients.filter((point: IClient) => point.id !== id);
            })
            .catch(err => console.log(err));
    };

    @action reset = () => {
        this.clients = [];
    };
}

export default ClientStore;
