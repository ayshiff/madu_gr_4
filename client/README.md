## Madu [![CircleCI](https://circleci.com/gh/ayshiff/madu_gr_4/tree/develop.svg?style=svg)](https://circleci.com/gh/ayshiff/madu_gr_4/tree/develop)

## Client [![Coverage Status](https://coveralls.io/repos/github/ayshiff/madu_gr_4/badge.svg?branch=develop)](https://coveralls.io/github/ayshiff/madu_gr_4?branch=develop)

ReactJS - Typescript - MobX - Jest - Styled-Components - Ant Design - Mapbox - Algolia

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

## React 

```js
import React, { useState, useEffect } from 'react'; 
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Vous avez cliqué ${count} fois`;
  });

  return (
    <div>
      <p>Vous avez cliqué {count} fois</p>
      <button onClick={() => setCount(count + 1)}>
        Cliquez ici
      </button>
    </div>
  );
}
```

React est une librarie javascript développé par Facebook. Elle a pour principale but de facilité la création d'application web. 

**Hooks** : 
```js 
    const [count, setCount] = useState(0);
```
Les Hooks sont des fonctions qui permettent de « se brancher » sur la gestion d’état local et de cycle de vie de React depuis des fonctions composants. Les Hooks ne fonctionnent pas dans des classes : ils vous permettent d’utiliser React sans classes. 

- hook d'état
useState retourne une paire : la valeur de l’état actuel et une fonction qui vous permet de la mettre à jour. Vous pouvez appeler cette fonction depuis un gestionnaire d’événements, par exemple. Elle est similaire à this.setState dans une classe, à ceci près qu’elle ne fusionne pas l’ancien état et le nouveau.

- hook d'effet
```js
  useEffect(() => {
    document.title = `Vous avez cliqué ${count} fois`;
  });
```
Le Hook d’effet, useEffect, permet aux fonctions composants de gérer des effets de bord. Il joue le même rôle que componentDidMount, componentDidUpdate, et componentWillUnmount dans les classes React, mais au travers d’une API unique.

**Jsx**
```js 
      <button onClick={() => setCount(count + 1)}>
```
utilisé par react permettant d'utilisé des balises html et du code javascript

plusieurs avantages a utilisé React : 

Haute performance :
Virtual-Dom : abstraction du Dom, permettant une représentation idéale, ou « virtuelle », d’une interface utilisateur (UI) est conservée en mémoire et synchronisée avec le DOM « réel » par une bibliothèque telle que ReactDOM.

Grande communauté :
Documentation et aide facile à trouver

Transition aisé via React Native :
Réutilisation de composant aisé pour l'application mobile



## Ant Design

Librairie de composant facilement personnalisables, populaire bénéficiant d'un gros soutien de la communauté et d'une documentation claire

exemple : 

```js
class App extends React.Component {
  state = {
    date: null,
  };

  handleChange = date => {
    message.info(`Selected Date: ${date ? date.format('YYYY-MM-DD') : 'None'}`);
    this.setState({ date });
  };

  render() {
    const { date } = this.state;
    return (
      <div style={{ width: 400, margin: '100px auto' }}>
        <DatePicker onChange={this.handleChange} />
        <div style={{ marginTop: 20 }}>
          Selected Date: {date ? date.format('YYYY-MM-DD') : 'None'}
        </div>
      </div>
    );
  }
}
```

## Mapbox

Mapbox est une plateforme de développement utilisée par plusieurs industries pour créer des applications personnalisées qui résolvent les problèmes liés aux cartes, aux données et à l'analyse spatiale. Mapbox est une alternative solide a google maps ayant un plan gratuit attratif, open-source et bénéficiant d'une documentation complète.

## Typescript

Langage de programmation développé par Microsoft en 2012. Son ambition principale est d’améliorer la productivité de développement d’applications complexes. Typescript introduit des fonctionnalités optionnelles comme le typage ou encore la programmation orientée objet.

exemple : 

```ts
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");
```

Les intérêts d'utiliser typescript sont multiples : 

- TypeScript aide les développeurs à travailler ensemble sur une base de code commune

- Code plus simple de compréhension

- Code plus simple à refractorer

- Moins propice aux bugs

## Algolia

Algolia se compose en gros de deux parties : la mise en œuvre de la recherche et l'analyse de la recherche. ils fournissent des outils qui permettent aux développeurs de créer et de maintenir facilement des expériences de recherche de qualité pour les utilisateurs.

exemple : 

```js
const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const App = () => (
  <InstantSearch searchClient={searchClient} indexName="instant_search">
    <RefinementList attribute="brand" />
  </InstantSearch>
);
```

