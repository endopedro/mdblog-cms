const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => resolve(fileReader.result)
    fileReader.onerror = (error) => reject(error)
  })

export default fileToBase64
