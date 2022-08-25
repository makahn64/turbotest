import performance from "react-native-performance";
import NativeSampleModule from "./js/NativeSampleModule";

const DEFAULT_LOOPS = 10_000;
const CHUNK_SIZE = 36; // iirc number of simultaneous gets in HVAC
const SEQUENTIAL_LOOPS = DEFAULT_LOOPS;
const PROMISE_ALL_LOOPS = DEFAULT_LOOPS;

export type TestResult = {
  deltaMs: number;
  loops: number;
};

export const runSequential = async () => {
  const start = performance.now();
  for (let i = 0; i < SEQUENTIAL_LOOPS; i++) {
    await NativeSampleModule.stringPromise();
  }
  const deltaMs = performance.now() - start;
  return { deltaMs, loops: SEQUENTIAL_LOOPS } as TestResult;
};

export const runParallel = async () => {
  const p = [];
  for (let i = 0; i < PROMISE_ALL_LOOPS; i++) {
    p.push(NativeSampleModule.stringPromise());
  }
  const start = performance.now();
  await Promise.all(p);
  const deltaMs = performance.now() - start;
  return { deltaMs, loops: PROMISE_ALL_LOOPS } as TestResult;
};

export const runChunked = async () => {
  const numChunks = Math.floor(SEQUENTIAL_LOOPS / CHUNK_SIZE);

  const p = [];
  for (let i = 0; i < CHUNK_SIZE * numChunks; i++) {
    p.push(NativeSampleModule.stringPromise());
  }

  console.log(`${numChunks} chunks for ${p.length} length`);
  const loops = numChunks * CHUNK_SIZE;
  const start = performance.now();
  for (let ptr = 0; ptr < loops; ptr += CHUNK_SIZE) {
    const chunk = p.slice(ptr, ptr + CHUNK_SIZE - 1);
    await Promise.all(chunk);
  }
  const deltaMs = performance.now() - start;
  return { deltaMs, loops } as TestResult;
};
