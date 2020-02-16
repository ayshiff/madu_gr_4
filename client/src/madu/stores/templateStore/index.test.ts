import TemplateStore from "./index";
import { templateStoreMock1 } from "./mock";

import * as services from "madu/services/commun";

describe("TemplateStore", () => {
    beforeEach(() => {
        (services as any).post = jest.fn(() => new Promise((res, _) => res(templateStoreMock1)));
        (services as any).apiDelete = jest.fn(
            () => new Promise((res, _) => res(templateStoreMock1))
        );
    });

    describe("constructor()", () => {
        it("has an initial state", () => {
            const store = new TemplateStore();
            expect(store.templates).toHaveLength(0);
        });
    });

    describe("add()", () => {
        it("should add a template to the store", async () => {
            const store = new TemplateStore();
            await store.add(templateStoreMock1);
            expect(store.templates).toHaveLength(1);
            expect(store.templates).toEqual([templateStoreMock1]);
        });
    });

    describe("reset()", () => {
        it("should reset the state", () => {
            const store = new TemplateStore();
            store.add(templateStoreMock1);
            store.reset();
            expect(store.templates).toHaveLength(0);
        });
    });

    describe("remove()", () => {
        it("should remove an element from the state", async () => {
            const store = new TemplateStore();
            // Populate state
            await store.add(templateStoreMock1);
            // Remove a teamplate
            await store.remove("test1");
            expect(store.templates).toHaveLength(0);
            expect(store.templates).toEqual([]);
        });
    });

    describe("editTemplate()", () => {
        it("should edit an element from the state", async () => {
            const store = new TemplateStore();
            const editedQuestion = {
                question: "test question edited",
                responses: ["edited response 1", "edited response 2", "edited response 3"],
                coefficient: 3,
            };
            // Populate state
            await store.add(templateStoreMock1);
            // Edit a template
            await store.editTemplate({
                ...templateStoreMock1,
                questions: [editedQuestion],
            });
            expect(store.templates).toEqual([
                { ...templateStoreMock1, questions: [editedQuestion] },
            ]);
        });
    });
});
