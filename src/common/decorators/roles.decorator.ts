import { SetMetadata } from '@nestjs/common';
import { ERole } from '../enums';

export const Roles = (roles: ERole[]) => SetMetadata('roles', roles);
