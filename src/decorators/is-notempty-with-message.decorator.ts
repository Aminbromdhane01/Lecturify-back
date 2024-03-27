import { envConstants } from '@app/config/constants';
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsNotEmptyWithMessage(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: envConstants.validationDecorators.IS_NOTEMPTY_WITH_MESSAGE_NAME,
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return typeof value === 'string' ? value.trim().length > 0 : value != null;
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} ` + envConstants.validationDecorators.IS_NOTEMPTY_MESSAGE;
                },
            },
        });
    };
}