export const formatGroupedSessions = (acc = { nested: [], lastRun:"" }, session) => ({
    name: session.name.trim(),
    lastRun: acc.lastRun < session.endDate ? session.endDate : acc.lastRun, 
    nested: [...acc.nested, session]
})

export const groupByName = format => sessions => sessions.reduce((all, s) => ({
    ...all,
    [s.name.trim()]: format(all[s.name.trim()], s)
}), {});
