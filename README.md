# `react-create-dialog-context`

The Confirmation Dialog Context is a utility for managing and displaying confirmation dialogs within your React application. It provides a context and hook for creating, opening, and handling user interactions with confirmation dialogs.

## Features

- **State sharing across components**: It provides a mechanism to share state across multiple components without prop drilling, which is especially useful in larger applications where state needs to be accessible in deeply nested components.

- **Efficient re-rendering**: Only the components dependent on a certain piece of state are re-rendered when that state changes, improving the efficiency of your React application.

- **Encapsulation of state logic**: The state logic is encapsulated within the context, which makes the components easier to test and reason about.

- **Type Safety**: It ensures type safety with TypeScript, improving the developer experience and reducing runtime errors.

## Installation

You can add React Snapshot Context Provider to your project using npm:

```bash
npm install react-create-dialog-context
```


## How to use

1. Create your confirmation dialog

```jsx
import React, { type FC } from 'react';

type Props = {
  message: string,
  onConfirm: () => void,
  onDismiss: () => void,
};

const MyConfirmationModal: FC<Props> = ({ message, onConfirm, onDismiss }) => {
  return (
    <dialog open={isOpen}>
      <div>
        <h2>Confirmation Dialog</h2>
        <p>{message}</p>
        <div>
          <button onClick={onConfirm}>Confirm</button>
          <button onClick={onDismiss}>Cancel</button>
        </div>
      </div>
    </dialog>
  );
};

export default ConfirmationDialog;
```

2. Import the necessary components and types:

```jsx
import { createConfirmationDialogContext, useOpenConfirmationDialog } from './confirmationDialogContext';
```

3. Create a confirmation dialog context by calling the createConfirmationDialogContext function and passing your custom modal component as an argument:

```jsx
const ConfirmationDialog = createConfirmationDialogContext(MyConfirmationModal);
```

4. Use the confirmation dialog context in your components by calling the useOpenConfirmationDialog hook:

```jsx
const MyComponent = () => {
  const openConfirmationModal = useOpenConfirmationDialog(ConfirmationDialog);

  const handleConfirmation = useCallback(() => {
    openConfirmationModal({ message: 'Are you sure?' })
      .onConfirm(() => {
        // User confirmed
        console.log('Confirmed');
      })
      .onDismiss(() => {
        // User dismissed
        console.log('Dismissed');
      });
  }, [openConfirmationModal]);

  return (
    <div>
      <button onClick={handleConfirmation}>Open Confirmation Dialog</button>
    </div>
  );
};
```

5. Render the confirmation dialog component within your application:

```jsx
<ConfirmationDialog.Provider>
  <MyComponent />
</ConfirmationDialog.Provider>
```

## Contributions

Like us? [Star](https://github.com/tdurnford/react-create-dialog-context/stargazers) us.

Want to make it better? [File](https://github.com/tdurnford/react-create-dialog-context/issues) us an issue.

Don't like something you see? [Submit](https://github.com/tdurnford/react-create-dialog-context/pulls) a pull request.
