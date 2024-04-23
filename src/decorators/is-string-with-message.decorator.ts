import { envConstants } from '@app/config/constants';
import type {
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { registerDecorator } from 'class-validator';

export function IsStringWithMessage(
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: envConstants.validationDecorators.IS_STRING_WITH_MESSAGE_NAME,
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') {
            return false;
          }

          return true;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} ${envConstants.validationDecorators.IS_STRING_MESSAGE}`;
        },
      },
    });
  };
}
