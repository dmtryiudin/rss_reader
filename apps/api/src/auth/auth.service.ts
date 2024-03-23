import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './schemas/admin.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { LoginAdminDto } from './dto/login-admin.dto';
import { GetAdminDto } from './dto/get-admin.dto';
import * as bcrypt from 'bcryptjs';
import { RegistrationAdminDto } from './dto/registration-admin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    private jwtService: JwtService,
  ) {}

  async validateAdmin({ username, password }: LoginAdminDto) {
    const foundAdmin = await this.adminModel.findOne({ username });

    if (!foundAdmin) return null;

    const { password: hashPassword } = foundAdmin;

    if (bcrypt.compareSync(password, hashPassword))
      return {
        ...new GetAdminDto(foundAdmin),
        token: this.jwtService.sign({ ...new GetAdminDto(foundAdmin) }),
      };
  }

  async registration({ username, password }: RegistrationAdminDto) {
    const candidate = await this.adminModel.findOne({ username });

    if (candidate)
      throw new HttpException('Admin with this username already exists', 400);

    const hashPassword = bcrypt.hashSync(password, 8);
    const newAdmin = new this.adminModel({ username, password: hashPassword });

    await newAdmin.save();

    return {
      ...new GetAdminDto(newAdmin),
      token: this.jwtService.sign({ ...new GetAdminDto(newAdmin) }),
    };
  }
}
