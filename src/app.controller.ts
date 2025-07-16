import { Controller, Get, Post, Body, Param, OnApplicationShutdown } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController implements OnApplicationShutdown {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Promise<string> {
    return this.appService.getHello();
  }

  // @Post('addFile')
  // addFile(@Body() file: any): Promise<string> {
  //   return this.appService.addFile(file);
  // }

  // @Get('getFile/:hash')
  // getFile(@Param('hash') hash: string): Promise<any> {
  //   return this.appService.getFile(hash);
  // }

  // @Get('listFiles')
  // listFiles(@Body() options: any): Promise<any> {
  //   return this.appService.listFiles(options);
  // }

  async onApplicationShutdown() {
    // await this.appService.onApplicationShutdown();
  }
}