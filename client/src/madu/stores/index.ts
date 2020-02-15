import React from "react";
import TemplateStore from "./templateStore/index";
import ClientStore from "./clientStore/index";
import CompanyStore from "./company";
import PointOfInterestStore from "./pointOfInterestStore/index";
import { createContext } from "react";

export const stores = { TemplateStore, ClientStore, PointOfInterestStore, CompanyStore };
export const StoreContext = createContext({});
export const StoreProvider = StoreContext.Provider;

export const storesContext = React.createContext({
    templateStore: new TemplateStore(),
    clientStore: new ClientStore(),
    pointOfInterestStore: new PointOfInterestStore(),
    companyStore: new CompanyStore(),
});
