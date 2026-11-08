tree = {
    'A': {'value': 10, 'children': ['B', 'C']},
    'B': {'value': 20, 'children': ['A', 'D']},
    'C': {'value': 25,  'children': ['A', 'E']},
    'D': {'value': 15, 'children': ['B', 'F']},
    'E': {'value': 30, 'children': ['C']},
    'F': {'value': 12, 'children': ['D']},
}

def hill_climbing(tree,start):
    current_node=start

    while True:

        children=tree[current_node]['children']

        if not children:
            return current_node
        else:
            best_children=max(children,key=lambda child:tree[child]['value'])

        if (tree[current_node]['value']>=tree[best_children]['value']):
            return current_node
        else :
            current_node=best_children

result = hill_climbing(tree, 'A')
print(f"Reached node with value: {tree[result]['value']} (Node: {result})")

        

        


