import ClientStore from "./index";
import { clientStoreMock1 } from "./mock";

import * as services from "madu/services/commun";

describe("ClientStore", () => {
    beforeEach(() => {
        (services as any).post = jest.fn(() => new Promise((res, _) => res(clientStoreMock1)));
        (services as any).apiDelete = jest.fn(() => new Promise((res, _) => res(clientStoreMock1)));
    });
    describe("constructor()", () => {
        it("has an initial state", () => {
            const store = new ClientStore();
            expect(store.clients).toHaveLength(0);
        });
    });

    describe("add()", () => {
        it("should add a client to the store", async () => {
            const store = new ClientStore();
            await store.add(clientStoreMock1);
            expect(store.clients).toHaveLength(1);
            expect(store.clients).toEqual([clientStoreMock1]);
        });
    });

    describe("reset()", () => {
        it("should reset the state", async () => {
            const store = new ClientStore();
            await store.add(clientStoreMock1);
            await store.reset();
            expect(store.clients).toHaveLength(0);
        });
    });

    describe("remove()", () => {
        it("should remove an element from the state", async () => {
            const store = new ClientStore();
            // Populate state
            await store.add(clientStoreMock1);
            // Remove a teamplate
            await store.remove("test1");
            expect(store.clients).toHaveLength(0);
            expect(store.clients).toEqual([]);
        });
    });

    describe("edit()", () => {
        it("should edit a client from the state", async () => {
            const store = new ClientStore();
            // Populate state
            await store.add(clientStoreMock1);
            // Edit a client
            await store.edit({
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
