const inputReader = require('./utilities/inputReaderUtility');
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
// Aggregate their sleeping frequencies
const guardSchedules = Object.keys(nightlySchedules).reduce((guards, dateKey) => {
    const schedule = nightlySchedules[dateKey];
    if (!guards[schedule.guardId]) {
        guards[schedule.guardId] = {
            id: schedule.guardId,
            shifts: [],
            sleepingFrequency: {},
            sleepiestMinute: 0,
            sleepiestMinuteOccurrences: 0,
        };
    }
    guard = guards[schedule.guardId];
    guard.shifts.push(schedule);
    for (let i = 0; i < schedule.sleepCycles.length; i += 2) {
        const sleepTime = schedule.sleepCycles[i];
        const wakeTime = schedule.sleepCycles[i+1];
        for (let j = sleepTime; j < wakeTime; j++) {
            if (!guard.sleepingFrequency[j]) {
                guard.sleepingFrequency[j] = 0;
            }
            guard.sleepingFrequency[j]++;
            if (guard.sleepingFrequency[j] > guard.sleepiestMinuteOccurrences) {
                guard.sleepiestMinuteOccurrences = guard.sleepingFrequency[j];
                guard.sleepiestMinute = j;
            }
        }
    }
    return guards;
}, {});

let heaviestMinuteSleeperGuard = {sleepiestMinuteOccurrences: 0};
for (const guardId in guardSchedules) {
    const guard = guardSchedules[guardId];
    if (guard.sleepiestMinuteOccurrences > heaviestMinuteSleeperGuard.sleepiestMinuteOccurrences) {
        heaviestMinuteSleeperGuard = guard;
    }
}

console.log(heaviestMinuteSleeperGuard.id, heaviestMinuteSleeperGuard.sleepiestMinute);