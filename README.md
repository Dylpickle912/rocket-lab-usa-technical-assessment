# Database + API Instructions

The database your frontend integrates with has the following structure:
 - A rocket (root node) is built from a tree of nodes. Each node has a name. The path of a node can be inferred from the name hierarchy (e.g. '/root/parent/child').
 - Child nodes have no name requirements, and there's no limit to their depth (i.e. '/root/parent/child/.../child-n').
 - Each node can have any number of children nodes and properties. A property is a key-value pair, where the key is a string and the value is a decimal number.

Create a data access class that supports the following behaviors and seed data. Entries 
with values are properties—others are nodes. See API Call Examples for reference of 
the backend service you’re mocking. **Again, please do not use a real database or 
backend service**

## Behaviors

- Create a node with a specified parent
- Add a property on a specific node
- Return the subtree of nodes with their properties for a provided node path

## Seed Data

 - "Rocket"
    - "Height": 18.000
    - "Mass": 12000.000
    - "Stage1"
        - "Engine1"
            - "Thrust": 9.493
            - "ISP": 12.156
        - "Engine2"
            - "Thrust": 9.413
            - "ISP": 11.632
        - "Engine3"
            - "Thrust": 9.899
            - "ISP": 12.551
    - "Stage2"
        - "Engine1"
            - "Thrust": 1.622
            - "ISP": 15.110


## Questions & Concerns

- When looking at the Seed Data, I noticed Stage1 and Stage2 are not encapsulated inside an array. Due to this, I am led to believe they are constant for each Rocket. However, looking at the second bullet point in the instructions, it is inferred that there are no requirements for how many children a parent can have and they can have any type. In this case, Stages[n] would not need to be encapsulated within an array.



# App Instructions

- Create a new Angular CLI project
- Setup a data access class (intended to mock a backend service) according to <strong>Database+API Instructions</strong>.

- Component A
   - Retrieve data from the data access class described in <strong>Database+API Instructions</strong>.
   - Should have an input box to enter a node path
   - On each keypress the component should query the API for a subtree matching that path. Inflight requests should be cancelled for new ones
   - Use Component B to render the returned subtree
 
- Component B
   - Should render a returned node tree structure and all properties
   - The label of a property should be GREEN if the value is greater than 10
   - Create a unit test to assert that the color of the Component B label behaves as required
 
   - Dialog
      - Use the Dialog component to make a reusable 'Confirm' box
      - Use the above technique to make a 'Delete' button with confirmation for each node (this does not need to be connected to the API)
    
   - Time Pipe
      - Create a pipe that renders how long ago it was since this item was created (e.g. 'created 1 hour ago').
      - Implement this pipe onto each item in the displayed tree
    

## Questions, Concerns, and Clarifications

 - Along with typing in the path to retrieve data, I decided to create a second search functionality that uses suggestions. It takes the current path and provides suggestions that shows the children of the last valid path in the input. For instance, if the input included `Stage1/Engine1/`, it would provide `['Thrust', 'ISP']` as potential suggestions. Also, if the input showed a current invalid path, for example `Stage1/en`, it will remove the last invalid piece to just create `Stage1` and provide suggestions that would be `['Engine1', 'Engine2', 'Engine3']`. These suggestions are clickable and are appended to the last valid path. For example, if the input was `Stage1/Engine1/` it would then turn into `Stage1/Engine1/Thrust` if Thrust was clicked of course. Alternatively, if the input is `Stage1/en` and `Engine3` is selected, it will return `Stage1/Engine3`
 


 ## Components

### RocketDataComponent (Component A)

**Overview**

The `RocketDataComponent` is designed to manage and display data from the `RocketService`. It includes functionalities for searching, displaying suggestions, and managing data related to search paths. It utilizes RxJS to handle search input debouncing and data updates efficiently. The template provides a UI for inputting search paths, viewing suggestions, and displaying the tree of data nodes.


**Functions**

 - Public Methods
   - `onSearchPathChanged(path: string)`
     - Updates the search input with the given path
   - `getData(path?: string)`
     - Fetches data from the `RocketService`'s `fetchRocketDetails()` for the given path
   - `onSuggestedSeleced(path: string)`
     - Appends the current search path input based on the suggested selection
   - `onRefreshData()`
     - Calls `initializeData()` with the current path to refresh the current data

 - Private Methods
   - `initializeData(path?: string)`
     - Retrieves the data from the `RocketService` using a given path
     - Sets the search suggestion results based on the current path
   - `_subscribeToSearch()`
     - Subscribes to the search input and debounces the value 200ms.
     - Retrieves the data from the `RocketService` based on the current path
     - Retrieves the search suggestions based on the current path
   - `getSearchTermFromPath()`
     - Gets the last segment of the current search path input and sends it into the `SuggestionsComponent` as the search term for the suggestion results bold pipe
   - `getSearchSuggestionResults()`
     - Retrieves the paths for all immediate children of the current path




### SuggestionsComponent

**Overview**

The `SuggestionsComponent` takes in all paths from the data structure that are immediate children of the current path. It utilizes the `ShavePathPipe` in the template to take the full path, compare it to the current valid path, and remove all unnecessary paths to only get the next immediate child. The component also takes in the current search input from the `RocketDataComponent` and utilizes the `BoldPipe` to bold letters in the results of the suggestions that match the search.


**Functions**

 - Public Methods
   - `onSuggestionSelected(path: string)`
     - Emits the selected path to the `RocketDataComponent` and appends it to the end of search input



### RocketDataNodeComponent (Component B)

**Overview**

The `RocketDataNodeComponent` represents a data node in a hierarchical structure. It provides functionalities for navigating, adding, deleting nodes, and displaying node details using recursive nested expansion panels. This component takes in an instance of a `DataNode` as one of its `Input()`s. Since the `DataNode` interface is recursive in itself, where it holds an optional `Children` property of type `DataNode[]`. Due to this, if there are existing children inside this `DataNode`, this component is recursively called inside its `ExpansionPanel` content. This provides the visual structure to look like a nested tree. Within this recursive functionality, we are provided a simple way to select the Key of any node and emit that up to our search input, thus, click navigation of the hierarchy is achieved. Along with displaying the data, as requested in the `Component B` instructions, an `ngClass` directive is added on the Key that adds the `.valueOverTen` class to change the color of the key's text to green. Also as instructed, this component contains a method to open the `AddNodeDialogComponent` to utilize the RocketService's ability to add Nodes and Properties to the current path. Another method is used to open the `ConfirmationDialogComponent` to utilize the RocketService's ability to delete node structures by passing in the current path upon confirmation.

**Functions**

 - Public Methods
   - `onNavigate()`
     - Emits the current path to the `RocketDataComponent` to display the desired data structure
   - `onOpenAddDialog()`
     - Opens a dialog that allows the user to add a new Node or Property to the current path
   - `onOpenDeleteDialog()`
     - Opens a dialog that allows the user to delete the current path

 - Private Methods
   - `onSaveData(result: DataNode)`
     - Determines whether to add a node or property based off whether `result.value` is undefined
   - `onAddNode(key: string)`
     - Calls the `RocketService`'s `addNode()` to add a new Node within the current path
   - `onAddProperty(property: DataNode)`
     - Calls the `RocketService`'s `addProperty()` to add a new Property within the current path
   - `onDeletePath()`
     - Calls the `RocketService`'s `deleteNode()` to remove the current path



### AddNodeDialogComponent

**Overview**

The `AddNodeDialogComponent` provides a `MatDialog` interface for adding a new Node or Property to the Rocket data structure. It allows the user to input a `Key` and an optional `Value`. From there, the user can decide to Cancel or Save their entry.  There is logic in the `DataService` for adding a Node or Property that will display a `window.alert()` notifying the user if the Key they inserted already exists on the current path. If it already exists, the method will abandon the POST.

**Functions**

- Public Methods
  - `onCancel()`
    - Closes the dialog without returning any data.
  - `onConfirm()`
    - Closes the dialog and returns a `DataNode` object



### ConfirmationDialogComponent

**Overview**

The `ConfirmationDialogComponent` provides a `MatDialog` interface for displaying a confirmation dialog with a customizable title, message, and action buttons. It allows the user to either confirm or cancel the action, returning a boolean value indicating the user's choice.

**Functions**

- Public Methods
  - `onCancel()`
    - Closes the dialog and returns `false`, indicating the user cancelled the action
  - `onConfirm()`
    - Closes the dialog and returns `true`, indicating the user confirmed the action



### ExpansionPanelComponent

**Overview**

The `ExpansionPanelComponent` is a custom Angular component that wraps Angular Material's `mat-expansion-panel`, providing additional functionality such as toggling expansion state and providing custom attribute directives to insert custom elements into the header or content sections using the `[expansionHeader]` and `[expansionContent]` directives




## Pipes

### BoldPathSuggestionPipe

**Overview**

The `BoldPathSuggestionPipe` is a custom Angular pipe designed to highlight search terms within a string by wrapping them in a `<span>` element with the class `.bold`. This is useful for visually emphasizing matching text in search results or suggestions.



### ShavePathsPipe

**Overview**

The `ShavePathsPipe` is a custom Angular pipe that processes an array of path suggestions to simplify and extract unique top-level paths based on the current path context. This is useful for providing concise and relevant path suggestions in hierarchical structures.



### TimeSinceCreationPipe

**Overview**

The `TimeSinceCreationPipe` is a custom Angular pipe that converts a date into a human-readable relative time format, indicating how long ago the date occurred.





# Instructions on How to Run Each Part of the Challenge

1. Viewing Rocket data in a visual hierarchy
   - This is automatically done upon page initialization. If a node has a child, it includes an expansion panel that can be navigated.
2. Searching for a node path
   - At the top of the screen, there is a light grey input box with the placeholder `Search for a node...`. Click that and begin typing to search for a node path. It will match exact paths, so it will show no results until an exact matching path is typed in. The suggestions on the right are helpful for finding the possible paths.
3. The label of a property should be GREEN if the value is greater than 10
   - This can be viewed within the content section of an expansion panel
4. View a reusable Confirmation Dialog component
   - Upon hovering over any node in the hierarchy, a Trash Can icon will appear.
   - Clicking this Trash Can will open a confirmation dialog.
5. View a Save Dialog component
   - Once again, upon hovering over any node in the hierarchy, a Plus icon will appear.
   - Clicking this Plus icon will open a new dialog with two inputs, one for a `Key` and one for an optional `Value`
6. View the Time Since Creation for a node
   - To the right of each node's `Key` in the visual hierarchy, text similar to `created 1 minute ago` can be seen.
   - To see this number change. Each time the list is refreshed, the time will recalculate. Some ways to refresh the list are as follows:
     - Change the value inside the path search input
     - Select one of the Suggested paths on the top right
     - Select the Key of any node in the hierarchy list
7. Run the unit test to assert that the color of the Component B label behaves as required
   - There are two methods to achieve this:
     - In the terminal, run `ng test` and the tests will run, including the one checking color of the Key
     - In the file structure, navigate to `src/app/rocket-data/rocket-data-node/rocket-data.node.component.spec.ts`
       - Once inside this file, right click the `RocketDataNodeComponent` description function and select `Run 'RocketDataNodeComponent'`
       - Navigate down to line 36 on the `Check Data Value` description function and either right click and select `Run 'Check Data Value'` or select the green arrow to the left and run it that way
