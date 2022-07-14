import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CommentsModule } from './comments/comments.module'
import { DatabaseModule } from './database/database.module'
import { DiscussionsModule } from './discussions/discussions.module'
import { InvitationsModule } from './invitations/invitations.module'
import { OrganizationsModule } from './organizations/organizations.module'
import { ReportsModule } from './reports/reports.module'
import { TeamsModule } from './teams/teams.module'

let envFilePath = '.env'
if (process.env.DOTENV_FILE) {
    envFilePath = process.env.DOTENV_FILE
}

@Module({
    imports: [
        CommentsModule,
        ConfigModule.forRoot({
            envFilePath: envFilePath,
            isGlobal: true,
        }),
        DatabaseModule,
        DiscussionsModule,
        InvitationsModule,
        OrganizationsModule,
        ReportsModule,
        TeamsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
