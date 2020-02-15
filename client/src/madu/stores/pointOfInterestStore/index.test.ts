import PointOfInterestStore from "./index";
import { pointOfInterestMock1 } from "./mock";

import * as services from "madu/services/commun";

describe("PointOfInterestStore", () => {
    beforeEach(() => {
        (services as any).post = jest.fn(() => new Promise((res, _) => res(pointOfInterestMock1)));
    });

    describe("constructor()", () => {
        it("has an initial state", () => {
            const store = new PointOfInterestStore();
            expect(store.pointOfInterests).toHaveLength(0);
        });
    });

    describe("add()", () => {
        it("should add a point of interest to the store", () => {
            const store = new PointOfInterestStore();
            store
                .add(pointOfInterestMock1)
                .then(() => {
                    expect(store.pointOfInterests).toHaveLength(1);
                    expect(store.pointOfInterests).toEqual([pointOfInterestMock1]);
                })
                .catch(err => console.log(err));
        });
    });

    describe("remove()", () => {
        it("should remove an element from the state", async () => {
            const store = new PointOfInterestStore();
            // Populate state
            await store.add(pointOfInterestMock1);
            // Remove a pointOfInterest
            store
                .remove("test1")
                .then(() => {
                    expect(store.pointOfInterests).toHaveLength(0);
                    expect(store.pointOfInterests).toEqual([]);
                })
                .catch(err => console.log(err));
        });
    });

    describe("edit()", () => {
        it("should edit an element from the state", async () => {
            const store = new PointOfInterestStore();
            // Populate state
            await store.add(pointOfInterestMock1);
            // Edit a pointOfInterest
            store
                .edit({ ...pointOfInterestMock1, name: "edited" })
                .then(() => {
                    expect(store.pointOfInterests).toEqual([
                        { ...pointOfInterestMock1, name: "edited" },
                    ]);
                })
                .catch(err => console.log(err));
        });
    });
});
