import { Suspense } from "react";
import { sleep } from "../sleep";

type Props = {
  name: string;
};

const AlwaysSuspend = () => {
  // NOTE: SuspendComponent の再レンダリングが1秒ごとに試みられている -> Promise が解決されてコンポーネントを表示するために、再レンダリングが行われる
  console.log("RenderingNotifier is rendered");
  throw sleep(3000);
};

const OutPutLog: React.FC<Props> = ({ name }) => {
  console.log(`${name} is rendered`);

  return null;
};

// NOTE: Suspense内のコンポーネントのみが再レンダリングされる！！！
const RenderingNotifier: React.FC = () => {
  return (
    <div>
      <h2>This is RenderingNotifier, check console.log</h2>
      <OutPutLog name='out of suspend' />
      <Suspense fallback={<div>Loading...</div>}>
        <AlwaysSuspend />
        <OutPutLog name='in suspend' />
      </Suspense>
    </div>
  );
}

export default RenderingNotifier;
