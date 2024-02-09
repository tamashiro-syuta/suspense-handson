import { Suspense } from "react";
import { sleep } from "../sleep";

const dataMap: Map<string, string> = new Map();

async function fetchData1(): Promise<string> {
  await sleep(1000);
  return `Hello, ${(Math.random() * 1000).toFixed(0)}`;
}

function useData1(cacheKey: string): string {
  const cachedData = dataMap.get(cacheKey);
  if (cachedData === undefined) {
    throw fetchData1().then((d) => dataMap.set(cacheKey, d));
  }
  return cachedData;
}

// NOTE: コンポーネントの外部にデータを持つ = データの取得はuseData1が行っており、こちらでデータに関する状態管理は行っていない
const DataLoader1: React.VFC = () => {
  const data = useData1("DataLoader1");
  return (
    <div>
      <div>Data is {data}</div>
    </div>
  );
};

const DataLoader2: React.VFC = () => {
  const data = useData1("DataLoader2");
  return (
    <div>
      <div>Data is {data}</div>
    </div>
  );
};

const GoodFetchAsyncData: React.VFC = () => {
  return (
    <div className="text-center">
      <h1 className="text-2xl">React App!</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <DataLoader1 />
        <DataLoader2 />
      </Suspense>
    </div>
  );
}
export default GoodFetchAsyncData;
