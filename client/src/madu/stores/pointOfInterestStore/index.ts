import { observable, action } from "mobx";

interface IPointOfInterest {
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

    @action add = (pointOfInterest: IPointOfInterest) => {
        this.pointOfInterests.push(pointOfInterest);
    };

    @action edit = (pointOfInterest: IPointOfInterest) => {
        const editedPointOfInterests = this.pointOfInterests.map((point: IPointOfInterest) =>
            point.id === pointOfInterest.id ? pointOfInterest : point
        );
        this.pointOfInterests = editedPointOfInterests;
    };

    @action remove = (id: string) => {
        this.pointOfInterests = this.pointOfInterests.filter(
            (point: IPointOfInterest) => point.id !== id
        );
    };

    @action reset = () => {
        this.pointOfInterests = [];
    };
}

export default PointOfInterestStore;
