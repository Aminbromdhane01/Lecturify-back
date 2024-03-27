import { envConstants } from '@app/config/constants';
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsStringWithMessage(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: envConstants.validationDecorators.IS_STRING_WITH_MESSAGE_NAME,
            target: object.constructor,
            propertyName: propertyName,
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
                    return `${args.property} ` + envConstants.validationDecorators.IS_STRING_MESSAGE;
                },
            },
        });
    };
}
