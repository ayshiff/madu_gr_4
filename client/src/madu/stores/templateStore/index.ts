import { observable, action } from "mobx";
import { post, get, apiDelete } from "madu/services/commun";
import { IQuestion } from "../questionStore";
import { editReference, removeReference } from "../utils";

export interface ITemplate {
    id: string;
    name: string;
    questions: IQuestion[];
}

class TemplateStore {
    @observable all: ITemplate[] = [];
    @observable byId: ITemplate | null = null;

    @action get = () => {
        const endpoint = "";
        get(endpoint)
            .then((data: any) => {
                const processedData: ITemplate[] = data;
                // Process store once the call has succeed
                this.all = processedData;
            })
            .catch(err => console.log(err));
    };

    @action getByID = (id: string) => {
        const endpoint = `${id}`;
        get(endpoint)
            .then((data: any) => {
                const processedData: ITemplate = data;
                // Process store once the call has succeed
                this.byId = processedData;
            })
            .catch(err => console.log(err));
    };

    @action add = (template: ITemplate) => {
        const payload = {};
        const endpoint = "";
        post(endpoint, payload)
            .then(_data => {
                // Process store once the call has succeed
                this.all.push(template);
            })
            .catch(err => console.log(err));
    };

    @action editTemplate = (id: string, template: ITemplate) => {
        const payload = {};
        const endpoint = `${id}`;
        post(endpoint, payload)
            .then(_data => {
                // Process store once the call has succeed
                const editedTemplate = editReference(id, template, this.all);
                this.all = editedTemplate;
                this.byId = template;
            })
            .catch(err => console.log(err));
    };

    @action remove = (id: string) => {
        const endpoint = "";
        apiDelete(endpoint)
            .then(_data => {
                // Process store once the call has succeed
                this.all = removeReference(id, this.all);
            })
            .catch(err => console.log(err));
    };

    @action reset = () => {
        this.all = [];
    };
}

export default TemplateStore;
