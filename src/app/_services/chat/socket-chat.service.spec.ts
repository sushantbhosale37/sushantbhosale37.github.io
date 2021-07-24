import { TestBed } from '@angular/core/testing';

import { SocketChatService } from './socket-chat.service';

describe('SocketChatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SocketChatService = TestBed.get(SocketChatService);
    expect(service).toBeTruthy();
  });
});
