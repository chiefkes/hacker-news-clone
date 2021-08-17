import React from "react";

const ThemeContext = React.createContext("dark");

export default ThemeContext;
export const ThemeConsumer = ThemeContext.Consumer;
export const ThemeProvider = ThemeContext.Provider;
