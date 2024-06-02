import { EmployeeEntity } from '../kudos/entities';

export type AuthPayload =
  | {
      employee: EmployeeEntity;
      isAdmin: false;
    }
  | {
      username: string;
      isAdmin: true;
    };
