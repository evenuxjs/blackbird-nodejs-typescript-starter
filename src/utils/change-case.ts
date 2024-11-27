/* eslint-disable @typescript-eslint/no-explicit-any */

let camelcaseKeys: any;
let snakecaseKeys: any;

let isCamelLoaded = false;
let isSnakeLoaded = false;

// --------------------------------------------------------------------------------
// Camel case
// --------------------------------------------------------------------------------

const loadCamelcaseKeys = async () => {
  if (!isCamelLoaded) {
    try {
      camelcaseKeys = (await import("camelcase-keys")).default;
      isCamelLoaded = true;
    } catch (error) {
      console.error("Failed to load camelcase-keys:", error);
    }
  }
};

const getCamelcaseKeys = async (obj: unknown) => {
  if (!isCamelLoaded) {
    await loadCamelcaseKeys();
  }

  if (camelcaseKeys) {
    return camelcaseKeys(obj);
  } else {
    throw new Error("camelcaseKeys module could not be loaded.");
  }
};

// --------------------------------------------------------------------------------
// Snake case
// --------------------------------------------------------------------------------

const loadSnakecaseKeys = async () => {
  if (!isSnakeLoaded) {
    try {
      snakecaseKeys = (await import("snakecase-keys")).default;
      isSnakeLoaded = true;
    } catch (error) {
      console.error("Failed to load snakecase-keys:", error);
    }
  }
};

const getSnakecaseKeys = async (obj: unknown) => {
  if (!isSnakeLoaded) {
    await loadSnakecaseKeys();
  }

  if (snakecaseKeys) {
    return snakecaseKeys(obj);
  } else {
    throw new Error("snakecaseKeys module could not be loaded.");
  }
};

export { getCamelcaseKeys, getSnakecaseKeys };
