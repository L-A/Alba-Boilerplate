const Draw = (context, prng, { width, height, traits }) => {
  const { value, range, weighted } = prng;
  const bg = traits.background;

  const colorWeights = [range(0, 100), range(0, 100)];
  const pickColor = () => ["snow", "peru"][weighted(colorWeights)];

  const randomX = () => (value() * 0.7 + 0.15) * width;
  const randomY = () => (value() * 0.7 + 0.15) * height;

  // Preparing all lines
  let lines = [];

  for (let i = 0; i < 50; i++) {
    lines.push([[randomX(), randomY()], [randomX(), randomY()], pickColor()]);
  }

  // Drawing
  context.fillStyle = bg;
  context.lineCap = "round";
  context.fillRect(0, 0, width, height);

  lines.forEach(([[x, y], [endX, endY], color]) => {
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(endX, endY);

    context.lineWidth = width / 80;
    context.strokeStyle = bg;
    context.stroke();

    context.lineWidth = width / 140;
    context.strokeStyle = color;
    context.stroke();
  });
};

export { Draw };
