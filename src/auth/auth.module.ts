import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SupertokensService } from './supertokens/supertokens.service';

@Module({
  controllers: [AuthController],
  providers: [SupertokensService]
})
export class AuthModule {}
