import { ThrottlerGuard } from "@nestjs/throttler";
import { GqlExecutionContext } from "@nestjs/graphql";
import { ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class GqlThrottlerGuard extends ThrottlerGuard {
  getRequestResponse(context: ExecutionContext) {
    const gqlCtx = GqlExecutionContext.create(context);
    const ctx = gqlCtx.getContext();
    
    // Check if we have proper HTTP context
    if (ctx.req && ctx.res) {
      return { req: ctx.req, res: ctx.res };
    }
    
    // Fallback for cases where GraphQL context doesn't have req/res
    // This handles cases like direct GraphQL calls or missing context
    return { req: null, res: null };
  }

  // Override to handle cases where req/res might be null
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { req, res } = this.getRequestResponse(context);
    
    // If we don't have proper HTTP context, skip throttling
    if (!req || !res) {
      return true;
    }
    
    return super.canActivate(context);
  }
}