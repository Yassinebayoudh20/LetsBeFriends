import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ChatService } from '../services/ChatService'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    userForm: FormGroup = new FormGroup({})
    isSubmitted = false
    apiErrorMessages: Array<string> = []
    openChat = false

    constructor(private fb: FormBuilder, private chatService: ChatService) {}

    ngOnInit(): void {
        this.initializeForm()
    }

    initializeForm() {
        this.userForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
        })
    }

    submit() {
        this.isSubmitted = true
        this.apiErrorMessages = []
        if (this.userForm.valid) {
            this.chatService.registerUser(this.userForm.value).subscribe({
                next: () => {
                    this.chatService.connectedUserName = this.userForm.get('username')?.value
                    this.openChat = true
                    this.userForm.reset()
                    this.isSubmitted = false
                },
                error: (error) => {
                    if (typeof error.error !== 'object') {
                        this.apiErrorMessages.push(error.error)
                    }
                },
            })
        }
    }

    closeChat() {
        this.openChat = false
    }
}
