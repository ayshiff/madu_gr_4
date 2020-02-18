import React from "react";
import { storesContext } from "madu/stores";

export const useStores = () => React.useContext(storesContext);
