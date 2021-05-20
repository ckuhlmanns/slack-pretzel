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
      
        let containsMessage
        if (event.text != undefined) { containsMessage = event.text.includes(BOT_HANDLE) } else { containsMessage = false }

        if (containsMessage) {
            console.debug(event)

            let channel = event.channel
            let user = event.user
            let ts
            if (event.thread_ts) { ts = event.thread_ts } else { ts = event.ts }
            
            botResponse(channel, user, ts)
        }
    }
  }
)

async function botResponse (channelId, userId, ts) {
    sendMessage(channelId, `<@${userId}> you are up! :troll:`, ts)
}

async function sendMessage(channel, message, ts) {
    await web.chat.postMessage(
      {
        channel: channel,
        text: message,
        thread_ts: ts,
        icon_emoji: ":pretzel:"
      }
    )
}
