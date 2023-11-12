import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dmb-memlab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './memlab.component.html',
  styleUrls: ['./memlab.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemlabComponent {}
