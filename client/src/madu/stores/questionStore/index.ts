import { observable, action } from "mobx";
import { post, get, apiDelete } from "madu/services/commun";

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
    @observable questions: IQuestion[] = [];

    @action get = () => {
        const endpoint = "";
        get(endpoint)
            .then((data: any) => {
                const processedData: IQuestion[] = data;
                // Process store once the call has succeed
                this.questions = processedData;
            })
            .catch(err => console.log(err));
    };

    @action add = (question: IQuestion) => {
        const payload = {};
        const endpoint = "";
        post(endpoint, payload)
            .then(_data => {
                // Process store once the call has succeed
                this.questions.push(question);
            })
            .catch(err => console.log(err));
    };

    @action editQuestion = (question: IQuestion) => {
        const payload = {};
        const endpoint = "";
        post(endpoint, payload)
            .then(_data => {
                // Process store once the call has succeed
                const editedQuestion = this.questions.map((questionRef: IQuestion) =>
                    questionRef.id === question.id ? question : questionRef
                );
                this.questions = editedQuestion;
            })
            .catch(err => console.log(err));
    };

    @action remove = (id: string) => {
        const endpoint = "";
        apiDelete(endpoint)
            .then(_data => {
                // Process store once the call has succeed
                this.questions = this.questions.filter((point: IQuestion) => point.id !== id);
            })
            .catch(err => console.log(err));
    };

    @action reset = () => {
        this.questions = [];
    };
}

export default QuestionStore;
