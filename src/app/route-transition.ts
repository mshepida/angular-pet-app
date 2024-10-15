import { transition, trigger, query, style, animate, group } from '@angular/animations';

export const routeTransition = trigger('routeTransition', [
  transition('* => *', [
    query(':enter, :leave', style({ position: 'absolute', width: '100%' }), { optional: true }),
    group([
      query(':leave', [
        animate('0.5s ease-out', style({ opacity: 0, transform: 'scale(0.9)' }))
      ], { optional: true }),

      query(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ], { optional: true })
    ])
  ])
]);
