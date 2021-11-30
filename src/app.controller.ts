import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { Registration } from './dto/users.dto';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/registration')
  @ApiBody({ type: Registration })
  @ApiTags('Users')
  public async instituteBasicDetails(
    @Res() res,
    @Body() credential,
  ): Promise<any> {
    const result = await this.appService.signUp(res, credential);
    return result;
  }

  @Post('/doLogin')
  @ApiBody({ type: Registration })
  @ApiTags('Users')
  public async doLogin(@Res() res, @Body() credential): Promise<any> {
    const result = await this.appService.login(credential);
    return res.send(result);
  }
}
