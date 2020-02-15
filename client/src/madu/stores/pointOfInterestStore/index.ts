import { observable, action } from "mobx";
import { post, get } from "madu/services/commun";
import { editReference, removeReference } from "../utils/index";

export interface IPointOfInterest {
    id: string;
    name: string;
    link: string;
    price: number;
    description: string;
    adress: string;
    categories: string[];
    tags: string[];
    greenscore: number;
    template_form_id: string;
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
        const payload = {};
        const endpoint = "";
        return post(endpoint, payload).then(_data => {
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
