import { Component } from '@angular/core'
import { ChatService } from '../services/ChatService'
import { DynamicDialogConfig } from 'primeng/dynamicdialog'

@Component({
    selector: 'app-private-chat',
    templateUrl: './private-chat.component.html',
    styleUrls: ['./private-chat.component.scss'],
})
export class PrivateChatComponent {
    to: string = ''

    constructor(public chatService: ChatService, private config: DynamicDialogConfig) {
        this.to = config.data.to
    }

    sendMessage(message: string) {
        this.chatService.sendPrivateMessage(this.to, message)
    }
}
