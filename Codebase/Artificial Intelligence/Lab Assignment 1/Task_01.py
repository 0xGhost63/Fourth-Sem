list1=[]
list2=[]
merged_list=[]

counter = 1

for i in range(5):
    temp = int(input(f"Enter the element # {counter} of the List # 01 : "))
    list1.append(temp)
    counter += 1

counter = 1
print("\n")

for i in range(5):
    temp=int(input(f"Enter the element # {counter} of the List # 02 : "))
    list2.append(temp)
    counter+=1

list1.sort()
list2.sort()

merged_list=list1+list2
merged_list.sort()

print(f"List # 01 after sorting becomes : {list1}")
print(f"List # 02 after sorting becomes : {list2}")

print("\nRESULTANT MERGED LIST IS:\n")

for element in merged_list:
    print(element)
  
