from datetime import datetime, timedelta

startTime = '08:00'
endTime =  '23:00'

margin = 10

year = 2022
month = 7
day = 20

ready_tasks=[]
  
def calc_duration(s, e):
  format = '%H:%M:%S'
  t1 = datetime.strptime(s+':00', format)
  t2 = datetime.strptime(e+':00', format)
  return (int((t2-t1).total_seconds() / 60))

def print_dict(a):
  for k,v in a.items():
    print(k, v)

total_duration = calc_duration(startTime, endTime)


# a dict that would get sent from user
sch = {
  "bio" : {"start": '10:00',
           "end": '11:00'},
  "lunch": {"start" : '13:00',
            "end" : '14:00'},
  "meeting": {"start": '15:00',
             "end": '15:45'},
  "CS250": {"start": '16:00',
            "end": '17:15'},
  "dinner": {"start": '19:00',
            "end": '20:00'}
}

task = {
  "run": [30, "m"],
  "read": [15, "m"],
  "work on project": [30],
  "study": [45],
  "Do Hw": [120],
  "laundary": [40],
  "test": [15]

}

# An array that will hold the converted values
minutified = []


# To store the free slots available
free_slots={}
free_slots_array=[]




def turn_to_min():
  format = '%H:%M:%S'
  t1 = datetime.strptime('08:00:00', format)
  
  for x in sch.keys():
    t2 = sch[x]["start"]+':00'
    t2_formated = datetime.strptime(t2, format)
    time = (t2_formated-t1).total_seconds() / 60
    minutified.append(int(time))

    t2 = sch[x]["end"]+':00'
    t2_formated = datetime.strptime(t2, format)
    time = (t2_formated-t1).total_seconds() / 60
    minutified.append(int(time))







# print(minutified)

def create_free_slots():
  i = 0
  x = 0
  while x < len(minutified)-1:
    p = preference(minutified[x])
    free_slots[(i, minutified[x])] = [minutified[x]-i, p]
    i = minutified[x+1]
    x += 2
  free_slots[(i, total_duration)] = [total_duration-i, 'e']







def create_free_slots_array():
  i = margin
  x = 0
  while x < len(minutified)-1:
    p = preference(minutified[x])
    free_slots_array.append([i, minutified[x], minutified[x]-i, p, 0])
    i = minutified[x+1]
    x += 2
  free_slots_array.append([i, total_duration, total_duration-i, 'e', 0])




def preference(time):
  updated_time = calculate_preference(time)
  if(updated_time < "12:00:00"):
    return("m")
  elif(updated_time < "18:00:00"):
    return("a")
  else:
    return("e")





def calculate_preference(min):
  format = '%H:%M:%S'
  t1 = datetime.strptime(startTime+':00', format) + timedelta(minutes=min)
  t2 = str(t1.hour) + ":"+str(t1.minute)+":"+str(t1.second)+""
  # print(t1)
  return(t2)
  # return(t1)





def schedule():
  # pass
  # schedule morning tasks
  for k,v in list(task.items()):
    # find tasks with morning preferece 
    if len(v) > 1 and v[1] == 'm':

      #find a slot in free time
        for i in free_slots_array:
          if int(i[2]) > v[0]:
            task_name = str(k)
            duration = v[0]
            api_ready_task(task_name, duration, i[0]) #taskname, duration, start_time

            # modify free time slots
            i[0] = i[0] + duration + margin
            i[2] = i[1] - i[0]
            i[4] = i[4] + 1

            # remove task from task dict
            del task[k]
            break
    else:
      #find a slot in free time
        spots = airy_slots()
        for i in spots:
          if int(free_slots_array[i][2]) > v[0]:
            task_name = str(k)
            duration = v[0]
            api_ready_task(task_name, duration, free_slots_array[i][0]) #taskname, duration, start_time

            # modify free time slots
            free_slots_array[i][0] = free_slots_array[i][0] + duration + margin
            free_slots_array[i][2] = free_slots_array[i][1] - free_slots_array[i][0]
            free_slots_array[i][4] = free_slots_array[i][4] + 1
            # remove task from task dict
            del task[k]
            spots = airy_slots()
            break

      

def airy_slots():
  a = []
  for i in range(len(free_slots_array)):
    a.append([i, free_slots_array[i][4]])

  print(a)
  a.sort(key=lambda x: x[1])
  
  b = []

  
  for i in a:
    b.append(i[0])
  
  print(b)
  print("")    
  return(b)

def api_ready_task(task_name, duration, task_start_time):
  
  times = calculate_time(task_start_time, duration)
  end = times[0]
  start = times[1]
  summary = task_name
  timezone = "America/New_York"
  colorId = "10"
  ready_tasks.append([end, start, timezone, summary, colorId])


  

def calculate_time(task_start_time, duration):
  # pass
  format = '%H:%M:%S'
  start = datetime.strptime(startTime+':00', format) + timedelta(minutes=task_start_time)
  start = start.replace(year=year, month=month, day=day)

  end = start + timedelta(minutes=duration)


  start = start.strftime('%Y-%m-%d')+"T"+start.strftime('%H:%M:%S')+"-04:00"

  end = end.strftime('%Y-%m-%d')+"T"+end.strftime('%H:%M:%S')+"-04:00"
  return ([end, start])
  
  
  


def main():
  turn_to_min()
  create_free_slots()
  create_free_slots_array()

  schedule()
  print(free_slots_array)
  print("")
  for i in ready_tasks:
    print(i)
    print("")

if __name__ == "__main__":
    main()
