export function delay(milliseconds: number) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => resolve(), milliseconds);
  });
}
