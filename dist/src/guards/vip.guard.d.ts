import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
export declare class VipGuard implements CanActivate {
    private reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private getUser;
    private getBook;
}
