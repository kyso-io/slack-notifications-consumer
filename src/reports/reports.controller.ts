import { KysoEvent, KysoReportsCreateEvent, KysoReportsDeleteEvent, KysoReportsNewVersionEvent, KysoReportsUpdateEvent } from '@kyso-io/kyso-model'
import { Controller } from '@nestjs/common'
import { EventPattern } from '@nestjs/microservices'
import { sendMessageToSlackChannel } from '../helpers'

@Controller()
export class ReportsController {
    @EventPattern(KysoEvent.REPORTS_CREATE)
    async handleReportsCreate(kysoReportsCreateEvent: KysoReportsCreateEvent) {
        const { organization, team, report, frontendUrl, user } = kysoReportsCreateEvent
        const reportUrl = `${frontendUrl}/${organization.sluglified_name}/${team.sluglified_name}/${report.sluglified_name}`
        const text = `User *${user.name}* uploaded a new report <${reportUrl}|*${report.title}*>`
        sendMessageToSlackChannel(organization, team, text)
    }

    @EventPattern(KysoEvent.REPORTS_UPDATE)
    async handleReportsUpdate(kysoReportsUpdateEvent: KysoReportsUpdateEvent) {
        const { organization, team, report, frontendUrl, user } = kysoReportsUpdateEvent
        const reportUrl = `${frontendUrl}/${organization.sluglified_name}/${team.sluglified_name}/${report.sluglified_name}`
        const text = `User *${user.name}* updated report metadata <${reportUrl}|*${report.title}*>`
        sendMessageToSlackChannel(organization, team, text)
    }

    @EventPattern(KysoEvent.REPORTS_NEW_VERSION)
    async handleReportsNewVersion(kysoReportsNewVersionEvent: KysoReportsNewVersionEvent) {
        const { organization, team, report, frontendUrl, user } = kysoReportsNewVersionEvent
        const reportUrl = `${frontendUrl}/${organization.sluglified_name}/${team.sluglified_name}/${report.sluglified_name}`
        const text = `User *${user.name}* uploaded a new version of report <${reportUrl}|*${report.title}*>`
        sendMessageToSlackChannel(organization, team, text)
    }

    @EventPattern(KysoEvent.REPORTS_DELETE)
    async handleReportsDelete(kysoReportsDeleteEvent: KysoReportsDeleteEvent) {
        const { organization, team, report, user } = kysoReportsDeleteEvent
        const text = `User *${user.name}* deleted report *${report.title}*`
        sendMessageToSlackChannel(organization, team, text)
    }
}
