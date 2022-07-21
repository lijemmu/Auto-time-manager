from datetime import datetime, timedelta

# call <className>.FinalizedSchedule() to get generated schedule

class ScheduleGenerator:
    def __init__(self, startTime, endTime, margin, year, month, day, sch,
                 task):
        self.startTime = startTime
        self.endTime = endTime
        self.margin = margin
        self.year = year
        self.month = month
        self.day = day
        self.sch = sch
        self.task = task
        self.total_duration = 0
        self.minutified = []
        self.free_slots_array = []
        self.ready_tasks = []

    def calculate_duration(self):
        format = '%H:%M:%S'
        t1 = datetime.strptime(self.startTime + ':00', format)
        t2 = datetime.strptime(self.endTime + ':00', format)
        self.total_duration = (int((t2 - t1).total_seconds() / 60))


    def turn_to_min(self):
        format = '%H:%M:%S'
        t1 = datetime.strptime('08:00:00', format)

        for x in self.sch.keys():
            t2 = self.sch[x]["start"] + ':00'
            t2_formated = datetime.strptime(t2, format)
            time = (t2_formated - t1).total_seconds() / 60
            self.minutified.append(int(time))

            t2 = self.sch[x]["end"] + ':00'
            t2_formated = datetime.strptime(t2, format)
            time = (t2_formated - t1).total_seconds() / 60
            self.minutified.append(int(time))

    def create_free_slots_array(self):
        i = 0
        x = 0
        while x < len(self.minutified) - 1:
            p = self.preference(self.minutified[x])
            self.free_slots_array.append(
                [i, self.minutified[x], self.minutified[x] - i, p, 0])
            i = self.minutified[x + 1]
            x += 2
        self.free_slots_array.append(
            [i, self.total_duration, self.total_duration - i, 'e', 0])

    # Helper function for create_free_slots_array
    def preference(self, time):
        updated_time = self.calculate_preference(time)
        if (updated_time < "12:00:00"):
            return ("m")
        elif (updated_time < "18:00:00"):
            return ("a")
        else:
            return ("e")

    # Helper function for preference
    def calculate_preference(self, min):
        format = '%H:%M:%S'
        t1 = datetime.strptime(self.startTime + ':00',
                               format) + timedelta(minutes=min)
        t2 = str(t1.hour) + ":" + str(t1.minute) + ":" + str(t1.second) + ""
        return (t2)

    def schedule(self):
        # schedule morning tasks
        for k, v in list(self.task.items()):
            # find tasks with morning preferece
            if len(v) > 1 and v[1] == 'm':

                #find a slot in free time
                for i in self.free_slots_array:
                    if int(i[2]) > v[0]:
                        task_name = str(k)
                        duration = v[0]
                        self.api_ready_task(
                            task_name, duration, i[0] +
                            self.margin)  #taskname, duration, start_time

                        # modify free time slots
                        i[0] = i[0] + duration + self.margin
                        i[2] = i[1] - i[0]
                        i[4] = i[4] + 1

                        # remove task from task dict
                        del self.task[k]
                        break
            else:
                #find a slot in free time
                spots = self.airy_slots()
                for i in spots:
                    if int(self.free_slots_array[i][2]) > v[0]:
                        task_name = str(k)
                        duration = v[0]
                        self.api_ready_task(
                            task_name, duration, self.free_slots_array[i][0] +
                            self.margin)  #taskname, duration, start_time

                        # modify free time slots
                        self.free_slots_array[i][0] = self.free_slots_array[i][
                            0] + duration + self.margin
                        self.free_slots_array[i][2] = self.free_slots_array[i][
                            1] - self.free_slots_array[i][0]
                        self.free_slots_array[i][
                            4] = self.free_slots_array[i][4] + 1
                        # remove task from task dict
                        del self.task[k]
                        spots = self.airy_slots()
                        break

    # Helper for schedule method
    def airy_slots(self):
        a = []
        for i in range(len(self.free_slots_array)):
            a.append([i, self.free_slots_array[i][4]])

        a.sort(key=lambda x: x[1])

        b = []

        for i in a:
            b.append(i[0])

        return (b)

    # Generates api ready list
    def api_ready_task(self, task_name, duration, task_start_time):

        times = self.calculate_time(task_start_time, duration)
        end = times[0]
        start = times[1]
        summary = task_name
        timezone = "America/New_York"
        colorId = "10"
        self.ready_tasks.append([end, start, timezone, summary, colorId])

    # Helper method for api_ready_task
    def calculate_time(self, task_start_time, duration):
        # pass
        format = '%H:%M:%S'
        start = datetime.strptime(self.startTime + ':00',
                                  format) + timedelta(minutes=task_start_time)
        start = start.replace(year=self.year, month=self.month, day=self.day)

        end = start + timedelta(minutes=duration)

        start = start.strftime('%Y-%m-%d') + "T" + start.strftime(
            '%H:%M:%S') + "-04:00"

        end = end.strftime('%Y-%m-%d') + "T" + end.strftime(
            '%H:%M:%S') + "-04:00"
        return ([end, start])

    # kind of like a driver
    def FinalizedSchedule(self):
        self.calculate_duration()  # to calculate duration
        self.turn_to_min()  # to create an array of occupied times
        self.create_free_slots_array()  # to create an array of the free slots
        self.schedule()  # to generate
        return (self.ready_tasks)