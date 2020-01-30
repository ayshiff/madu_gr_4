import { observable, action } from "mobx";

interface IClient {
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

    @action add = (client: IClient) => {
        this.clients.push(client);
    };

    @action edit = (client: IClient) => {
        const editedPointOfInterests = this.clients.map((point: IClient) => {
            if (point.id === client.id) {
                return client;
            }
            return point;
        });
        this.clients = editedPointOfInterests;
    };

    @action remove = (id: string) => {
        this.clients = this.clients.filter((point: IClient) => point.id !== id);
    };

    @action reset = () => {
        this.clients = [];
    };
}

export default ClientStore;
