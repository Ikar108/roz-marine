import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DbModule } from './db/db.module'
import { Category } from './shop/entities/category.entity'
import { ShopModule } from './shop/shop.module'
import { AdminModule } from './admin/admin.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    DbModule,
    TypeOrmModule.forFeature([Category]),
    ShopModule,
    AdminModule,
    AuthModule.forRoot({
      // These are the connection details of the app you created on supertokens.com
      connectionURI: "https://1fa96cb152ec11edb08d8f5f16736e96-eu-west-1.aws.supertokens.io:3573",
      apiKey: "IclbTR-czTY7npk-Q5SN-JkVcpztgv",
      appInfo: {
        // Learn more about this on https://supertokens.com/docs/emailpassword/appinfo
        appName: "roz-marine",
        apiDomain: "http://127.0.0.1:3000",
        websiteDomain: "http://127.0.0.1:3000",
        apiBasePath: "/auth",
        websiteBasePath: "/admin/auth",
      },
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
