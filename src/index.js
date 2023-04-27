import createGenerator from "./helpers/random";
import { Draw } from "./art";

const bootArtwork = () => {
  if (window && window.hasOwnProperty("alba")) {
    // Set up randomness utilties using Alba's provided sfc32
    const { alba } = window;
    const prng = createGenerator(alba.prng(alba.params.seed));

    // PRNG is available, this is a good place to generate traits!
    const traits = {
      background: prng.pick(["darkslateblue", "darkslategray"]),
      foo: prng.pick(["bar", "baz", "qux"]),
    };
    alba.setMetadata(traits);

    // Dimensions and options
    const ratio = 3 / 4; // If fixed, use the same as how you set up your project
    const width = alba.params.width || window.innerWidth || 1000;
    const height = (width * 1) / ratio;
    const options = {
      ratio,
      width,
      height,
      traits,
    };

    // Creating the canvas
    const canvas = document.createElement("canvas");
    canvas.height = height;
    canvas.width = width;
    const context = canvas.getContext("2d");
    document.body.appendChild(canvas);

    // No body margins
    document.body.style.margin = "0";
    document.body.style.backgroundColor = "#333";

    // Centered canvas
    document.body.style.display = "flex";
    document.body.style.height = "100vh";
    document.body.style.alignItems = "center";
    document.body.style.justifyContent = "center";

    // Resized canvas so it's always fully visible
    canvas.style.maxHeight = "100vh";
    canvas.style.maxWidth = "100vw";
    document.body.style.overflow = "hidden";

    // Call our separate script for drawing the artwork
    Draw(context, prng, options);

    // Mark our draw time as finished
    alba.setComplete(true);
  } else {
    console.error(
      "Expecting the window to have the 'alba' global, but it isn't there!"
    );
  }
};

/*
    Alba *prepends* the script to the document body, so we must
    wait for DOM to load before accessing document.body.
    Libraries like p5.js usually manage this.
*/

document.addEventListener("DOMContentLoaded", bootArtwork);
