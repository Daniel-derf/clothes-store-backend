import { NotFoundException } from '@nestjs/common';

export default function httpErrorHandler(error) {
  if (error.message.includes('not found')) {
    throw new NotFoundException(error.message);
  }
  throw error;
}
