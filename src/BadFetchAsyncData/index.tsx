import { Suspense, useState } from "react";
import { sleep } from "../sleep";

async function fetchData1(): Promise<string> {
  await sleep(1000);
  return `Hello, ${(Math.random() * 1000).toFixed(0)}`;
}

// NOTE
const DataLoader: React.VFC = () => {
  const [data, setData] = useState<string | null>(null);
  // NOTE: dataがまだ無ければローディングを開始する
  if (data === null) {
    throw fetchData1().then(setData);
  }
  // NOTE: データがあればそれを表示
  return <div>Data is {data}</div>;
};

const BadFetchAsyncData: React.VFC = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <DataLoader />
    </Suspense>
  );
}
export default BadFetchAsyncData;

// NOTE: このコードの場合は以下のエラーが出力さされる
// NOTE: > Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.
// NOTE: > 日本語訳 : まだマウントされていないコンポーネントに対してReactの状態更新を実行できません。これは、コンポーネントを更新するために非同期に呼び出されるレンダー関数のサイドエフェクトがあることを示しています。この作業は useEffect に移してください。
// NOTE: 意訳すると、「まだレンダリングされてないのに状態の更新しようとしてんじゃねぇよ」
// NOTE: コンポーネントがレンダリングされる前に、fetchData1でデータを取得し状態が変更され、再レンダリングが行われ... を繰り返しているため、エラーが発生している
