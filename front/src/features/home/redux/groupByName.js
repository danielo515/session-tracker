export const formatGroupedSessions = (acc = { nested: [] }, session) => ({
    name: session.name.trim(),
    lastRun: "",
    nested: [...acc.nested, session]
})

export const groupByName = format => sessions => sessions.reduce((all, s) => ({
    ...all,
    [s.name.trim()]: format(all[s.name.trim()], s)
}), {});
