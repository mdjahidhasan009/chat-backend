import { FriendRequestNotFoundException } from './../exceptions/FriendRequestNotFound';
import { IUserService } from '../../users/user';
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Friend, FriendRequest } from '../../utils/typeorm';
import { Services } from "../../utils/constants";
import { IFriendRequestService } from "../friend-requests"
import { FriendRequestService } from "../friend-requests.service";
import { Repository } from 'typeorm';
import { FriendRequestException } from '../exceptions/FriendRequest';

describe('FriendRequestsService', () => {
  let friendRequestService: IFriendRequestService;
  let userService;
  let friendRepository: Repository<Friend>;
  let friendRequestRepository: Repository<FriendRequest>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: Services.FRIENDS_REQUESTS_SERVICE,
          useClass: FriendRequestService,
        },
        {
          provide: Services.USERS,
          useValue: {},
        },
        {
          provide: getRepositoryToken(Friend),
          useValue: {},
        },
        {
          provide: getRepositoryToken(FriendRequest),
          useValue: { 
            find: jest.fn((x) => x),
            delete: jest.fn((x) => x), 
          },
        }
      ],
    }).compile();

    friendRequestService = module.get<IFriendRequestService>(Services.FRIENDS_REQUESTS_SERVICE);
    userService = module.get<IUserService>(Services.USERS);
    friendRepository = module.get<Repository<Friend>>(getRepositoryToken(Friend));
    friendRequestRepository = module.get<Repository<FriendRequest>>(getRepositoryToken(FriendRequest)); 
  });

  describe('FriendRequestServiec', () => {
    it('should be defined', () => {
      expect(friendRequestService).toBeDefined();
      expect(userService).toBeDefined();
      expect(friendRepository).toBeDefined();
      expect(friendRequestRepository).toBeDefined();
    });
  
    it('should call getFriendRequests', async () => {
      await friendRequestService.getFriendRequests(20);
      expect(friendRequestRepository.find).toHaveBeenCalledWith({
        where: [
          {
            sender: { id: 20 },
            status: 'pending',
          },
          {
            receiver: { id: 20 },
            status: 'pending',
          },
        ],
        relations: ['receiver', 'sender'],
      })
    })
  });

  describe('cancel friend request', () => {
    const mockFriendRequest = { sender: { id: 50 } } as FriendRequest;

    it('should not found the friend request', async () => {
      jest
        .spyOn(friendRequestService, 'findById')
        .mockImplementationOnce(() => Promise.resolve(undefined));

      expect(friendRequestService.cancel({ id: 20, userId: 40 }))
        .rejects.toThrow(FriendRequestNotFoundException);  
    });

    it('should throw error when sender.id is not equal to the user id', async () => {
      jest.spyOn(friendRequestService, 'findById').mockImplementationOnce(() => 
        // Promise.resolve({
        //   sender: {
        //     id: 50,
        //   },
        // } as FriendRequest),

        Promise.resolve(mockFriendRequest),
      );
      expect(friendRequestService.cancel({ id: 500, userId: 30})).rejects.toThrow(FriendRequestException);
    });

    it('should not throw error and call friendRequestRepository.delete', async () => {
      jest
        .spyOn(friendRequestService, 'findById')
        .mockImplementationOnce(() => Promise.resolve(mockFriendRequest));

        await friendRequestService.cancel({ id: 321, userId: 50 });
        expect(friendRequestRepository.delete).toHaveBeenCalledWith(321);
    });
  });
})