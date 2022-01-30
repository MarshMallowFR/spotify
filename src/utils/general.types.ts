export type EmptyObject = {
  [K in string]: never;
};

export type Dictionnary<T> = {
  [key: string]: T;
};
