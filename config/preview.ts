// This file emulates Alba's environment when developing

export {};

declare global {
  interface Window {
    alba: Alba;
  }
}

type Alba = typeof window & {
  alba: {
    params: {
      seed: string;
      tokenId: number;
      width?: number;
    };
    isComplete: () => boolean;
    setComplete: (a: boolean) => void;
    getMetadata: () => Record<string, any>;
    setMetadata: (a: Record<string, any>) => void;
    prng: (seed: string) => () => number;
    _testSeed: () => string;
  };
};

let params = new URLSearchParams(document.location.search);
let urlSeed = params.get("seed");

const sfc32 = (a: number, b: number, c: number, d: number) => {
  return function () {
    a >>>= 0;
    b >>>= 0;
    c >>>= 0;
    d >>>= 0;
    var t = (a + b) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    d = (d + 1) | 0;
    t = (t + d) | 0;
    c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  };
};

const randomSeed = () => {
  const buf = new Uint32Array(8);
  window.crypto.getRandomValues(buf);
  const newSeed = Array.from(buf, (n) => n.toString(16))
    .join("")
    .padEnd(64, "0");
  return `0x${newSeed}`;
};

const { alba } = window as Alba;

if (!alba) {
  const seed = urlSeed || randomSeed();
  console.log("Running in development mode! Seed is", seed);

  let metadata: false | Object = false;
  let complete: boolean = false;

  // This is a cheat ¯\_(ツ)_/¯
  (<any>window).alba = {
    isComplete: () => complete,
    setComplete: (done: boolean) =>
      done && console.log("Alba would now capture the canvas!"),
    getMetadata: () => metadata,
    setMetadata: (values: Object) => {
      metadata = values;
      console.log("Alba metadata is now this:");
      console.table(values);
    },
    prng: (seed: string) => {
      const [_, seedHex] = seed.split("x");
      return sfc32(
        parseInt(seedHex.slice(0, 8), 16),
        parseInt(seedHex.slice(8, 16), 16),
        parseInt(seedHex.slice(16, 24), 16),
        parseInt(seedHex.slice(24, 32), 16)
      );
    },
    _testSeed: randomSeed,
    params: {
      tokenId: 0,
      seed,
      width: window.innerWidth * window.devicePixelRatio || 1000,
      res: 1000,
    },
  };
}
