type LoadableState<T> =
  | {
      status: "pending";
      promise: Promise<T>;
    }
  | {
      status: "fulfilled";
      data: T;
    }
  | {
      status: "rejected";
      error: unknown;
    };

export class Loadable<T> {
  state: LoadableState<T>;

  // NOTE: 任意の非同期処理を受け取り、LoadableStateに変換(処理の状態に応じて、stateの値も変更される)
  constructor(promise: Promise<T>) {
    this.state = {
      status: "pending",
      promise: promise.then(
        (data) => {
          this.state = {
            status: "fulfilled",
            data,
          };
          return data;
        },
        (error) => {
          this.state = {
            status: "rejected",
            error,
          };
          throw error;
        }
      ),
    };
  }


  // NOTE: 非同期処理の状態に応じて、それぞれの値を返す
  getOrThrow(): T {
    switch (this.state.status) {
      case "pending":
        throw this.state.promise;
      case "fulfilled":
        return this.state.data;
      case "rejected":
        throw this.state.error;
    }
  }
}
