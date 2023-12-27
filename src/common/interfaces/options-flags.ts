export type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};
