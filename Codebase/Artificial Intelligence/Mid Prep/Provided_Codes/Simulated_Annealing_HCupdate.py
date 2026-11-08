import random
import math
# Tree containing node values and their children
tree = {
    'A': {'value': 10, 'children': ['B', 'C']},
    'B': {'value': 20, 'children': ['A', 'D']},
    'C': {'value': 8,  'children': ['A', 'E']},
    'D': {'value': 15, 'children': ['B', 'F']},
    'E': {'value': 30, 'children': ['C']},
    'F': {'value': 12, 'children': ['D']}
}
def simulated_annealing(tree, start_node):
    current_node = start_node
    best_node = current_node
    temperature = 20.0
    cooling_rate = 0.995
    min_temperature = 0.01
    while temperature > min_temperature:
        # Choose a random neighboring node
        children = tree[current_node]['children']
        next_node = random.choice(children)
        # Calculate change in value
        current_value = tree[current_node]['value']
        next_value = tree[next_node]['value']
        delta = next_value - current_value
        
        # Accept better moves automatically
        # Sometimes accept worse moves too
        if delta > 0 or random.random() < math.exp(delta / temperature):
            current_node = next_node
        # Keep track of the best node encountered
        if tree[current_node]['value'] > tree[best_node]['value']:
            best_node = current_node
        # Gradually reduce temperature
        temperature *= cooling_rate
    return best_node
# Run the algorithm
result = simulated_annealing(tree, 'A')
print("Best node found:", result)
print("Best value:", tree[result]['value'])
