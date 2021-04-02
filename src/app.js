import { RTMClient }  from '@slack/rtm-api'
import  { WebClient } from '@slack/web-api'
import { SLACK_OAUTH_TOKEN, BOT_STATUS_CHANNEL, BOT_HANDLE } from './constants'

const packageJson = require('../package.json')

const rtm = new RTMClient(SLACK_OAUTH_TOKEN)
const web = new WebClient(SLACK_OAUTH_TOKEN)

rtm.start()
  .catch(console.error)

rtm.on(
  'ready', 
  async () => {
    console.log('bot started')
    sendMessage(BOT_STATUS_CHANNEL, `Pretzel ${packageJson.version} is live !`)
  }
)

rtm.on(
  'slack_event', 
  async (eventType, event) => {
    if (event && event.type === 'message') {
        if (event.text === BOT_HANDLE) {
            helloBot(event.channel, event.user)
        }
    }
  }
)

function helloBot (channelId, userId) {
    sendMessage(channelId, `Ready for your next PR <@${userId}> ?`)
}

async function sendMessage(channel, message) {
    await web.chat.postMessage(
      {
        channel: channel,
        text: message,
      }
    )
}
