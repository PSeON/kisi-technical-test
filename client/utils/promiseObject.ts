export type PromiseObject<T> = Promise<T> & {
  resolve: Parameters<ConstructorParameters<typeof Promise<T>>[0]>[0];
  reject: Parameters<ConstructorParameters<typeof Promise<T>>[0]>[1];
};

export function createPromiseObject<T = void>(): PromiseObject<T> {
  let savedResolve: any;
  let savedReject: any;
  const promise = new Promise<T>((resolve, reject) => {
    savedResolve = resolve;
    savedReject = reject;
  }) as PromiseObject<T>;
  promise.resolve = savedResolve;
  promise.reject = savedReject;
  return promise;
}
