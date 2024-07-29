# Event Bus Implementation - Bus

## Overview

The Bus class provides a lightweight and flexible event bus implementation suitable for scenarios where you need to send and receive events and communicate between different components or modules without directly referencing each other. By using an event bus, you can improve the maintainability and extensibility of your code while keeping a good code organization structure.

## Create an event bus instance

First, you need to create an instance of the Bus class and keep the singleton mode:

```typescript
import { Bus } from "cat-tool";
const eventBus = new Bus();
```

## Register an event listener

Use the addEventListener method to register an event listener. You can optionally provide a unique fnKey to identify the listener so you can remove it later:

```typescript
eventBus.addEventListener("myEvent", (data) => {
  console.log("Event triggered with data:", data);
});

// Or use a custom key
eventBus.addEventListener(
  "myEvent",
  (data) => console.log("event:", data),
  "fnkey"
);
```

## Triggering an event

Use the emit method to emit an event and pass data to the listener:

```typescript
eventBus.emit("myEvent", { message: "Hello World!" });
```

## Removing an event listener

Use the removeEventListener method to remove a specific event listener, providing the event name and the listener's fnKey:

```typescript
eventBus.removeEventListener("myEvent", "customListenerKey");
```

## Remove all event listeners

Use the removeAllEventListener method to remove all listeners for a specific event:

```typescript
eventBus.removeAllEventListener("myEvent");
```

## Example

Here is a complete example showing how to use the Bus class:

```typescript
// eventBus.js
import { Bus } from "cat-tool";
export const eventBus = new Bus();
```

```js
import { eventBus } from "./eventBus.js";
// A module listens to registration time
eventBus.addEventListener("myEvent", (data) => {});
```

```js
import { eventBus } from "./eventBus.js";
// B module triggers events
eventBus.emit("myEvent", { message: "Hello World!" });
```
