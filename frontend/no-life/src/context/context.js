import { createContext } from "react";

const userContext = createContext({
  isLogged: false,
});

export { userContext };
