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
