import * as React from "react";
import { render } from "react-dom";
import classcat from "classcat";
import { Resizable } from "re-resizable";

import "./styles.css";
import { ResponsiveContainer } from "./ResponsiveContainer";

function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      {[
        { horizontal: 600, vertical: 200 },
        { SM: 200, MD: 300, L: 400, XL: 500 }
      ].map(breakpoints => (
        <Resizable
          className="list-resizable-container"
          defaultSize={{
            width: 320,
            height: 200
          }}
        >
          <ResponsiveContainer className="container" breakpoints={breakpoints}>
            {({ result }) => {
              return (
                <div className={classcat(result)}>
                  {Object.entries(result).map(([key, value]) => {
                    return (
                      <div key={key} className={value ? "yes" : "no"}>
                        {key} ({"<="} {breakpoints[key]}px)
                      </div>
                    );
                  })}
                </div>
              );
            }}
          </ResponsiveContainer>
        </Resizable>
      ))}
      <Resizable
        className="list-resizable-container"
        defaultSize={{
          width: 320,
          height: 200
        }}
      >
        <ResponsiveContainer
          className="container list-container"
          breakpoints={{ horizontal: 600, vertical: 200 }}
        >
          {({ result }) => {
            return (
              <ul className={classcat(["list", result])}>
                <li>Access Schedules</li>
                <li className="active">Access Exceptions</li>
                <li>Access Users</li>
                <li>Access Guests</li>
              </ul>
            );
          }}
        </ResponsiveContainer>
      </Resizable>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
