import { IItemRefibraRelation } from './itemRefibraRelation.interface';

export class IItemRefibra {
  item?: string;
  title?: string;
  image?: string;
  text?: string[];
  listRelationItem?: IItemRefibraRelation[]
  listRelation?: string[]

  
}