import { observable, action } from "mobx";
import { get, apiDelete, postJson } from "madu/services/commun";

interface IAnswer {
    id: string;
    answer: string;
    score: number;
}

export interface IQuestion {
    id: string;
    question: string;
    questionType: string;
    answers: IAnswer[];
}

class QuestionStore {
    @observable all: IQuestion[] = [];
    @observable byId: IQuestion | null = null;

    @action get = () => {
        const endpoint = "";
        get(endpoint)
            .then((data: any) => {
                const processedData: any = data;
                // Process store once the call has succeed
                this.all = processedData.value;
            })
            .catch(err => console.log(err));
    };

    @action getById = (id: string) => {
        const endpoint = `${id}`;
        get(endpoint)
            .then((data: any) => {
                const processedData: any = data;
                // Process store once the call has succeed
                this.byId = processedData.value;
            })
            .catch(err => console.log(err));
    };

    @action add = (question: IQuestion) => {
        const endpoint = "";
        postJson(endpoint, question)
            .then(_data => {
                // Process store once the call has succeed
                this.all.push(question);
            })
            .catch(err => console.log(err));
    };

    @action editQuestion = (question: IQuestion) => {
        const endpoint = "";
        postJson(endpoint, question)
            .then(_data => {
                // Process store once the call has succeed
                const editedQuestion = this.all.map((questionRef: IQuestion) =>
                    questionRef.id === question.id ? question : questionRef
                );
                this.all = editedQuestion;
            })
            .catch(err => console.log(err));
    };

    @action remove = (id: string) => {
        const endpoint = "";
        apiDelete(endpoint)
            .then(_data => {
                // Process store once the call has succeed
                this.all = this.all.filter((point: IQuestion) => point.id !== id);
            })
            .catch(err => console.log(err));
    };

    @action reset = () => {
        this.all = [];
    };
}

export default QuestionStore;
