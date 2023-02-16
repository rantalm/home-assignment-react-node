const getDate30DaysAgo = () => {
    const today = new Date()
    return new Date(new Date().setDate(today.getDate() - 30)).toISOString().split('T')[0]
}

const isToday = (date) => {
    const today = new Date()
    return date.getDate() == today.getDate() &&
      date.getMonth() == today.getMonth() &&
      date.getFullYear() == today.getFullYear()
  }

module.exports = { 
    getDate30DaysAgo,
    isToday
}