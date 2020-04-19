import { Request } from "express";
import { Connection, EntityManager } from "typeorm";

interface DBConnection {
  db: Connection;
}

export interface IRequest extends Request, DBConnection {}

export interface createControllerArg<T> extends DBConnection {
  data: Omit<T, "id">;
}

interface WhereUniqueInput {
  where: { id: number };
}

export interface updateControllerArg<T> extends DBConnection, WhereUniqueInput {
  data: Partial<T>;
}

export interface delControllerArg extends DBConnection, WhereUniqueInput {}

export interface viewControllerArg extends DBConnection, WhereUniqueInput {}

export interface viewAllControllerArg extends DBConnection {}
