export interface IResponse<T = undefined> {
  success: boolean;
  message: string;
  data: T;
  code: number;
}
