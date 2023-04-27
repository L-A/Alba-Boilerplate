const createGenerator = (value) => {
  const chance = (n = 0.5) => value() < n;
  const bool = chance; // lol

  const range = (min, max) => {
    const delta = max - min;
    return value() * delta + min;
  };

  const rangeFloor = (min, max) => Math.floor(range(min, max));

  const pick = (array) =>
    array.length ? array[rangeFloor(0, array.length)] : undefined;

  const weighted = (weights) => {
    var totalWeight = weights.reduce((a, b) => a + b);

    var random = value() * totalWeight;
    for (let i = 0; i < weights.length; i++) {
      if (random < weights[i]) {
        return i;
      }
      random -= weights[i];
    }
    return 0;
  };

  return {
    value,
    chance,
    bool,
    range,
    rangeFloor,
    pick,
    weighted,
  };
};

export default createGenerator;
