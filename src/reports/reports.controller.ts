import { KysoEventEnum, KysoReportsCreateEvent, KysoReportsDeleteEvent, KysoReportsNewVersionEvent, KysoReportsPinEvent, KysoReportsStarEvent, KysoReportsUpdateEvent } from '@kyso-io/kyso-model'
import { Controller } from '@nestjs/common'
import { EventPattern } from '@nestjs/microservices'
import { sendMessageToSlackChannel } from '../helpers'

@Controller()
export class ReportsController {
    @EventPattern(KysoEventEnum.REPORTS_CREATE)
    async handleReportsCreate(kysoReportsCreateEvent: KysoReportsCreateEvent) {
        const { organization, team, report, frontendUrl, user } = kysoReportsCreateEvent
        const reportUrl = `${frontendUrl}/${organization.sluglified_name}/${team.sluglified_name}/${report.sluglified_name}`
        const text = `User *${user.name}* uploaded a new report <${reportUrl}|*${report.title}*>`
        sendMessageToSlackChannel(organization, team, text)
    }

    @EventPattern(KysoEventEnum.REPORTS_UPDATE)
    async handleReportsUpdate(kysoReportsUpdateEvent: KysoReportsUpdateEvent) {
        const { organization, team, report, frontendUrl, user } = kysoReportsUpdateEvent
        const reportUrl = `${frontendUrl}/${organization.sluglified_name}/${team.sluglified_name}/${report.sluglified_name}`
        const text = `User *${user.name}* updated report metadata <${reportUrl}|*${report.title}*>`
        sendMessageToSlackChannel(organization, team, text)
    }

    @EventPattern(KysoEventEnum.REPORTS_NEW_VERSION)
    async handleReportsNewVersion(kysoReportsNewVersionEvent: KysoReportsNewVersionEvent) {
        const { organization, team, report, frontendUrl, user } = kysoReportsNewVersionEvent
        const reportUrl = `${frontendUrl}/${organization.sluglified_name}/${team.sluglified_name}/${report.sluglified_name}`
        const text = `User *${user.name}* uploaded a new version of report <${reportUrl}|*${report.title}*>`
        sendMessageToSlackChannel(organization, team, text)
    }

    @EventPattern(KysoEventEnum.REPORTS_DELETE)
    async handleReportsDelete(kysoReportsDeleteEvent: KysoReportsDeleteEvent) {
        const { organization, team, report, user } = kysoReportsDeleteEvent
        const text = `User *${user.name}* deleted report *${report.title}*`
        sendMessageToSlackChannel(organization, team, text)
    }

    @EventPattern(KysoEventEnum.REPORTS_PIN)
    async handleReportsPin(kysoReportsPinEvent: KysoReportsPinEvent) {
        const { organization, team, report, user, frontendUrl } = kysoReportsPinEvent
        const reportUrl = `${frontendUrl}/${organization.sluglified_name}/${team.sluglified_name}/${report.sluglified_name}`
        const text = `User *${user.name}* pinned report <${reportUrl}|*${report.title}*>`
        sendMessageToSlackChannel(organization, team, text)
    }

    @EventPattern(KysoEventEnum.REPORTS_UNPIN)
    async handleReportsUnpin(kysoReportsUnpinEvent: KysoReportsPinEvent) {
        const { organization, team, report, user, frontendUrl } = kysoReportsUnpinEvent
        const reportUrl = `${frontendUrl}/${organization.sluglified_name}/${team.sluglified_name}/${report.sluglified_name}`
        const text = `User *${user.name}* unpinned report <${reportUrl}|*${report.title}*>`
        sendMessageToSlackChannel(organization, team, text)
    }

    @EventPattern(KysoEventEnum.REPORTS_PIN_GLOBAL)
    async handleReportsPinGlobal(kysoReportsPinGlobalEvent: KysoReportsPinEvent) {
        const { organization, team, report, user, frontendUrl } = kysoReportsPinGlobalEvent
        const reportUrl = `${frontendUrl}/${organization.sluglified_name}/${team.sluglified_name}/${report.sluglified_name}`
        const text = `User *${user.name}* pinned report <${reportUrl}|*${report.title}*> globally`
        sendMessageToSlackChannel(organization, team, text)
    }

    @EventPattern(KysoEventEnum.REPORTS_UNPIN_GLOBAL)
    async handleReportsUnpinGlobal(kysoReportsUnpinGlobalEvent: KysoReportsPinEvent) {
        const { organization, team, report, user, frontendUrl } = kysoReportsUnpinGlobalEvent
        const reportUrl = `${frontendUrl}/${organization.sluglified_name}/${team.sluglified_name}/${report.sluglified_name}`
        const text = `User *${user.name}* unpinned report <${reportUrl}|*${report.title}*> globally`
        sendMessageToSlackChannel(organization, team, text)
    }

    @EventPattern(KysoEventEnum.REPORTS_STAR)
    async handleReportsStar(kysoReportsStarEvent: KysoReportsStarEvent) {
        const { organization, team, report, user, frontendUrl } = kysoReportsStarEvent
        const reportUrl = `${frontendUrl}/${organization.sluglified_name}/${team.sluglified_name}/${report.sluglified_name}`
        const text = `User *${user.name}* starred report <${reportUrl}|*${report.title}*>`
        sendMessageToSlackChannel(organization, team, text)
    }

    @EventPattern(KysoEventEnum.REPORTS_UNSTAR)
    async handleReportsUnstar(kysoReportsUnstarEvent: KysoReportsStarEvent) {
        const { organization, team, report, user, frontendUrl } = kysoReportsUnstarEvent
        const reportUrl = `${frontendUrl}/${organization.sluglified_name}/${team.sluglified_name}/${report.sluglified_name}`
        const text = `User *${user.name}* unstarred report <${reportUrl}|*${report.title}*>`
        sendMessageToSlackChannel(organization, team, text)
    }
}
