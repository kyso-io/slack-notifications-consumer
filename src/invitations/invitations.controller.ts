import { KysoEvent, KysoInvitationsTeamCreateEvent } from '@kyso-io/kyso-model'
import { Controller } from '@nestjs/common'
import { EventPattern } from '@nestjs/microservices'
import { sendMessageToSlackChannel } from '../helpers'

@Controller()
export class InvitationsController {
    @EventPattern(KysoEvent.INVITATIONS_TEAM_CREATE)
    async handleDiscussionsCreated(kysoInvitationsTeamCreateEvent: KysoInvitationsTeamCreateEvent) {
        const { organization, team, user, frontendUrl, roles, invitation } = kysoInvitationsTeamCreateEvent
        const teamUrl = `${frontendUrl}/${organization.sluglified_name}/${team.sluglified_name}`
        const text = `User *${user.name}* invited ${invitation.email} to the team <${teamUrl}|${team.display_name}> with the ${
            roles.length > 1 ? `roles ${roles.map((role: string) => `*${role}*`).join(',')}` : `role *${roles[0]}*`
        }`
        sendMessageToSlackChannel(organization, team, text)
    }
}
