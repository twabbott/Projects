export interface ActionType {
  type: String;
};

export interface ErrorActionType extends ActionType {
  message: String;
};

export interface DataActionType<T> extends ActionType {
  data: T;
};
