import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core'
import { User } from '../models/user'
import { ChatService } from '../services/ChatService'

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
    @Output() closeChatEmitter = new EventEmitter()
    users: Array<User> = []

    constructor(public chatService: ChatService) {}

    ngOnDestroy(): void {
        this.chatService.stopChatConnection()
    }

    ngOnInit(): void {
        this.chatService.createChatConnection()
    }

    receivedMessage($event: string) {
        this.chatService.sendMessage($event)
    }

  

    backToHome() {
        this.closeChatEmitter.emit()
    }
}
