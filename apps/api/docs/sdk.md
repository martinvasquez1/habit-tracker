# SDK

This project provides an SDK generated from the API specification created with Swagger (OpenAPI).

The SDK is automatically generated from the specification using the `typescript-axios` generator. It provides typed API clients for interacting with the backend service.

To generate it:

```bash
npm run sdk:generate
```

## Methods

This project uses the NestJS Swagger plugin to reduce the amount of boilerplate code required to define API documentation.

The plugin automatically generates the OpenAPI specification based on the controllers and decorators in the codebase.

By default, `operationId` values are generated using the pattern:

```bash
<controllerName><methodName>
```

For example:

```bash
usersControllerFindAll
```

This causes the generated SDK methods to have unnecessarily long names.

To improve SDK method naming, the  `operationId` field is used to define the method name.

Example:

```bash
getUser(...)
```

## Preprocessing

The generator uses a modified OpenAPI file in which all original tags are removed, and a single tag called Api is added. This ensures the generator creates a single class.

## env

Environment variables were defined for the OpenAPI file name and output SDK directory, but currently openapitools.json has hardcoded values