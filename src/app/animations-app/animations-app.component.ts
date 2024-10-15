import { Component, inject, Renderer2, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { animate, AnimationEvent, group, keyframes, query, state, style, transition, trigger } from '@angular/animations';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-animations-app',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavComponent],
  templateUrl: './animations-app.component.html',
  styleUrl: './animations-app.component.css',
  animations: [
    trigger('openClose', [
      state('closed', style({
        transform: 'translateX(-100%)',
        opacity: 0,
        visibility: 'hidden' // Hide when fully closed
      })),
      state('open', style({
        transform: 'translateX(0)',
        opacity: 1,
        visibility: 'visible' // Show when fully open
      })),
      transition('closed <=> open', [
        style({ visibility: 'visible' }), // Ensure visibility is set during animation
        animate('0.3s ease-in-out')
      ])
    ]),
    trigger('shake', [
      transition('false => true', [
        animate('0.6s', keyframes([
          style({transform: 'translateX(-5%)', offset: 0.1}),
          style({transform: 'translateX(5%)', offset: 0.3}),
          style({transform: 'translateX(-5%)', offset: 0.5}),
          style({transform: 'translateX(5%)', offset: 0.7}),
          style({transform: 'translateX(-5%)', offset: 0.9}),
          style({transform: 'translateX(0)', offset: 1}),
        ]))
      ])
    ])
  ]
})
export class AnimationsAppComponent  {
  renderer = inject(Renderer2);
  protected navState = signal('closed');
  protected shakeField = signal(false);

  form = new FormGroup({
    email: new FormControl<string>('', {validators: [Validators.required, Validators.email]}),
  })


  onMenuOpenClick() {
    if (this.navState() === 'open') {
      this.navState.set('closed');
      return;
    }

    this.navState.set('open');
  }

  onShakeStart(event: AnimationEvent) {
    if (event.fromState !== 'void') {
      this.renderer.addClass(event.element, 'invalid');
    }
  }

}
