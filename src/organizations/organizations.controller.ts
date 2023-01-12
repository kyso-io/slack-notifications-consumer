import { KysoEventEnum, KysoOrganizationsAddMemberEvent, KysoOrganizationsRemoveMemberEvent, KysoOrganizationsUpdateMemberRoleEvent } from '@kyso-io/kyso-model'
import { Controller } from '@nestjs/common'
import { EventPattern } from '@nestjs/microservices'
import { sendMessageToSlackChannel } from '../helpers'

@Controller()
export class OrganizationsController {
    @EventPattern(KysoEventEnum.ORGANIZATIONS_ADD_MEMBER)
    async handleOrganizationsAddMember(kysoOrganizationsAddMemberEvent: KysoOrganizationsAddMemberEvent) {
        const { organization, user, frontendUrl, role } = kysoOrganizationsAddMemberEvent
        const organizationUrl = `${frontendUrl}/${organization.sluglified_name}`
        const text = `User *${user.name}* added to the organization <${organizationUrl}|${organization.display_name}> with the role *${role}*`
        sendMessageToSlackChannel(organization, null, text)
    }
    @EventPattern(KysoEventEnum.ORGANIZATIONS_UPDATE_MEMBER_ROLE)
    async handleOrganizationsUpdateMemberRole(kysoOrganizationsUpdateMemberRoleEvent: KysoOrganizationsUpdateMemberRoleEvent) {
        const { organization, user, frontendUrl, previousRole, currentRole } = kysoOrganizationsUpdateMemberRoleEvent
        const organizationUrl = `${frontendUrl}/${organization.sluglified_name}`
        const text = `The role of the User *${user.name}* has been updated from *${previousRole}* to *${currentRole}* in the <${organizationUrl}|${organization.display_name}> organization`
        sendMessageToSlackChannel(organization, null, text)
    }

    @EventPattern(KysoEventEnum.ORGANIZATIONS_REMOVE_MEMBER)
    async handleOrganizationsRemoveMember(kysoOrganizationsRemoveMemberEvent: KysoOrganizationsRemoveMemberEvent) {
        const { organization, user, frontendUrl } = kysoOrganizationsRemoveMemberEvent
        const organizationUrl = `${frontendUrl}/${organization.sluglified_name}`
        const text = `User *${user.name}* removed from the organization <${organizationUrl}|${organization.display_name}>`
        sendMessageToSlackChannel(organization, null, text)
    }
}
