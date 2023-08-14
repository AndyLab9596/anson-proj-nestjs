import { Exclude } from 'class-transformer';

export interface User {
  id: number;
  username: string;
  password: string;
}

export class SerializedUser {
  id: number;
  username: string;

  @Exclude()
  password: string;

  constructor(parial: Partial<SerializedUser>) {
    Object.assign(this, parial);
  }
}
