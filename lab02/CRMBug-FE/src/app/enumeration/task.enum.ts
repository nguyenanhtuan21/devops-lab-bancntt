export enum TaskPriority {
  Low = 1,
  Normal = 2,
  High = 3
}

export enum TaskState {
  Pending = 1,
  Completed = 2,
  CompletedLate = 3,
}

export enum TaskType {
  Task = 1,
  Bug = 2,
  Request = 3,
  Other = 4 
}


export enum TaskView {
  List = 1,
  Calendar = 2
}