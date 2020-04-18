import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./User";
import { Tag } from "./Tag";

type MEDIA_TYPE = "MOVIE" | "TVSHOW" | "BOOK";

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: MEDIA_TYPE;

  @ManyToMany((type) => Tag)
  @JoinTable()
  tags: Tag[];

  @Column()
  name: string;

  @Column("text")
  description: string;

  @OneToOne((type) => User, (user) => user.media)
  postedBy: User;

  //   @Column("text")
  //   image: string;

  @Column("int")
  rating: number;

  @Column("datetime")
  releaseDate: Date;

  @Column("int")
  ageRestriction: number;
}
