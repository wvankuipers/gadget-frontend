import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CapitalizeFirstPipe } from './pipes/capitalize.pipe';

@NgModule({
  declarations: [PageNotFoundComponent, CapitalizeFirstPipe],
  imports: [CommonModule, MatCardModule],
  exports: [CapitalizeFirstPipe],
})
export class SharedModule {}
