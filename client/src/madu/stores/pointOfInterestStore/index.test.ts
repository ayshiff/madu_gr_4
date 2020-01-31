import PointOfInterestStore from "./index";
import { pointOfInterestMock1, pointOfInterestMock2 } from "./mock";

describe("PointOfInterestStore", () => {
    describe("constructor()", () => {
        it("has an initial state", () => {
            const store = new PointOfInterestStore();
            expect(store.pointOfInterests).toHaveLength(0);
        });
    });

    describe("add()", () => {
        it("should add a point of interest to the store", () => {
            const store = new PointOfInterestStore();
            store.add(pointOfInterestMock1);
            expect(store.pointOfInterests).toHaveLength(1);
            expect(store.pointOfInterests).toEqual([pointOfInterestMock1]);
        });
    });

    describe("reset()", () => {
        it("should reset the state", () => {
            const store = new PointOfInterestStore();
            store.add(pointOfInterestMock1);
            store.reset();
            expect(store.pointOfInterests).toHaveLength(0);
        });
    });

    describe("remove()", () => {
        it("should remove an element from the state", () => {
            const store = new PointOfInterestStore();
            // Populate state
            store.add(pointOfInterestMock1);
            store.add(pointOfInterestMock2);
            // Remove a pointOfInterest
            store.remove("test1");
            expect(store.pointOfInterests).toHaveLength(1);
            expect(store.pointOfInterests).toEqual([pointOfInterestMock2]);
        });
    });

    describe("edit()", () => {
        it("should edit an element from the state", () => {
            const store = new PointOfInterestStore();
            // Populate state
            store.add(pointOfInterestMock1);
            // Edit a pointOfInterest
            store.edit({ ...pointOfInterestMock1, name: "edited" });
            expect(store.pointOfInterests).toEqual([{ ...pointOfInterestMock1, name: "edited" }]);
        });
    });
});
