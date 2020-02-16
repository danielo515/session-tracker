function minsToHoursMinutes(minutes) {
    const hours = (minutes / 60) | 0;
    const mins = minutes % 60;
    return `${hours}:${mins.toString().padStart(2, "0")}`
}

export default minsToHoursMinutes;