import TemplateStore from "./index";
import { templateStoreMock1 } from "./mock";

import * as services from "madu/services/commun";

describe("TemplateStore", () => {
    beforeEach(() => {
        (services as any).postJson = jest.fn(
            () => new Promise((res, _) => res(templateStoreMock1))
        );
        (services as any).apiDelete = jest.fn(
            () => new Promise((res, _) => res(templateStoreMock1))
        );
    });

    describe("constructor()", () => {
        it("has an initial state", () => {
            const store = new TemplateStore();
            expect(store.all).toHaveLength(0);
        });
    });

    describe("add()", () => {
        it("should add a template to the store", async () => {
            const store = new TemplateStore();
            await store.add(templateStoreMock1);
            expect(store.all).toHaveLength(1);
            expect(store.all).toEqual([templateStoreMock1]);
        });
    });

    describe("reset()", () => {
        it("should reset the state", () => {
            const store = new TemplateStore();
            store.add(templateStoreMock1);
            store.reset();
            expect(store.all).toHaveLength(0);
        });
    });

    describe("remove()", () => {
        it("should remove an element from the state", async () => {
            const store = new TemplateStore();
            // Populate state
            await store.add(templateStoreMock1);
            // Remove a teamplate
            await store.remove("test1");
            expect(store.all).toHaveLength(0);
            expect(store.all).toEqual([]);
        });
    });

    describe("editTemplate()", () => {
        it("should edit an element from the state", async () => {
            const store = new TemplateStore();
            const editedQuestion = {
                id: "test_question_1",
                question: "",
                questionType: "",
                answers: [
                    {
                        id: "",
                        answer: "",
                        score: 14,
                    },
                ],
            };
            // Populate state
            await store.add(templateStoreMock1);
            // Edit a template
            await store.editTemplate("test_question_1", {
                ...templateStoreMock1,
                questions: [editedQuestion],
            });
            expect(store.all).toEqual([{ ...templateStoreMock1, questions: [editedQuestion] }]);
        });
    });
});
