import { KysoCommentsCreateEvent, KysoCommentsDeleteEvent, KysoCommentsUpdateEvent, KysoEventEnum } from '@kyso-io/kyso-model'
import { Controller } from '@nestjs/common'
import { EventPattern } from '@nestjs/microservices'
import { sendMessageToSlackChannel } from '../helpers'

@Controller()
export class CommentsController {
    @EventPattern(KysoEventEnum.COMMENTS_CREATE)
    async handleCommentsCreated(kysoCommentsCreateEvent: KysoCommentsCreateEvent) {
        const { organization, team, discussion, report, frontendUrl, user } = kysoCommentsCreateEvent
        if (discussion) {
            const discussionUrl = `${frontendUrl}/${organization.sluglified_name}/${team.sluglified_name}/discussions/${discussion.id}`
            const text = `User *${user.name}* created a comment in the discussion <${discussionUrl}|${discussion.title}>`
            sendMessageToSlackChannel(organization, team, text)
        } else if (report) {
            const reportUrl = `${frontendUrl}/${organization.sluglified_name}/${team.sluglified_name}/reports/${report.sluglified_name}`
            const text = `User *${user.name}* created a comment in the report <${reportUrl}|${report.title}>`
            sendMessageToSlackChannel(organization, team, text)
        }
    }

    @EventPattern(KysoEventEnum.COMMENTS_REPLY)
    async handleCommentsReply(kysoCommentsCreateEvent: KysoCommentsCreateEvent) {
        const { organization, team, discussion, report, frontendUrl, user } = kysoCommentsCreateEvent
        if (discussion) {
            const discussionUrl = `${frontendUrl}/${organization.sluglified_name}/${team.sluglified_name}/discussions/${discussion.id}`
            const text = `User *${user.name}* replied to a comment in the discussion <${discussionUrl}|${discussion.title}>`
            sendMessageToSlackChannel(organization, team, text)
        } else if (report) {
            const reportUrl = `${frontendUrl}/${organization.sluglified_name}/${team.sluglified_name}/reports/${report.sluglified_name}`
            const text = `User *${user.name}* replied to a comment in the report <${reportUrl}|${report.title}>`
            sendMessageToSlackChannel(organization, team, text)
        }
    }

    @EventPattern(KysoEventEnum.COMMENTS_UPDATE)
    async handleCommentsUpdated(kysoCommentsUpdateEvent: KysoCommentsUpdateEvent) {
        const { organization, team, discussion, report, frontendUrl, user } = kysoCommentsUpdateEvent
        if (discussion) {
            const discussionUrl = `${frontendUrl}/${organization.sluglified_name}/${team.sluglified_name}/discussions/${discussion.id}`
            const text = `User *${user.name}* updated a comment in the discussion <${discussionUrl}|${discussion.title}>`
            sendMessageToSlackChannel(organization, team, text)
        } else if (report) {
            const reportUrl = `${frontendUrl}/${organization.sluglified_name}/${team.sluglified_name}/reports/${report.sluglified_name}`
            const text = `User *${user.name}* updated a comment in the report <${reportUrl}|${report.title}>`
            sendMessageToSlackChannel(organization, team, text)
        }
    }

    @EventPattern(KysoEventEnum.COMMENTS_DELETE)
    async handleCommentsDeleted(kysoCommentsDeleteEvent: KysoCommentsDeleteEvent) {
        const { organization, team, discussion, report, frontendUrl, user } = kysoCommentsDeleteEvent
        if (discussion) {
            const discussionUrl = `${frontendUrl}/${organization.sluglified_name}/${team.sluglified_name}/discussions/${discussion.id}`
            const text = `User *${user.name}* deleted a comment in the discussion <${discussionUrl}|${discussion.title}>`
            sendMessageToSlackChannel(organization, team, text)
        } else if (report) {
            const reportUrl = `${frontendUrl}/${organization.sluglified_name}/${team.sluglified_name}/reports/${report.sluglified_name}`
            const text = `User *${user.name}* deleted a comment in the report <${reportUrl}|${report.title}>`
            sendMessageToSlackChannel(organization, team, text)
        }
    }
}
