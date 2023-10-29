import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule } from '@angular/forms'

import { MenubarModule } from 'primeng/menubar'
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'
import { CardModule } from 'primeng/card'
import { ListboxModule } from 'primeng/listbox'
import { DynamicDialogModule } from 'primeng/dynamicdialog'

import { AppRoutingModule } from './app-routing.module'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component'
import { NavbarComponent } from './navbar/navbar.component'
import { FooterComponent } from './footer/footer.component'
import { HomeComponent } from './home/home.component'

import { ChatComponent } from './chat/chat.component'
import { ChatInputComponent } from './chat-input/chat-input.component'
import { MessageComponent } from './message/message.component'
import { PrivateChatComponent } from './private-chat/private-chat.component'
import { OnlineUsersComponent } from './online-users/online-users.component'

const PRIME_NG_MODULES = [MenubarModule, InputTextModule, ButtonModule, CardModule, ListboxModule, DynamicDialogModule]

@NgModule({
    declarations: [AppComponent, NavbarComponent, FooterComponent, HomeComponent, ChatComponent, ChatInputComponent, MessageComponent, PrivateChatComponent, OnlineUsersComponent],
    imports: [PRIME_NG_MODULES, BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
