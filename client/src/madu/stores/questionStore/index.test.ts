import QuestionStore from "./index";
import { questionStoreMock1 } from "./mock";

import * as services from "madu/services/commun";

describe("QuestionStore", () => {
    beforeEach(() => {
        (services as any).postJson = jest.fn(
            () => new Promise((res, _) => res(questionStoreMock1))
        );
        (services as any).apiDelete = jest.fn(
            () => new Promise((res, _) => res(questionStoreMock1))
        );
    });

    describe("constructor()", () => {
        it("has an initial state", () => {
            const store = new QuestionStore();
            expect(store.all).toHaveLength(0);
        });
    });

    describe("add()", () => {
        it("should add a question to the store", async () => {
            const store = new QuestionStore();
            await store.add(questionStoreMock1);
            expect(store.all).toHaveLength(1);
            expect(store.all).toEqual([questionStoreMock1]);
        });
    });

    describe("reset()", () => {
        it("should reset the state", () => {
            const store = new QuestionStore();
            store.add(questionStoreMock1);
            store.reset();
            expect(store.all).toHaveLength(0);
        });
    });

    describe("remove()", () => {
        it("should remove an element from the state", async () => {
            const store = new QuestionStore();
            // Populate state
            await store.add(questionStoreMock1);
            // Remove a teamplate
            await store.remove("test1");
            expect(store.all).toHaveLength(0);
            expect(store.all).toEqual([]);
        });
    });

    describe("editQuestion()", () => {
        it("should edit an element from the state", async () => {
            const store = new QuestionStore();
            const editedAnswers = {
                id: "test3",
                answer: "answer",
                score: 15,
            };
            // Populate state
            await store.add(questionStoreMock1);
            // Edit a question
            await store.editQuestion({
                ...questionStoreMock1,
                answers: [editedAnswers],
            });
            expect(store.all).toEqual([{ ...questionStoreMock1, answers: [editedAnswers] }]);
        });
    });
});
