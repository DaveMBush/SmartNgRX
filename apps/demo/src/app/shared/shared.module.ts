import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTreeModule } from '@angular/material/tree';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { NodeEditorComponent } from './components/node-editor/node-editor.component';
import { TreeComponent } from './components/tree/tree.component';

@NgModule({
  declarations: [TreeComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    ScrollingModule,
    NodeEditorComponent,
    NgxSkeletonLoaderModule,
  ],
  providers: [],
  exports: [TreeComponent],
})
export class SharedModule {}
