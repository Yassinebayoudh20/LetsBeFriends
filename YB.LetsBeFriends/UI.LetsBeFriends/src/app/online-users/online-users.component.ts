import { Component, Input, OnDestroy } from '@angular/core'
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog'
import { PrivateChatComponent } from '../private-chat/private-chat.component'

@Component({
    selector: 'app-online-users',
    templateUrl: './online-users.component.html',
    styleUrls: ['./online-users.component.scss'],
    providers: [DialogService],
})
export class OnlineUsersComponent implements OnDestroy {
    @Input() user!: string
    ref: DynamicDialogRef | undefined

    constructor(public dialogService: DialogService) {}

    openPrivateChat(to: string) {
        this.ref = this.dialogService.open(PrivateChatComponent, {
            data: {
                to: to,
            },
            header: 'Send a Message to ' + to,
            width: '70%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
        })
    }

    ngOnDestroy() {
        if (this.ref) {
            this.ref.close()
        }
    }
}
