import { observable, action } from "mobx";
import { post, get, apiDelete } from "madu/services/commun";
import { editReference, removeReference } from "../utils/index";

export interface ICompany {
    id: string;
    name: string;
    domainName: string;
    street: string;
    zipCode: string;
    city: string;
    status: string;
}

class CompanyStore {
    @observable all: ICompany[] = [];
    @observable byId: ICompany | null = null;

    @action get = () => {
        const endpoint = "";
        return get(endpoint)
            .then((data: any) => {
                const processedData: ICompany[] = data;
                // Process store once the call has succeed
                this.all = processedData;
                return;
            })
            .catch(err => console.log(err));
    };

    @action getById = (id: string) => {
        const endpoint = "";
        return get(endpoint)
            .then((data: any) => {
                const processedData: ICompany = data;
                // Process store once the call has succeed
                this.byId = processedData;
                return;
            })
            .catch(err => console.log(err));
    };

    @action add = (company: ICompany) => {
        const payload = {};
        const endpoint = "";
        return post(endpoint, payload)
            .then(data => {
                // Process store once the call has succeed
                this.all.push(data as any);
                return;
            })
            .catch(err => console.log(err));
    };

    @action edit = (id: string, company: ICompany) => {
        const payload = {};
        const endpoint = "";

        return post(endpoint, payload)
            .then(data => {
                // Process store once the call has succeed
                this.all = editReference(id, company, this.all);
                return;
            })
            .catch(err => console.log(err));
    };

    @action remove = (id: string) => {
        const endpoint = "";
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

export default CompanyStore;
