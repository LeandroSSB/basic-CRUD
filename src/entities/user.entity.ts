import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("users")
export class User {
  @PrimaryColumn()
  uuid!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  isAdm!: boolean;

  @Column()
  createdOn: string;

  @Column()
  updatedOn: string;

  constructor() {
    this.createdOn = new Date().toJSON();
    this.updatedOn = new Date().toJSON();
    this.uuid = uuidv4();
  }
}
