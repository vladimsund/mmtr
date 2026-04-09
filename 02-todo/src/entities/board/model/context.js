import { createContext, useContext } from "react";

export const BoardContext = createContext();
export const useBoard = () => useContext(BoardContext);
