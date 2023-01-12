import { KysoEventEnum, KysoTeamsAddMemberEvent, KysoTeamsRemoveMemberEvent, KysoTeamsUpdateMemberRolesEvent } from '@kyso-io/kyso-model'
import { Controller } from '@nestjs/common'
import { EventPattern } from '@nestjs/microservices'
import { sendMessageToSlackChannel } from '../helpers'

@Controller()
export class TeamsController {
    @EventPattern(KysoEventEnum.TEAMS_ADD_MEMBER)
    async handleTeamsAddMember(kysoTeamsAddMemberEvent: KysoTeamsAddMemberEvent) {
        const { organization, team, user, frontendUrl, roles } = kysoTeamsAddMemberEvent
        const teamUrl = `${frontendUrl}/${organization.sluglified_name}/${team.sluglified_name}`
        const text = `User *${user.name}* added to the team <${teamUrl}|${team.display_name}> with the ${
            roles.length > 1 ? `roles ${roles.map((role: string) => `*${role}*`).join(',')}` : `role *${roles[0]}*`
        }`
        sendMessageToSlackChannel(organization, team, text)
    }

    @EventPattern(KysoEventEnum.TEAMS_UPDATE_MEMBER_ROLES)
    async handleTeamsUpdateMemberRoles(kysoTeamsUpdateMemberRolesEvent: KysoTeamsUpdateMemberRolesEvent) {
        const { organization, team, user, frontendUrl, previousRoles, currentRoles } = kysoTeamsUpdateMemberRolesEvent
        const teamUrl = `${frontendUrl}/${organization.sluglified_name}/${team.sluglified_name}`
        const text = `The roles of the User *${user.name}* have been updated from ${previousRoles.map((role: string) => `*${role}*`).join(',')} to ${currentRoles
            .map((role: string) => `*${role}*`)
            .join(',')} in the <${teamUrl}|${team.display_name}> team`
        sendMessageToSlackChannel(organization, team, text)
    }

    @EventPattern(KysoEventEnum.TEAMS_REMOVE_MEMBER)
    async handleTeamsRemoveMember(kysoTeamsRemoveMemberEvent: KysoTeamsRemoveMemberEvent) {
        const { organization, team, user, frontendUrl } = kysoTeamsRemoveMemberEvent
        const teamUrl = `${frontendUrl}/${organization.sluglified_name}/${team.sluglified_name}`
        const text = `User *${user.name}* removed from the team <${teamUrl}|${team.display_name}>`
        sendMessageToSlackChannel(organization, team, text)
    }
}
