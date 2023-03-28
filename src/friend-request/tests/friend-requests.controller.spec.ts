import { createFriendRequest } from './../../../../chat-frontend/src/utils/api';
import { FriendRequestController } from '../friend-requests.controller';
import { Services } from '../../utils/constants';
import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { mockUser } from '../../__mocks__';
import { IFriendRequestService } from '../friend-requests';



describe('FriendRequestsController', () => {
  let controller: FriendRequestController;
  let friendRequestService: IFriendRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FriendRequestController],
      providers: [ 
        {
          provide: Services.FRIENDS_REQUESTS_SERVICE,
          useValue: {
            getFriendRequests: jest.fn((x) => {x}),
            create: jest.fn((x) => x),
          }
        },
        EventEmitter2, 
      ],
    }).compile();

    controller = module.get<FriendRequestController>(FriendRequestController);
    friendRequestService = module.get<IFriendRequestService>(Services.FRIENDS_REQUESTS_SERVICE);

    jest.clearAllMocks();
  });

  it('controller and service should be definded', () => {
    expect(controller).toBeDefined();
    expect(friendRequestService).toBeDefined();
  });

  
  it('should call friendRequestService.getFriendRequests' , async () => {
    await controller.getFriendRequests(mockUser);
    expect(friendRequestService.getFriendRequests).toHaveBeenCalled();
    expect(friendRequestService.getFriendRequests).toHaveBeenCalledWith(mockUser.id);
  });
  
  it('should call createFriendRequest with correct params', async () => {
    await controller.createFriendRequest(mockUser, {
      email: 'new2@gmail.com'
    });
    expect(friendRequestService.create).toHaveBeenCalledWith({
      user: mockUser,
      email: 'new2@gmail.com'
    })
  });
});