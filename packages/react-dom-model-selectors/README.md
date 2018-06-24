- TODO: Only calculate when we need to? But is this wasting the loop? As only want to loop through once.

- When error warn that can only get elements with  {...selectors()} on them

- Handle not cases for each
- onlyIfSingle runs countIs(1) first

- exists - getNodeIDsFromSelector, check count is greater than 0
- countIs(number, checkNodes = false)
- - checkNodes = false - getNodeIDsFromSelector, nodeIDsBySelectorID, count matches (else warn can only check with selectors on)
- - checkNodes = true - getNodeIDsFromSelector, count matches
- hasClass(className, onlyIfSingle = true) - getNodeIDsFromSelector, classesByNodeID, check one of the nodes contains the className
- hasSelectorID(id, onlyIfSingle = true) - getNodeIDsFromSelector, selectorIDByNodeID, check one of the nodes contains the className
- propExists(propKey, onlyIfSingle = true) - getNodeIDsFromSelector, propsByNodeID, check one of the nodes has props with the key
- propEquals(propKey, val, onlyIfSingle = true) - getNodeIDsFromSelector, propsByNodeID, check one of the nodes has props with the key and val =
- stateEquals(stateKey, val, onlyIfSingle = true) - getNodeIDsFromSelector, stateByNodeID, check one of the nodes has state with the key and val =
- stateExists(stateKey, onlyIfSingle = true) - getNodeIDsFromSelector, stateByNodeID, check one of the nodes has state with the key
- textIs(text, onlyIfSingle = true) - getNodeIDsFromSelector, textByNodeID, one contains the text

- getProps(onlyIfSingleNode = true) - getNodeIDsFromSelector, propsByNodeID
- getChildren(onlyIfSingleNode = true) - getNodeIDsFromSelector, childrenNodeIDsByNodeID
- getType(onlyIfSingleNode = true) - getNodeIDsFromSelector, typeByNodeID
- getDOM - root export
- getState(onlyIfSingleNode = true) - getNodeIDsFromSelector, propsByNodeID
- getParent(onlyIfSingleNode = true) - getNodeIDsFromSelector, parentNodeIDByNodeID
- getTestID(onlyIfSingleNode = true) - getNodeIDsFromSelector, testIDByNodeID
- getSiblings(onlyIfSingleNode = true) - getNodeIDsFromSelector, siblingNodeIDsByNodeID
- get(selector) - run get starting at this node

- DOM
- {
-   propsByNodeID,
-   stateByNodeID,
-   nodeIDsByTestID,
-   nodeIDsBySelectorID,
-   nodeIDsByClasses,
-   nodeIDsByType,
-   textByNodeID,
-   allChildrenNodeIDsByNodeIDs, - Is this a good idea? - Maybe only do for complex queries
-   selectorIDByNodeID,
-   testIDByNodeID,
-   classesByNodeID,
-   typeByNodeID,
-   childrenNodeIDsByNodeID
-   parentNodeIDByNodeID
-   siblingNodeIDsByNodeID
- }

- helpers
- {
-   groupNodeIDsBySelectorID(nodeIDs, DOM),
-   getNodeIDsFromSelector(selector, DOM)
- }