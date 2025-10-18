export function getYesterdayRange() {
    const today = new Date()
    const yesterday = new Date(today)

    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdaystart = new Date(yesterday)
    yesterdaystart.setHours(0, 0, 0, 0)

    const yesterdayEnd = new Date(yesterday)
    yesterdayEnd.setHours(23, 59, 59, 999)
    return { yesterdaystart, yesterdayEnd }
}