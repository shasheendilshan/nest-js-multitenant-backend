import { AbstractEntity } from "../../../abstract.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: "categories" })
export class Category extends AbstractEntity {
  @Column()
  name: string;
}
