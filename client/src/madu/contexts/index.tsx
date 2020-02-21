import React from "react";
import { createContext } from "react";
import { stores } from "../stores/index";

const { TemplateStore, PointOfInterestStore, CompanyStore } = stores;

export const StoreContext = createContext({});
export const StoreProvider = StoreContext.Provider;

export const storesContext = React.createContext({
    templateStore: new TemplateStore(),
    pointOfInterestStore: new PointOfInterestStore(),
    companyStore: new CompanyStore(),
});
