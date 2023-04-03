import { Organization, Team } from '@kyso-io/kyso-model'
import { Logger } from '@nestjs/common'
import axios, { AxiosResponse } from 'axios'

export const sendMessageToSlackChannel = async (organization: Organization, team: Team, text: string): Promise<AxiosResponse<any>> => {
    let channel: string = null
    if (!organization?.options?.notifications?.slackToken) {
        return
    }
    if (team?.slackChannel) {
        channel = team.slackChannel
    } else if (organization?.options?.notifications?.slackChannel) {
        channel = organization.options.notifications.slackChannel
    } else {
        return
    }
    const axiosResponse: AxiosResponse<any> = await axios.post(
        'https://slack.com/api/chat.postMessage',
        {
            channel,
            text,
        },
        {
            headers: {
                Authorization: `Bearer ${organization.options.notifications.slackToken}`,
                'Content-Type': 'application/json; charset=utf-8',
            },
        },
    )
    if (!axiosResponse.data.ok) {
        Logger.error(`An error occurred sending message to channel '${channel}'`, axiosResponse.data.error)
    } else {
        Logger.log(`Message sent to '${channel}' slack channel with slack_channel_id '${axiosResponse.data.channel}'`)
    }
    return axiosResponse
}

export const organizationRoleToString = (role: string): string => {
    switch (role) {
        case 'organization-admin':
            return 'Admin of this organization'
        case 'team-admin':
            return 'Full access all channels'
        case 'team-contributor':
            return 'Can edit all channels'
        case 'team-reader':
            return 'Can comment all channels'
        default:
            return role
    }
}

export const teamRoleToString = (role: string): string => {
    switch (role) {
        case 'organization-admin':
            return 'Full access'
        case 'team-admin':
            return 'Full access'
        case 'team-contributor':
            return 'Can edit'
        case 'team-reader':
            return 'Can comment'
        default:
            return role
    }
}
