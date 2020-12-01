const inputReader = require('../utilities/inputReaderUtility');
const inputPath = 'input/4.txt';

const input = inputReader.getLines(inputPath);

// Parse the data
const parseActivity = line => {
    const matchingGroups = line.match(/\[(\d+)-(\d+)-(\d+) (\d+):(\d+)\] (.*)/);
   
    const timestamp = new Date(matchingGroups[1], matchingGroups[2], matchingGroups[3], matchingGroups[4], matchingGroups[5]);
    const activity = matchingGroups[6];
    const guardActivity = activity.match(/Guard #(\d+)/);
    let isShiftStart;
    let guardId = -1;
    if (guardActivity) {
        isShiftStart = true;
        guardId = guardActivity[1];
    }
    const sleepActivity = activity.match(/falls asleep/);
    const wakeActivity = activity.match(/wakes up/);

    return {
        timestamp,
        activity: matchingGroups[6],
        isShiftStart: !!isShiftStart,
        guardId,
        sleepActivity: !!sleepActivity,
        wakeActivity: !!wakeActivity,
    };
}

const parsedLines = input.map(parseActivity);
// Order the timestamps
const orderedLines = parsedLines.sort((a, b) => a.timestamp - b.timestamp);
// Group into nightly objects
const nightlySchedules = orderedLines.reduce((schedules, currentSchedule) => {
    
    const dateStamp = currentSchedule.timestamp.toISOString().split('T')[0];
    if (!schedules[dateStamp]) {
        schedules[dateStamp] = {
            guardId: currentSchedule.guardId,
            date: dateStamp,
            sleepCycles: [],
        };
    }
    if (currentSchedule.wakeActivity || currentSchedule.sleepActivity) {
        const minuteStamp = currentSchedule.timestamp.getMinutes();
        schedules[dateStamp].sleepCycles.push(minuteStamp);
    }

    return schedules;
}, {});

// Split out to each individual guard, 
// Sum the guards' sleeping times
const guardSchedules = Object.keys(nightlySchedules).reduce((guards, dateKey) => {
    const schedule = nightlySchedules[dateKey];
    if (!guards[schedule.guardId]) {
        guards[schedule.guardId] = {
            shifts: [],
            totalSleepTime: 0,
        };
    }
    guards[schedule.guardId].shifts.push(schedule);
    let shiftSleepingTime = 0;
    for (let i = 0; i < schedule.sleepCycles.length; i += 2) {
        const sleepTime = schedule.sleepCycles[i];
        const wakeTime = schedule.sleepCycles[i+1];
        shiftSleepingTime += wakeTime - sleepTime;
    }
    guards[schedule.guardId].totalSleepTime += shiftSleepingTime;
    return guards;
}, {});

// Find the guard with the highest sleep time
let sleepiestGuard = {totalSleepTime: 0};
for (const guardId in guardSchedules) {
    const guard = guardSchedules[guardId];
    if (guard.totalSleepTime > sleepiestGuard.totalSleepTime) {
        sleepiestGuard = guard;
    }
}

// Create frequency map of times the guard is asleep
const sleepGraph = {};
let sleepiestMinute = -1;
let sleepyMinuteFrequency = 0;
for (const shift of sleepiestGuard.shifts) {
    for (let i = 0; i < shift.sleepCycles.length; i += 2) {
        for (let j = shift.sleepCycles[i]; j < shift.sleepCycles[i+1]; j++) {
            if (!sleepGraph[j]) {
                sleepGraph[j] = 0;
            }
            sleepGraph[j]++;
            if (sleepGraph[j] > sleepyMinuteFrequency) {
                sleepyMinuteFrequency = sleepGraph[j];
                sleepiestMinute = j;
            }
        }
    }
}
console.log(sleepiestMinute, sleepyMinuteFrequency);