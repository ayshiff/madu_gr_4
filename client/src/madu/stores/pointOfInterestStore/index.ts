import { observable, action } from "mobx";
import { get, apiDelete, apiPut, postJson } from "madu/services/commun";
import { editReference, removeReference } from "../utils/index";
import { pointOfInterestMock } from "./mock";

interface IDay {
    from: string;
    to: string;
}

const { REACT_APP_API_BASE_URL } = process.env;

export interface IPointOfInterest {
    id: string;
    name: string;
    poiType: string;
    street: string;
    zipCode: number;
    city: string;
    phone?: string;
    email: string;
    category: string;
    socialNetwork?: string;
    foodPreference: string;
    takeAway: boolean;
    wheelchair: boolean;
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
    website?: string;
    status?: string;
    images: string[];
    greenscore: number;
}

class PointOfInterestStore {
    @observable all: IPointOfInterest[] = [];
    @observable byId: IPointOfInterest = pointOfInterestMock;
    @observable isEditing: boolean = false;

    @action setEditing = (value: boolean) => {
        this.isEditing = value;
    };

    @action get = () => {
        const endpoint = `${REACT_APP_API_BASE_URL}/poi`;
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
        const endpoint = `${REACT_APP_API_BASE_URL}/poi/${id}`;
        return get(endpoint)
            .then((data: any) => {
                const processedData: any = data;
                // Process store once the call has succeed
                this.byId = processedData.value;
                return;
            })
            .catch(err => console.log(err));
    };

    @action setStep = (args: any) => {
        this.byId = { ...this.byId, ...args };
        return;
    };

    @action add = (pointOfInterest: IPointOfInterest) => {
        const endpoint = `${REACT_APP_API_BASE_URL}/poi`;
        return postJson(endpoint, pointOfInterest)
            .then(data => {
                // Process store once the call has succeed
                this.all.push(data as any);
                return;
            })
            .catch(err => console.log(err));
    };

    @action edit = (id: string, pointOfInterest: IPointOfInterest) => {
        const endpoint = `${REACT_APP_API_BASE_URL}/poi/${id}`;

        return apiPut(endpoint, pointOfInterest)
            .then(data => {
                // Process store once the call has succeed
                this.all = editReference(id, pointOfInterest, this.all);
                console.log(data);
                return;
            })
            .catch(err => console.log(err));
    };

    @action remove = (id: string) => {
        const endpoint = `${REACT_APP_API_BASE_URL}/poi/${id}`;
        return apiDelete(endpoint).then(_data => {
            // Process store once the call has succeed
            this.all = removeReference(id, this.all);
            return;
        });
    };

    @action resetId = () => {
        this.byId = pointOfInterestMock;
    };

    @action reset = () => {
        this.all = [];
    };
}

export default PointOfInterestStore;
