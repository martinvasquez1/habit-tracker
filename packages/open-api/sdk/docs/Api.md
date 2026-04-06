# Api

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**appControllerGetHello**](#appcontrollergethello) | **GET** / | |
|[**createHabit**](#createhabit) | **POST** /habits | |
|[**createLog**](#createlog) | **POST** /habits/{habitId}/logs | |
|[**deleteHabit**](#deletehabit) | **DELETE** /habits/{id} | |
|[**deleteLog**](#deletelog) | **DELETE** /habits/{habitId}/logs/{logId} | |
|[**deleteUser**](#deleteuser) | **DELETE** /users/{id} | |
|[**getHabit**](#gethabit) | **GET** /habits/{id} | |
|[**getHabitStats**](#gethabitstats) | **GET** /habits/{id}/stats | Retrieves statistics for a specific habit.|
|[**getHabits**](#gethabits) | **GET** /habits | |
|[**getHabitsWithLogs**](#gethabitswithlogs) | **GET** /habits/logs | Retrieves all habits along with their logs and current streak for a specific date range.|
|[**getLog**](#getlog) | **GET** /habits/{habitId}/logs/{logId} | |
|[**getLogs**](#getlogs) | **GET** /habits/{habitId}/logs | Retrieves logs for a specific habit.|
|[**getUser**](#getuser) | **GET** /users/{id} | |
|[**getUsers**](#getusers) | **GET** /users | |
|[**signIn**](#signin) | **POST** /auth/sign-in | |
|[**signUp**](#signup) | **POST** /auth/sign-up | |
|[**signUpAdmin**](#signupadmin) | **POST** /auth/sign-up/admin | |
|[**updateHabit**](#updatehabit) | **PATCH** /habits/{id} | |
|[**updateLog**](#updatelog) | **PATCH** /habits/{habitId}/logs/{logId} | |
|[**updateUser**](#updateuser) | **PATCH** /users/{id} | |

# **appControllerGetHello**
> string appControllerGetHello()


### Example

```typescript
import {
    Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new Api(configuration);

const { status, data } = await apiInstance.appControllerGetHello();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createHabit**
> Habit createHabit(createHabitDto)


### Example

```typescript
import {
    Api,
    Configuration,
    CreateHabitDto
} from './api';

const configuration = new Configuration();
const apiInstance = new Api(configuration);

let createHabitDto: CreateHabitDto; //

const { status, data } = await apiInstance.createHabit(
    createHabitDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createHabitDto** | **CreateHabitDto**|  | |


### Return type

**Habit**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createLog**
> Log createLog(createLogDto)


### Example

```typescript
import {
    Api,
    Configuration,
    CreateLogDto
} from './api';

const configuration = new Configuration();
const apiInstance = new Api(configuration);

let habitId: number; // (default to undefined)
let createLogDto: CreateLogDto; //

const { status, data } = await apiInstance.createLog(
    habitId,
    createLogDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createLogDto** | **CreateLogDto**|  | |
| **habitId** | [**number**] |  | defaults to undefined|


### Return type

**Log**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteHabit**
> Habit deleteHabit()


### Example

```typescript
import {
    Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new Api(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.deleteHabit(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**Habit**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteLog**
> Log deleteLog()


### Example

```typescript
import {
    Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new Api(configuration);

let habitId: number; // (default to undefined)
let logId: number; // (default to undefined)

const { status, data } = await apiInstance.deleteLog(
    habitId,
    logId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **habitId** | [**number**] |  | defaults to undefined|
| **logId** | [**number**] |  | defaults to undefined|


### Return type

**Log**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteUser**
> User deleteUser()


### Example

```typescript
import {
    Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new Api(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.deleteUser(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**User**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getHabit**
> Habit getHabit()


### Example

```typescript
import {
    Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new Api(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.getHabit(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**Habit**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getHabitStats**
> GetStatsResponseDto getHabitStats()

The `currentDate` query parameter must be a **string representing the user\'s local date** in `YYYY-MM-DD` format.

### Example

```typescript
import {
    Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new Api(configuration);

let id: number; // (default to undefined)
let currentDate: string; //The current date for which the streak should be calculated. Must be a string in `YYYY-MM-DD` format. (default to undefined)

const { status, data } = await apiInstance.getHabitStats(
    id,
    currentDate
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|
| **currentDate** | [**string**] | The current date for which the streak should be calculated. Must be a string in &#x60;YYYY-MM-DD&#x60; format. | defaults to undefined|


### Return type

**GetStatsResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getHabits**
> Array<Habit> getHabits()


### Example

```typescript
import {
    Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new Api(configuration);

const { status, data } = await apiInstance.getHabits();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<Habit>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getHabitsWithLogs**
> Array<HabitWithStreak> getHabitsWithLogs()

The date query parameters must be provided as **strings in the user\'s local date** using the `YYYY-MM-DD` format (ISO local date without time).

### Example

```typescript
import {
    Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new Api(configuration);

let startDate: string; //Start date of the requested range. Must be a string representing the user\'s local date in `YYYY-MM-DD` format. (default to undefined)
let endDate: string; //End date of the requested range. Must be a string representing the user\'s local date in `YYYY-MM-DD` format. (default to undefined)
let currentDate: string; //Current date in the user\'s local timezone. Must be a string representing the user\'s local date in `YYYY-MM-DD` format. (default to undefined)

const { status, data } = await apiInstance.getHabitsWithLogs(
    startDate,
    endDate,
    currentDate
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **startDate** | [**string**] | Start date of the requested range. Must be a string representing the user\&#39;s local date in &#x60;YYYY-MM-DD&#x60; format. | defaults to undefined|
| **endDate** | [**string**] | End date of the requested range. Must be a string representing the user\&#39;s local date in &#x60;YYYY-MM-DD&#x60; format. | defaults to undefined|
| **currentDate** | [**string**] | Current date in the user\&#39;s local timezone. Must be a string representing the user\&#39;s local date in &#x60;YYYY-MM-DD&#x60; format. | defaults to undefined|


### Return type

**Array<HabitWithStreak>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getLog**
> Log getLog()


### Example

```typescript
import {
    Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new Api(configuration);

let habitId: number; // (default to undefined)
let logId: number; // (default to undefined)

const { status, data } = await apiInstance.getLog(
    habitId,
    logId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **habitId** | [**number**] |  | defaults to undefined|
| **logId** | [**number**] |  | defaults to undefined|


### Return type

**Log**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getLogs**
> Array<Log> getLogs()

Optionally filters logs using a date range. The `startDate` and `endDate` query parameters must be **strings representing the user\'s local date** in `YYYY-MM-DD` format.

### Example

```typescript
import {
    Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new Api(configuration);

let habitId: number; // (default to undefined)
let startDate: string; //Start date of the range filter. Must be a string in `YYYY-MM-DD` format. (default to undefined)
let endDate: string; //End date of the range filter. Must be a string in `YYYY-MM-DD` format. (default to undefined)

const { status, data } = await apiInstance.getLogs(
    habitId,
    startDate,
    endDate
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **habitId** | [**number**] |  | defaults to undefined|
| **startDate** | [**string**] | Start date of the range filter. Must be a string in &#x60;YYYY-MM-DD&#x60; format. | defaults to undefined|
| **endDate** | [**string**] | End date of the range filter. Must be a string in &#x60;YYYY-MM-DD&#x60; format. | defaults to undefined|


### Return type

**Array<Log>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getUser**
> User getUser()


### Example

```typescript
import {
    Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new Api(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.getUser(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**User**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getUsers**
> getUsers()


### Example

```typescript
import {
    Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new Api(configuration);

let page: number; // (optional) (default to undefined)
let limit: number; // (optional) (default to undefined)
let filter: object; // (optional) (default to undefined)

const { status, data } = await apiInstance.getUsers(
    page,
    limit,
    filter
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] |  | (optional) defaults to undefined|
| **limit** | [**number**] |  | (optional) defaults to undefined|
| **filter** | **object** |  | (optional) defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **signIn**
> SignInResponseDto signIn(signInDto)


### Example

```typescript
import {
    Api,
    Configuration,
    SignInDto
} from './api';

const configuration = new Configuration();
const apiInstance = new Api(configuration);

let signInDto: SignInDto; //

const { status, data } = await apiInstance.signIn(
    signInDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **signInDto** | **SignInDto**|  | |


### Return type

**SignInResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **signUp**
> SignUpResponseDto signUp(signUpDto)


### Example

```typescript
import {
    Api,
    Configuration,
    SignUpDto
} from './api';

const configuration = new Configuration();
const apiInstance = new Api(configuration);

let signUpDto: SignUpDto; //

const { status, data } = await apiInstance.signUp(
    signUpDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **signUpDto** | **SignUpDto**|  | |


### Return type

**SignUpResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |
|**400** | Invalid request data |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **signUpAdmin**
> SignUpResponseDto signUpAdmin(signUpDto)


### Example

```typescript
import {
    Api,
    Configuration,
    SignUpDto
} from './api';

const configuration = new Configuration();
const apiInstance = new Api(configuration);

let signUpDto: SignUpDto; //

const { status, data } = await apiInstance.signUpAdmin(
    signUpDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **signUpDto** | **SignUpDto**|  | |


### Return type

**SignUpResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateHabit**
> Habit updateHabit(updateHabitDto)


### Example

```typescript
import {
    Api,
    Configuration,
    UpdateHabitDto
} from './api';

const configuration = new Configuration();
const apiInstance = new Api(configuration);

let id: string; // (default to undefined)
let updateHabitDto: UpdateHabitDto; //

const { status, data } = await apiInstance.updateHabit(
    id,
    updateHabitDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateHabitDto** | **UpdateHabitDto**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**Habit**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateLog**
> Log updateLog(updateLogDto)


### Example

```typescript
import {
    Api,
    Configuration,
    UpdateLogDto
} from './api';

const configuration = new Configuration();
const apiInstance = new Api(configuration);

let habitId: number; // (default to undefined)
let logId: number; // (default to undefined)
let updateLogDto: UpdateLogDto; //

const { status, data } = await apiInstance.updateLog(
    habitId,
    logId,
    updateLogDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateLogDto** | **UpdateLogDto**|  | |
| **habitId** | [**number**] |  | defaults to undefined|
| **logId** | [**number**] |  | defaults to undefined|


### Return type

**Log**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateUser**
> UpdateUserResponse updateUser(updateUserDto)


### Example

```typescript
import {
    Api,
    Configuration,
    UpdateUserDto
} from './api';

const configuration = new Configuration();
const apiInstance = new Api(configuration);

let id: number; // (default to undefined)
let updateUserDto: UpdateUserDto; //

const { status, data } = await apiInstance.updateUser(
    id,
    updateUserDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateUserDto** | **UpdateUserDto**|  | |
| **id** | [**number**] |  | defaults to undefined|


### Return type

**UpdateUserResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

