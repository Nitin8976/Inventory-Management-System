import { HttpStatusMessages } from 'src/utils/http-status-message';

export class ApiResponseDto<T> {
  statusCode: number;
  message: string;
  data?: T;

  constructor(statusCode: number, data?: T, message?: string) {
    const respnseMessage = message || HttpStatusMessages[statusCode];

    // Remove if password
    if (data && data['password']) {
      delete data['password'];
    }

    this.statusCode = statusCode;
    this.message = respnseMessage;
    this.data = data;
  }
}

export type ListTypeRes<T> = {
  count: number;
  records: T[];
};
