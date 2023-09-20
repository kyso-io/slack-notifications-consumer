import { KysoEventEnum, KysoOrganizationsAddMemberEvent, KysoOrganizationsDeleteEvent, KysoOrganizationsRemoveMemberEvent, KysoOrganizationsUpdateMemberRoleEvent } from '@kyso-io/kyso-model'
import { Controller } from '@nestjs/common'
import { EventPattern } from '@nestjs/microservices'
import { organizationRoleToString, sendMessageToSlackChannel } from '../helpers'

@Controller()
export class OrganizationsController {
    @EventPattern(KysoEventEnum.ORGANIZATIONS_ADD_MEMBER)
    async handleOrganizationsAddMember(kysoOrganizationsAddMemberEvent: KysoOrganizationsAddMemberEvent) {
        const { organization, userCreatingAction, frontendUrl, newRole } = kysoOrganizationsAddMemberEvent
        const organizationUrl = `${frontendUrl}/${organization.sluglified_name}`
        const text = `User *${userCreatingAction.name}* added to the organization <${organizationUrl}|${organization.display_name}> with the role *${organizationRoleToString(newRole)}*`
        sendMessageToSlackChannel(organization, null, text)
    }

    @EventPattern(KysoEventEnum.ORGANIZATIONS_UPDATE_MEMBER_ROLE)
    async handleOrganizationsUpdateMemberRole(kysoOrganizationsUpdateMemberRoleEvent: KysoOrganizationsUpdateMemberRoleEvent) {
        const { organization, user, frontendUrl, previousRole, currentRole } = kysoOrganizationsUpdateMemberRoleEvent
        const organizationUrl = `${frontendUrl}/${organization.sluglified_name}`
        const text = `The role of the User *${user.name}* has been updated from *${organizationRoleToString(previousRole)}* to *${organizationRoleToString(currentRole)}* in the <${organizationUrl}|${
            organization.display_name
        }> organization`
        sendMessageToSlackChannel(organization, null, text)
    }

    @EventPattern(KysoEventEnum.ORGANIZATIONS_REMOVE_MEMBER)
    async handleOrganizationsRemoveMember(kysoOrganizationsRemoveMemberEvent: KysoOrganizationsRemoveMemberEvent) {
        const { organization, user, frontendUrl } = kysoOrganizationsRemoveMemberEvent
        const organizationUrl = `${frontendUrl}/${organization.sluglified_name}`
        const text = `User *${user.name}* removed from the organization <${organizationUrl}|${organization.display_name}>`
        sendMessageToSlackChannel(organization, null, text)
    }

    @EventPattern(KysoEventEnum.ORGANIZATIONS_DELETE)
    async handleOrganizationsDelete(kysoOrganizationsDeleteEvent: KysoOrganizationsDeleteEvent) {
        const { organization, user } = kysoOrganizationsDeleteEvent
        const text = `Organization *${organization.display_name}* deleted by *${user.name}*`
        sendMessageToSlackChannel(organization, null, text)
    }
}
