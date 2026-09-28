
print ("LAB TASK # 2 , WEEK # 2")

temp=int(input("Enter the temp : "))
light=input("Enter the light level (low/high) : ")

### FOR FANNNN 
print("FAN CONTROL\n")
if temp>30 : 
  print("Temp greater than 30 received from sensor...turning ON the fan !")

else : 
  print("Temp less than 30 received from sensor...turning OFF the fan !")


### FOR LIGHT 
print("LIGHT CONTROL\n")
if light == "low":
  print ("Turning on the light,based on sensor input")

elif light == "high" :
  print ("Turning off the light,based on sensor input")

else :
  print("Invalid input")

print ("\nCURRENT STATUS : \n")
print(f"The current temperature as detected by the sensor is : {temp}")
print(f"The current light level as detected by the sensor is : {light}")

