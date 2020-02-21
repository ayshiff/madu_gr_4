import React from "react";
import TemplateStore from "./templateStore/index";
import CompanyStore from "./companyStore";
import PointOfInterestStore from "./pointOfInterestStore/index";
import { createContext } from "react";

export const stores = { TemplateStore, PointOfInterestStore, CompanyStore };
export const StoreContext = createContext({});
export const StoreProvider = StoreContext.Provider;

export const storesContext = React.createContext({
    templateStore: new TemplateStore(),
    pointOfInterestStore: new PointOfInterestStore(),
    companyStore: new CompanyStore(),
});
