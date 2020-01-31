import TemplateStore from "./index";
import { templateStoreMock1, templateStoreMock2 } from "./mock";

describe("TemplateStore", () => {
    describe("constructor()", () => {
        it("has an initial state", () => {
            const store = new TemplateStore();
            expect(store.templates).toHaveLength(0);
        });
    });

    describe("add()", () => {
        it("should add a template to the store", () => {
            const store = new TemplateStore();
            store.add(templateStoreMock1);
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
        it("should remove an element from the state", () => {
            const store = new TemplateStore();
            // Populate state
            store.add(templateStoreMock1);
            store.add(templateStoreMock2);
            // Remove a teamplate
            store.remove("test1");
            expect(store.templates).toHaveLength(1);
            expect(store.templates).toEqual([templateStoreMock2]);
        });
    });

    describe("editTemplate()", () => {
        it("should edit an element from the state", () => {
            const store = new TemplateStore();
            const editedQuestion = {
                question: "test question edited",
                responses: ["edited response 1", "edited response 2", "edited response 3"],
                coefficient: 3,
            };
            // Populate state
            store.add(templateStoreMock1);
            // Edit a template
            store.editTemplate({
                ...templateStoreMock1,
                questions: [editedQuestion],
            });
            expect(store.templates).toEqual([
                { ...templateStoreMock1, questions: [editedQuestion] },
            ]);
        });
    });
});
