import { Suspense, useState } from "react";
import { CircularProgress } from '@mui/material';
import { Loadable } from "./Loadable";
import { sleep } from "../sleep";

async function fetchData1(): Promise<string> {
  const randomSecond = Math.floor(Math.random() * 4) * 1000;
  await sleep(randomSecond);
  return `Hello, ${(Math.random() * 1000).toFixed(0)}`;
}

const DataLoader: React.VFC<{ data: Loadable<string> }> = ({ data }) => {
  const value = data.getOrThrow();
  return (
    <div>
      <div>Data is {value}</div>
    </div>
  );
};

// NOTE: render as you fetch = 色々なデータが取得されるにつれて、その部分を表示するコンポーネントがレンダリングされていくという挙動のこと
const RenderAsYouFetch = () => {
  const [data1] = useState(() => new Loadable(fetchData1()));
  const [data2] = useState(() => new Loadable(fetchData1()));
  const [data3] = useState(() => new Loadable(fetchData1()));
  return (
    <div className="text-center">
      <h1 className="text-2xl">React App!</h1>
      <Suspense fallback={<CircularProgress />}>
        <DataLoader data={data1} />
      </Suspense>
      <Suspense fallback={<CircularProgress />}>
        <DataLoader data={data2} />
      </Suspense>
      <Suspense fallback={<CircularProgress />}>
        <DataLoader data={data3} />
      </Suspense>
    </div>
  );
};

export default RenderAsYouFetch;
