import PointOfInterestStore from "./index";
import { pointOfInterestMock } from "./mock";

import * as services from "madu/services/commun";

describe("PointOfInterestStore", () => {
    beforeEach(() => {
        (services as any).postJson = jest.fn(
            () => new Promise((res, _) => res(pointOfInterestMock))
        );
        (services as any).apiDelete = jest.fn(
            () => new Promise((res, _) => res(pointOfInterestMock))
        );
    });

    describe("constructor()", () => {
        it("has an initial state", () => {
            const store = new PointOfInterestStore();
            expect(store.all).toHaveLength(0);
        });
    });

    describe("add()", () => {
        it("should add a point of interest to the store", () => {
            const store = new PointOfInterestStore();
            store
                .add(pointOfInterestMock)
                .then(() => {
                    expect(store.all).toHaveLength(1);
                    expect(store.all).toEqual([pointOfInterestMock]);
                })
                .catch(err => console.log(err));
        });
    });

    describe("remove()", () => {
        it("should remove an element from the state", async () => {
            const store = new PointOfInterestStore();
            // Populate state
            await store.add(pointOfInterestMock);
            // Remove a pointOfInterest
            store
                .remove("")
                .then(() => {
                    expect(store.all).toHaveLength(0);
                    expect(store.all).toEqual([]);
                })
                .catch(err => console.log(err));
        });
    });

    describe("edit()", () => {
        it("should edit an element from the state", async () => {
            const store = new PointOfInterestStore();
            // Populate state
            await store.add(pointOfInterestMock);
            // Edit a pointOfInterest
            store
                .edit("", { ...pointOfInterestMock, name: "edited" })
                .then(() => {
                    expect(store.all).toEqual([{ ...pointOfInterestMock, name: "edited" }]);
                })
                .catch(err => console.log(err));
        });
    });
});
