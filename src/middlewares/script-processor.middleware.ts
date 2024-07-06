import { envConstants } from '@app/config/constants';
import type { NestMiddleware } from '@nestjs/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as acorn from 'acorn';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as walk from 'acorn-walk';
import type { NextFunction, Request } from 'express';

@Injectable()
export class ScriptProcessorMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      this.validateJavaScriptInObject(req.body);
      this.validateJavaScriptInObject(req.query);
      this.validateJavaScriptInObject(req.params);
    } catch {
      throw new BadRequestException(
        envConstants.MiddlewareValidation.JS_INJECTION,
      );
    }

    next();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validateJavaScriptInObject(obj: any) {
    if (typeof obj === 'string') {
      if (this.containsScript(obj)) {
        throw new BadRequestException(
          envConstants.MiddlewareValidation.JS_INJECTION,
        );
      }
    } else if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          this.validateJavaScriptInObject(obj[key]);
        }
      }
    }
  }

  containsScript(script: string): boolean {
    try {
      const ast = acorn.parse(script, { ecmaVersion: 2020 });
      const allowedFunctions = new Set([
        'Math.abs',
        'String.prototype.trim',
      ]); // whitelist allowed functions
      const found: string[] = [];

      walk.simple(ast, {
        CallExpression: (node) => {
          if (node.callee.type === 'Identifier') {
            const functionName = node.callee.name;

            if (!allowedFunctions.has(functionName)) {
              found.push(functionName);
            }
          }
        },
      });

      return found.length > 0;
    } catch {
      return true;
    }
  }
}
