import { observable, action } from "mobx";

interface IQuestion {
    question: string;
    responses: string[];
    coefficient: number;
}

interface ITemplate {
    id: string;
    name: string;
    questions: IQuestion[];
}

class TemplateStore {
    @observable templates: ITemplate[] = [];

    @action add = (template: ITemplate) => {
        this.templates.push(template);
    };

    @action editTemplate = (template: ITemplate) => {
        const editedTemplate = this.templates.map((templateRef: ITemplate) =>
            templateRef.id === template.id ? template : templateRef
        );
        this.templates = editedTemplate;
    };

    @action remove = (id: string) => {
        this.templates = this.templates.filter((point: ITemplate) => point.id !== id);
    };

    @action reset = () => {
        this.templates = [];
    };
}

export default TemplateStore;
