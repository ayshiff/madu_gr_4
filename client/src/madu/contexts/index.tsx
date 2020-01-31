import React from "react";
import { createContext } from "react";
import { stores } from "../stores/index";

const { templateStore, clientStore, pointOfInterestStore } = stores;

export const StoreContext = createContext({});
export const StoreProvider = StoreContext.Provider;

export const storesContext = React.createContext({
    templateStore: new templateStore(),
    clientStore: new clientStore(),
    pointOfInterestStore: new pointOfInterestStore(),
});
