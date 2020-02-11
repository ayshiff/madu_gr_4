import { observable, action } from "mobx";
import { post, ApiResponse, get } from "madu/services/commun";

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
        get(endpoint)
            .then((data: any) => {
                const processedData: IPointOfInterest[] = data;
                // Process store once the call has succeed
                this.pointOfInterests = processedData;
            })
            .catch(err => console.log(err));
    };

    @action add = (pointOfInterest: IPointOfInterest) => {
        const payload = {};
        const endpoint = "";
        post(endpoint, payload)
            .then(_data => {
                // Process store once the call has succeed
                this.pointOfInterests.push(pointOfInterest);
            })
            .catch(err => console.log(err));
    };

    @action edit = (pointOfInterest: IPointOfInterest) => {
        const payload = {};
        const endpoint = "";
        post(endpoint, payload)
            .then(_data => {
                // Process store once the call has succeed
                const editedPointOfInterests = this.pointOfInterests.map(
                    (point: IPointOfInterest) =>
                        point.id === pointOfInterest.id ? pointOfInterest : point
                );
                this.pointOfInterests = editedPointOfInterests;
            })
            .catch(err => console.log(err));
    };

    @action remove = (id: string) => {
        const payload = {};
        const endpoint = "";
        post(endpoint, payload)
            .then(_data => {
                // Process store once the call has succeed
                this.pointOfInterests = this.pointOfInterests.filter(
                    (point: IPointOfInterest) => point.id !== id
                );
            })
            .catch(err => console.log(err));
    };

    @action reset = () => {
        this.pointOfInterests = [];
    };
}

export default PointOfInterestStore;
