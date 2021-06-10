const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-US', {
    dateStyle: 'medium',
  })

export default formatDate
