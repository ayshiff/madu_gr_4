import CompanyStore from "./index";
import { companyStoreMock1 } from "./mock";

import * as services from "madu/services/commun";

describe("CompanyStore", () => {
    beforeEach(() => {
        (services as any).post = jest.fn(() => new Promise((res, _) => res(companyStoreMock1)));
        (services as any).apiDelete = jest.fn(
            () => new Promise((res, _) => res(companyStoreMock1))
        );
    });

    describe("constructor()", () => {
        it("has an initial state", () => {
            const store = new CompanyStore();
            expect(store.all).toHaveLength(0);
        });
    });

    describe("add()", () => {
        it("should add a company to the store", async () => {
            const store = new CompanyStore();
            await store.add(companyStoreMock1);
            expect(store.all).toHaveLength(1);
            expect(store.all).toEqual([companyStoreMock1]);
        });
    });

    describe("reset()", () => {
        it("should reset the state", async () => {
            const store = new CompanyStore();
            await store.add(companyStoreMock1);
            await store.reset();
            expect(store.all).toHaveLength(0);
        });
    });

    describe("remove()", () => {
        it("should remove an element from the state", async () => {
            const store = new CompanyStore();
            // Populate state
            await store.add(companyStoreMock1);
            // Remove a company
            store
                .remove("test_id_1")
                .then(() => {
                    expect(store.all).toHaveLength(0);
                    expect(store.all).toEqual([]);
                })
                .catch(err => console.log(err));
        });
    });

    describe("edit()", () => {
        it("should edit a company from the state", async () => {
            const store = new CompanyStore();
            // Populate state
            await store.add(companyStoreMock1);
            // Edit a company
            store
                .edit("test_id_1", {
                    ...companyStoreMock1,
                    name: "edited name",
                })
                .then(() => {
                    expect(store.all).toEqual([
                        {
                            ...companyStoreMock1,
                            name: "edited name",
                        },
                    ]);
                })
                .catch(err => console.log(err));
        });
    });
});
