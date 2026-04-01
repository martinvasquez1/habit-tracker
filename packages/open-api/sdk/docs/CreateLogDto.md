# CreateLogDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**status** | **string** | Status of the log entry. | [default to undefined]
**date** | **string** | Date of the log entry in &#x60;YYYY-MM-DD&#x60; format. Only the date portion is allowed; time will be ignored. | [default to undefined]
**note** | **string** | Optional note or comment for the log entry. | [optional] [default to undefined]

## Example

```typescript
import { CreateLogDto } from './api';

const instance: CreateLogDto = {
    status,
    date,
    note,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
