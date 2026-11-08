'''
tree = {
    'A': {'value': 10, 'children': ['B', 'C', 'D']},
    'B': {'value': 20, 'children': []},
    'C': {'value': 30, 'children': ['E', 'F']},
    'D': {'value': 15, 'children': []},
    'E': {'value': 35, 'children': []},
    'F': {'value': 25, 'children': []}
}'''
# Create a simple tree using a dictionary
# Each node is represented by a key, and its children are in a list
# The node's value is stored with the key 'value'
tree = {
    'A': {'value': 10, 'children': ['B', 'C']},
    'B': {'value': 20, 'children': ['A', 'D']},
    'C': {'value': 25,  'children': ['A', 'E']},
    'D': {'value': 15, 'children': ['B', 'F']},
    'E': {'value': 30, 'children': ['C']},
    'F': {'value': 12, 'children': ['D']},
}
# Hill Climbing Algorithm
def hill_climbing(tree, start_node):
    current_node = start_node
    while True:
        # Get children of the current node
        children = tree[current_node]['children']
        if not children:
            return current_node  # No children, return the current node (local optimum)
        # Find the best child by comparing values
        best_child = max(children, key=lambda child: tree[child]['value'])
        
        # If the best child's value is less than or equal to the current node's value, stop
        if tree[best_child]['value'] <= tree[current_node]['value']:
            return current_node
      
        # Move to the best child
        current_node = best_child
# Perform hill climbing starting from the root node 'A'
result = hill_climbing(tree, 'A')
print(f"Reached node with value: {tree[result]['value']} (Node: {result})")

        

        