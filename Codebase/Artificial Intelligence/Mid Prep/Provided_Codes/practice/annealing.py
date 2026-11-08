import random
import math

tree = {
    'A': {'value': 10, 'children': ['B', 'C']},
    'B': {'value': 20, 'children': ['A', 'D']},
    'C': {'value': 8,  'children': ['A', 'E']},
    'D': {'value': 15, 'children': ['B', 'F']},
    'E': {'value': 30, 'children': ['C']},
    'F': {'value': 12, 'children': ['D']}
}

def simulated_annealing(tree,start):
    current_node=start
    best_node=start
    temperature=20
    min_temperature=0.01
    cooling_rate=0.995

    while temperature > min_temperature:

        #CHILDRENS
        children=tree[current_node]['children']
        next_node=random.choice(children)

        # DELTA
        current_value=tree[current_node]['value']
        next_value=tree[next_node]['value']
        delta=next_value-current_value

        if 0>delta or random.random() < math.exp(delta/temperature):
            current_node=next_node

        if (tree[current_node]['value']>=tree[best_node]['value']):
            best_node=current_node

        temperature*=cooling_rate

        return best_node

# Run the algorithm
result = simulated_annealing(tree, 'A')
print("Best node found:", result)
print("Best value:", tree[result]['value'])



