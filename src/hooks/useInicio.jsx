import { useContext } from "react";

import InicioContext from "../context/InicioProvider";

export const useInicio = () => {
    return useContext(InicioContext)
};