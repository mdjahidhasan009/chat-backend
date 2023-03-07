import { Routes, Services } from '../utils/constants';
import { Controller, Inject } from '@nestjs/common';
import { IGroupService } from './group';

@Controller(Routes.GROUPS)
export class GroupController {
  constructor(
    @Inject(Services.GROUPS) private readonly groupService: IGroupService,
  ) {}
}
