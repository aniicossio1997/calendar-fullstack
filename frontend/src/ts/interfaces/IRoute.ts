import React, { LazyExoticComponent } from "react";

export type JSXComponent = () => JSX.Element;
type JSXLAZY = () => React.LazyExoticComponent<() => JSX.Element>;
export interface IRoute {
  to: string;
  path: string;
  Component: LazyExoticComponent<JSXComponent> | JSXComponent;
  name: string;
}
