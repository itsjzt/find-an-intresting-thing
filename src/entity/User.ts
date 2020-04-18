import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Media } from "./Media";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  // @Column("text")
  // avatar: string;

  @Column("text")
  bio: string;

  @ManyToOne((_type) => Media, (media) => media.postedBy)
  media: Media[];
}
