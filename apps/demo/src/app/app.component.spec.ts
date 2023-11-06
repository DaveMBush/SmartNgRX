import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('testing 123', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
    });
  });

  it('should be true', () => {
    expect(true).toBe(true);
  });
});
