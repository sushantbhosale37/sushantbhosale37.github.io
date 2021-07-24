import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';

import { FormsModule } from '@angular/forms';
import { BellIconComponent } from './bell-icon/bell-icon.component';

@NgModule({
  declarations: [ChatComponent, BellIconComponent],
  imports: [CommonModule, FormsModule],
  exports: [ChatComponent, BellIconComponent]
})
export class ChatModule {}
