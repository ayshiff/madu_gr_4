import { observable, action } from "mobx";
import { post, get, apiDelete } from "madu/services/commun";
import { editReference, removeReference } from "../utils/index";

interface IDay {
    from: string;
    to: string;
}

interface IQuestion {
    id: string;
    question: string;
    answer: string;
    score: number;
}

export interface IPointOfInterest {
    id: string;
    name: string;
    poiType: string;
    street: string;
    zipCode: number;
    city: string;
    phone: string;
    email: string;
    siret: string;
    openingTime: {
        monday: IDay[];
        tuesday: IDay[];
        wednesday: IDay[];
        thursday: IDay[];
        friday: IDay[];
        saturday: IDay[];
        sunday: IDay[];
    };
    priceRange: string;
    description: string;
    website: string;
    template: {
        id: string;
        name: string;
        questions: IQuestion[];
    };
    token: string;
    status: string;
}

class PointOfInterestStore {
    @observable pointOfInterests: IPointOfInterest[] = [];

    @action get = () => {
        const endpoint = "";
        return get(endpoint)
            .then((data: any) => {
                const processedData: IPointOfInterest[] = data;
                // Process store once the call has succeed
                this.pointOfInterests = processedData;
                return;
            })
            .catch(err => console.log(err));
    };

    @action getById = (id: string) => {
        const endpoint = "";
        return get(endpoint)
            .then((data: any) => {
                const processedData: IPointOfInterest[] = data;
                // Process store once the call has succeed
                this.pointOfInterests = processedData;
                return;
            })
            .catch(err => console.log(err));
    };

    @action add = (pointOfInterest: IPointOfInterest) => {
        const payload = {};
        const endpoint = "";
        return post(endpoint, payload)
            .then(data => {
                // Process store once the call has succeed
                this.pointOfInterests.push(data as any);
                return;
            })
            .catch(err => console.log(err));
    };

    @action edit = (pointOfInterest: IPointOfInterest) => {
        const payload = {};
        const endpoint = "";

        return post(endpoint, payload)
            .then(data => {
                // Process store once the call has succeed
                this.pointOfInterests = editReference(pointOfInterest, this.pointOfInterests);
                return;
            })
            .catch(err => console.log(err));
    };

    @action remove = (id: string) => {
        const endpoint = "";
        return apiDelete(endpoint).then(_data => {
            // Process store once the call has succeed
            this.pointOfInterests = removeReference(id, this.pointOfInterests);
            return;
        });
    };

    @action reset = () => {
        this.pointOfInterests = [];
    };
}

export default PointOfInterestStore;
