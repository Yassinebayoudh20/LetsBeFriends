import { Injectable } from '@angular/core'

import { environment } from 'src/environments/environment'
import { User } from '../models/user'
import { HttpClient } from '@angular/common/http'
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import { ChatTriggerNames } from '../models/chat-trigger-names.enum'
import { Message } from '../models/message'

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    private readonly apiUrl = environment.apiUrl
    connectedUserName: string = ''
    chatConnection!: HubConnection
    onlineUsers: Array<string> = []
    chatData: Message[] = []
    privateMessages: Message[] = []
    privateMessageInitiate = false

    constructor(private http: HttpClient) {}

    registerUser(user: User) {
        return this.http.post(this.apiUrl + 'api/chat/register-user', user, { responseType: 'text' })
    }

    createChatConnection() {
        this.chatConnection = new HubConnectionBuilder().withUrl(`${this.apiUrl}hubs/chat`).withAutomaticReconnect().build()
        this.chatConnection?.start().catch((error) => console.log(error))

        this.chatConnection.on(ChatTriggerNames.USER_CONNECTED, () => {
            this.addUserConnectionId()
        })

        this.chatConnection.on(ChatTriggerNames.ONLINE_USERS, (onlineUsers) => {
            this.onlineUsers = [...onlineUsers]
        })

        this.chatConnection?.on(ChatTriggerNames.NEW_MESSAGE, (newMessage: Message) => {
            this.chatData = [...this.chatData, newMessage]
        })

        this.chatConnection?.on(ChatTriggerNames.OPEN_PRIVATE_CHAT, (newMessage: Message) => {
            this.privateMessages = [...this.privateMessages, newMessage]
            this.privateMessageInitiate = true
        })

        this.chatConnection?.on(ChatTriggerNames.CLOSE_PRIVATE_CHAT, (newMessage: Message) => {
            this.privateMessageInitiate = false
            this.privateMessages = []
        })
    }

    stopChatConnection() {
        this.chatConnection?.stop().catch((error) => console.log(error))
    }

    async sendMessage(message: string) {
        const messageDto: Message = {
            from: this.connectedUserName,
            message,
        }

        this.chatConnection?.invoke('ReceiveMessage', messageDto).catch((error) => console.log(error))
    }

    async addUserConnectionId() {
        return this.chatConnection?.invoke('AddUserConnectionId', this.connectedUserName).catch((error) => console.log(error))
    }

    async sendPrivateMessage(to: string, message: string) {
        const messageDto: Message = {
            from: this.connectedUserName,
            to : to,
            message,
        }

        if (!this.privateMessageInitiate) {
            this.privateMessageInitiate = true
            return this.chatConnection
                ?.invoke('CreatePrivateChat', messageDto)
                .then(() => {
                    this.privateMessages = [...this.privateMessages, messageDto]
                })
                .catch((error) => console.log(error))
        } else {
            return this.chatConnection?.invoke('ReceivePrivateMessage', messageDto).catch((error) => console.log(error))
        }
    }

    async closePrivatechatMessage(to: string) {
        this.chatConnection?.invoke('RemovePrivateChat', this.connectedUserName, to).catch((error) => console.log(error))
    }
}
