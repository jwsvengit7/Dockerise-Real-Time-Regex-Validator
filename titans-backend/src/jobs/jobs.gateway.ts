/* eslint-disable prettier/prettier */
import {
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Server } from 'socket.io';
  import { JobStatusDto } from '../common/dto/request/job-status.dto';
  
  @WebSocketGateway({ cors: true })
  export class JobsGateway {
    @WebSocketServer()
    server: Server;
  
     broadcastStatus(statusDto: JobStatusDto) {
      this.server.emit('job-status', statusDto);
    }
  }
  