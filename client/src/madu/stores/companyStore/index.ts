import { observable, action } from "mobx";
import { get, apiDelete, postJson } from "madu/services/commun";
import { editReference, removeReference } from "../utils/index";

const { REACT_APP_API_BASE_URL } = process.env;

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
        const endpoint = `${REACT_APP_API_BASE_URL}/`;
        return get(endpoint)
            .then((data: any) => {
                const processedData: any = data;
                // Process store once the call has succeed
                this.all = processedData.value;
                return;
            })
            .catch(err => console.log(err));
    };

    @action getById = (id: string) => {
        const endpoint = `${REACT_APP_API_BASE_URL}/${id}`;
        return get(endpoint)
            .then((data: any) => {
                const processedData: any = data;
                // Process store once the call has succeed
                this.byId = processedData.value;
                return;
            })
            .catch(err => console.log(err));
    };

    @action add = (company: ICompany) => {
        const endpoint = `${REACT_APP_API_BASE_URL}/`;
        return postJson(endpoint, company)
            .then(data => {
                // Process store once the call has succeed
                this.all.push(data as any);
                return;
            })
            .catch(err => console.log(err));
    };

    @action edit = (id: string, company: ICompany) => {
        const endpoint = `${REACT_APP_API_BASE_URL}/${id}`;

        return postJson(endpoint, company)
            .then(data => {
                // Process store once the call has succeed
                this.all = editReference(id, company, this.all);
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

export default CompanyStore;
