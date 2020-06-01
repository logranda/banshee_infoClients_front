import {SaleRepresentative} from "./SaleRepresentative";
import {City} from "./city";
import {User} from "./user";

export class Visit {
  id: number;
  dateVisit: string;
  net: number;
  total: number;
  description: string;
  saleRepresentative: SaleRepresentative;
  city: City;
  customer: User;
}
