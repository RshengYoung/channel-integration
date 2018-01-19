import { WechatClient } from './src'
import { WECHAT } from './config'

const wechat = new WechatClient(WECHAT)

wechat.uploadMedia("image", "https://storage.googleapis.com/paas-storage/3-2_dress.jpg")    
    .then(mediaId => {
        console.log(mediaId)
    })