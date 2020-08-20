import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserConnectionDTO, UserDTO } from './user.dto';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>){}

  async getAllUser(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async createUser(data: UserDTO) : Promise<User> {
    const {email} = data
    const user = this.userRepository.create(data);
    await this.userRepository.save(user);
    return this.userRepository.findOne({where : { email : email}});
  }

  async getUser(id :string): Promise<User> {
    return await this.userRepository.findOne({where : { id : id }, relations: ['connections']});
  }

  async addConnection(id: string, data: UserConnectionDTO): Promise<User>  {
    const connectionId: string = data.connectionId
    const connectionUser = await this.getUser(connectionId);
    const user = await this.userRepository.findOne({where : { id : id }, relations: ['connections']});
    var connections = user.connections;
    if (!connections) {
      connections = []
    }
    connections.push(connectionUser);
    user.connections = connections
    await this.userRepository.save(user);

    var connections = connectionUser.connections;
    if (!connections) {
      connections = []
    }
    connections.push(user);
    connectionUser.connections = connections;
    await this.userRepository.save(connectionUser);
    return await this.userRepository.findOne({where : { id : id }, relations: ['connections']});
  }
}
