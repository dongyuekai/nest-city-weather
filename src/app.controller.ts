import {
  Controller,
  Get,
  Query,
  Param,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { AppService } from './app.service';
import pinyin from 'pinyin';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('pinyin')
  pinyin(@Query('text') text: string) {
    return pinyin(text).join('');
  }

  @Inject(HttpService)
  private httpService: HttpService;
  @Get('weather/:city')
  async weather(@Param('city') city: string) {
    const cityPinyin = pinyin(city, { style: 'normal' }).join('');
    const { data } = await firstValueFrom(
      this.httpService.get(
        `https://geoapi.qweather.com/v2/city/lookup?location=${cityPinyin}&key=22773a5c0673456782ffa1affc3bc6f5`,
      ),
    );
    const location = data?.['location']?.[0];

    if (!location) {
      throw new BadRequestException('没有对应的城市信息');
    }

    const { data: weatherData } = await firstValueFrom(
      this.httpService.get(
        `https://api.qweather.com/v7/weather/7d?location=${location.id}&key=22773a5c0673456782ffa1affc3bc6f5`,
      ),
    );

    return weatherData;
  }
}
