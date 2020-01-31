import React from "react";
import { storesContext } from "../contexts/index";

export const useStores = () => React.useContext(storesContext);
