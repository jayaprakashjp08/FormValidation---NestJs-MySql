import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { Users } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from 'express';
// var md5 = require("md5");
// import {Md5} from 'ts-md5/dist/md5';
import { Md5 } from 'md5-typescript';
@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async signUp(res, credentials: any): Promise<any> {
    try {
      const userDetails: any = {};
      const data = await this.usersRepository.find({
        email: credentials.email,
      });
      if (!data.length) {
        userDetails.password = Md5.init(credentials.password);
        userDetails.email = credentials.email;
        userDetails.userName = credentials.userName;
        const result = await this.usersRepository.save(userDetails);
        return res.status(HttpStatus.OK).json({
          message: 'Insert Successfully',
          userId: result.userId,
        });
      } else {
        return res.status(HttpStatus.FOUND).json({
          message: 'User Already Exists',
        });
      }
    } catch (e) {
      return new HttpException(
        { message: e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(credentials: any): Promise<any> {
    try {
      const data = await this.usersRepository.find({
        email: credentials.email,
      });
      if (data.length) {
        if (data[0].password === Md5.init(credentials.password)) {
          return {
            statusCode: HttpStatus.OK,
            message: 'Logged in Successfully',
            status: true,
          };
          // return res.status(HttpStatus.OK).json({
          //   message: 'Logged in Successfully',
          // });
        } else {
          return {
            statusCode: HttpStatus.NOT_ACCEPTABLE,
            message: 'Invalid username or password',
            status: false,
          };
        }
      } else {
        return {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'User does not registerd',
          status: true,
        };
      }
    } catch (e) {
      return new HttpException(
        { message: e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async verifyEmailFormat(email: string): Promise<any> {
    try {
      let re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      email = String(email).toLowerCase();
      const result = re.test(email);
      console.log('result', result);
      return result ? { status: true, email: email } : { status: false };
    } catch (e) {
      return new HttpException(
        { message: e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
