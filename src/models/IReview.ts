import { User } from "./User";

export interface IReview {
  comment: string;
  rating: number;
  user?: User;
  createdDate?: Date;
}
