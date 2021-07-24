import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/_pipes/shared.module';
import { FormatNumPipe } from 'src/app/_pipes/number-format.pipe';
import { RouterModule } from '@angular/router';
import { UsefullResourcesAppRoutesAppRoutes } from './usefull-resources-app-routing.module';
import { UsefullResourcesAppComponent } from './usefull-resources-app.component';

@NgModule({
  declarations: [UsefullResourcesAppComponent],
  imports: [
    CommonModule,
    ButtonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(UsefullResourcesAppRoutesAppRoutes)
  ],
  providers: [FormatNumPipe]
})
export class UsefullResourcesAppRoutesAppModule { }
