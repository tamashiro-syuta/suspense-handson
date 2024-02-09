import { Suspense } from "react";
import { sleep } from "../sleep";

const SometimesSuspend = () => {
  // NOTE: SuspendComponent の再レンダリングが1秒ごとに試みられている -> Promise が解決されてコンポーネントを表示するために、再レンダリングが行われる
  console.log("Sometimes is rendered");
  if (Math.random() < 0.5) { throw sleep(1000); }

  return <p>Hello, world!</p>;
};

// NOTE: 1/2の確率で Suspenseを発生させる
const SometimesSuspendComponent: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading SometimesSuspend...</div>}>
      <SometimesSuspend />
      {/* NOTE: Suspense内は、Promiseが解決されるまでは、全て表示されない（fallbackが表示される) */}
    </Suspense>
  );
};

export default SometimesSuspendComponent;
