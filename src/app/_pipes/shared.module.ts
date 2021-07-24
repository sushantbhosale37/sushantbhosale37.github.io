import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatNumPipe } from './number-format.pipe';
import { CpInputDirective } from '../_directives/input-cp.directive';
import { SearchStringPipe } from './search-string.pipe';
import { SearchObjPipe } from './search-obj.pipe';
import {SearchObjColDefPipe} from './search-obj-colDef.pipe'

@NgModule({
  declarations: [
    FormatNumPipe,
    CpInputDirective,
    SearchStringPipe,
    SearchObjPipe,
    SearchObjColDefPipe
  ],
  imports: [CommonModule],
  exports: [FormatNumPipe, SearchStringPipe, SearchObjPipe, CpInputDirective,SearchObjColDefPipe]
})
export class SharedModule {}
