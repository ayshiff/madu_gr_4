import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RequestUser = createParamDecorator(
  (data: string, ctx: any) => {
    const user = ctx.user;

    return data ? user && user[data] : user;
  },
);