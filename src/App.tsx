import React from "react";
import "./App.css";
import AlwaysSuspend from "./AllwaysSuspend";
import SometimesSuspend from "./SometimesSuspend";
import RenderingNotifier from "./RenderingNotifier";
import BadFetchAsyncData from "./BadFetchAsyncData";
import GoodFetchAsyncData from "./GoodFetchAsyncData";
import RenderAsYouFetch from "./RenderAsYouFetch";

function App() {
  return (
    <div className="text-center">
      <h1 className="text-2xl">React App!</h1>

      <AlwaysSuspend />
      <SometimesSuspend />
      <RenderingNotifier />
      <BadFetchAsyncData />
      <GoodFetchAsyncData />
      <RenderAsYouFetch />
    </div>
  );
}

export default App;
