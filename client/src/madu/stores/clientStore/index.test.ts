import ClientStore from "./index";
import { clientStoreMock1, clientStoreMock2 } from "./mock";

describe("ClientStore", () => {
    describe("constructor()", () => {
        it("has an initial state", () => {
            const store = new ClientStore();
            expect(store.clients).toHaveLength(0);
        });
    });

    describe("reset()", () => {
        it("should reset the state", () => {
            const store = new ClientStore();
            store.add(clientStoreMock1);
            store.reset();
            expect(store.clients).toHaveLength(0);
        });
    });

    describe("remove()", () => {
        it("should remove an element from the state", () => {
            const store = new ClientStore();
            // Populate state
            store.add(clientStoreMock1);
            store.add(clientStoreMock2);
            // Remove a teamplate
            store.remove("test1");
            expect(store.clients).toHaveLength(1);
            expect(store.clients).toEqual([clientStoreMock2]);
        });
    });

    describe("edit()", () => {
        it("should edit a client from the state", () => {
            const store = new ClientStore();
            // Populate state
            store.add(clientStoreMock1);
            // Edit a client
            store.edit({
                ...clientStoreMock1,
                name: "edited name",
            });
            expect(store.clients).toEqual([
                {
                    ...clientStoreMock1,
                    name: "edited name",
                },
            ]);
        });
    });
});
