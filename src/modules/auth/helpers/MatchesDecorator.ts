import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

export function Match(otherPropertyName: string, validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'Match',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [otherPropertyName],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const otherPropertyValue = args.object[otherPropertyName];
                    return typeof value === 'string' && typeof otherPropertyValue === 'string' && value === otherPropertyValue;
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} and ${args.constraints[0]} do not match`;
                },
            },
        });
    };
}