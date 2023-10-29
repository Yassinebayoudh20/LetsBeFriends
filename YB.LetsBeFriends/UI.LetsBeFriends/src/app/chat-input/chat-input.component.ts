import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'app-chat-input',
    templateUrl: './chat-input.component.html',
    styleUrls: ['./chat-input.component.scss'],
})
export class ChatInputComponent implements OnInit {
    form!: FormGroup
    @Output() messageEmitter = new EventEmitter()

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            message: ['', Validators.required],
        })
    }

    submit() {
        if (this.form.valid) {
            this.messageEmitter.emit(this.form.get('message')?.value)
            this.form.reset()
        }
    }
}
