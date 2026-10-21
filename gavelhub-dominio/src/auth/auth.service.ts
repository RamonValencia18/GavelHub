import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthService {
    constructor(@Inject(UserRepository) private readonly userRepository: UserRepository) {}
}