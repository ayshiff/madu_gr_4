import { observable, action } from "mobx";
import { post, get } from "madu/services/commun";

interface IQuestion {
    question: string;
    responses: string[];
    coefficient: number;
}

export interface ITemplate {
    id: string;
    name: string;
    questions: IQuestion[];
}

class TemplateStore {
    @observable templates: ITemplate[] = [];

    @action get = () => {
        const endpoint = "";
        get(endpoint)
            .then((data: any) => {
                const processedData: ITemplate[] = data;
                // Process store once the call has succeed
                this.templates = processedData;
            })
            .catch(err => console.log(err));
    };

    @action add = (template: ITemplate) => {
        const payload = {};
        const endpoint = "";
        post(endpoint, payload)
            .then(_data => {
                // Process store once the call has succeed
                this.templates.push(template);
            })
            .catch(err => console.log(err));
    };

    @action editTemplate = (template: ITemplate) => {
        const payload = {};
        const endpoint = "";
        post(endpoint, payload)
            .then(_data => {
                // Process store once the call has succeed
                const editedTemplate = this.templates.map((templateRef: ITemplate) =>
                    templateRef.id === template.id ? template : templateRef
                );
                this.templates = editedTemplate;
            })
            .catch(err => console.log(err));
    };

    @action remove = (id: string) => {
        const payload = {};
        const endpoint = "";
        post(endpoint, payload)
            .then(_data => {
                // Process store once the call has succeed
                this.templates = this.templates.filter((point: ITemplate) => point.id !== id);
            })
            .catch(err => console.log(err));
    };

    @action reset = () => {
        this.templates = [];
    };
}

export default TemplateStore;
