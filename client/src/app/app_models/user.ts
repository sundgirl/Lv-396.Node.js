import {IDepartment} from "./department";

export  class User {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  manager?: any;
  teamlead: object;
  department?: IDepartment;
  email: string;
  phone: string;
  contacts: object;
  photoURL: string;
  hrID: number;
  date: object;
}
