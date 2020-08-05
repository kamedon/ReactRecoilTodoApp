export type Todo = {
  title: string;
  status: Status;
};

export type Status = "ISSUE" | "WIP" | "DONE";
