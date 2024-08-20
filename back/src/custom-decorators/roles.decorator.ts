import { SetMetadata } from "@nestjs/common";
import { Role } from "../auth/roles.enum";


export const Roles = (...roles: Role[]) => SetMetadata('roles',roles);