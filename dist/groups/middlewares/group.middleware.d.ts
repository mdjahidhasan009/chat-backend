import { NestMiddleware } from "@nestjs/common";
import { IGroupService } from "../interfaces/group";
import { AuthenticatedRequest } from "../../utils/types";
import { NextFunction } from "express";
export declare class GroupMiddleware implements NestMiddleware {
    private readonly groupService;
    constructor(groupService: IGroupService);
    use(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>;
}
