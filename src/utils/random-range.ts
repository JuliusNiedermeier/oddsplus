export const getRandomInRange = (min: number, max: number) => {
  if (min > max) {
    throw new Error(
      "The 'min' value must be less than or equal to the 'max' value."
    );
  }

  return Math.random() * (max - min) + min;
};
