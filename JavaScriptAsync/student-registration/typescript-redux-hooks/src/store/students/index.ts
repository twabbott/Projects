export enum Gender {
  male,
  female
};

export interface Student {
  id: Number;
  firstName: String;
  lastName: String;
  gender: Gender;
  uvuId: Number;
  race: String;
  age: Number;
  isVeteran: Boolean;
};
