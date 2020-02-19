## Madu [![CircleCI](https://circleci.com/gh/ayshiff/madu_gr_4/tree/develop.svg?style=svg)](https://circleci.com/gh/ayshiff/madu_gr_4/tree/develop)

## Client [![Coverage Status](https://coveralls.io/repos/github/ayshiff/madu_gr_4/badge.svg?branch=develop)](https://coveralls.io/github/ayshiff/madu_gr_4?branch=develop)

ReactJS - Typescript - MobX - Jest - Styled-Components

## MobX - Jest

MobX est librairie de state-management appliquant le principe de programmation réactive afin d'observer tous
les changements d'états de notre store.

![mobx](https://github.com/mobxjs/mobx/blob/master/docs/assets/flow.png?raw=true)

Il y a différentes notions à la base de mobX:

-   le **state** qui difini les propriétés à sauvegarder
-   les **actions** qui permettent de modifier le state
-   les **reactions** qui permettent de définir des propriétés dérivées du state
-   les **reactions** qui permettent de définir des comportements à adopter lors du changement du state

Exemple:

```js
import mobx, {observable, action, computed} from 'mobx'

// Modifications en dehors du state impossibles
mobx.useStrict(true)

class Test {
  @observable values = []

  @action addValue (value) {
    this.values.push(value)
  }
  @computed get firstValue () {
    return this.values.length > 0 ? this.values[0] : null
  }
}

let test = new Test()
test.observe({ values } => {
  // Ici le traitement à faire quand les messages changent
})
test.addValue('Hello')
test.values.push('Hello') // INTERDIT en mode strict
```

La méthode **observer** nous permet de nous abonner aux changements du store.

Dans le cas de notre application, nous avons:

```jsx
import React, { useEffect } from 'react';
import { observer } from "mobx-react";
import { useStores } from "madu/hooks/use-store";

export const TestComponent = observer(() => {
    const { clientStore } = useStores();

    useEffect(() => {
        clientStore.add({
            id: "test1",
            phone: "0000000000",
            ...
        });
    }, []);

    return (
        <>
            {clientStore.clients.map(client => (
                <div key={client.id}>
                    <div>{client.adress}</div>
                    <div>{client.contact_email}</div>
                </div>
            ))}
        </>
    );
});
```

Pour les tests unitaires nous avons utilisé **Jest**.
Les tests couvrent nos actions mobX qui renferment notre logique métier.

Nous devons au préalable mocker nos appels à l'API.

```ts
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
    ...
```
