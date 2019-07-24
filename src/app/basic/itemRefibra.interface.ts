import { IItemRefibraRelation } from './itemRefibraRelation.interface';

export interface IItemRefibra {
  item: string;
  title: string;
  image: string;
  text: string[];
  listRelationItem: IItemRefibraRelation[]
  listRelation: string[]
}