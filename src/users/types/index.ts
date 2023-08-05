import { Exclude } from 'class-transformer';

export interface User {
  username: string;
  password: string;
}

export class SerializedUser {
  username: string;

  @Exclude()
  password: string;

  constructor(parial: Partial<SerializedUser>) {
    Object.assign(this, parial);
  }
}
