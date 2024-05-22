Database + API Instructions
-------------------------------------

The database your frontend integrates with has the following structure:
 - A rocket (root node) is built from a tree of nodes. Each node has a name. The path of a node can be inferred from the name hierarchy (e.g. '/root/parent/child').
 - Child nodes have no name requirements, and there's no limit to their depth (i.e. '/root/parent/child/.../child-n').
 - Each node can have any number of children nodes and properties. A property is a key-value pair, where the key is a string and the value is a decimal number.

Create a data access class that supports the following behaviors and seed data. Entries 
with values are properties—others are nodes. See API Call Examples for reference of 
the backend service you’re mocking. **Again, please do not use a real database or 
backend service**

Behaviors
-------------------------------------

- Create a node with a specified parent
- Add a property on a specific node
- Return the subtree of nodes with their properties for a provided node path

Seed Data
-------------------------------------

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
