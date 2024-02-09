import { Suspense } from "react";
import { sleep } from "../sleep";

const AlwaysSuspend = () => {
  // NOTE: SuspendComponent の再レンダリングが1秒ごとに試みられている -> Promise が解決されてコンポーネントを表示するために、再レンダリングが行われる
  console.log("AlwaysSuspend is rendered");
  throw sleep(1000);
};

// NOTE: Promiseをthrowすることで、常位Suspenseを発生させる
const AlwaysSuspendComponent: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading AlwaysSuspend...</div>}>
      <AlwaysSuspend />
      {/* NOTE: Suspense内は、Promiseが解決されるまでは、全て表示されない（fallbackが表示される) */}
      <h1>hoge</h1>
    </Suspense>
  );
};

export default AlwaysSuspendComponent;
