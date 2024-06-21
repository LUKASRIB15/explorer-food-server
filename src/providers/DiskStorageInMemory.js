class DiskStorageInMemory{
  tmp = [
    "image.png"
  ]
  uploads = []

  async saveFile(file){
    const newTmp = this.tmp.filter(fileTmp=> fileTmp !== file)
    this.tmp = newTmp

    this.uploads.push(file)

    return file
  }

  async deleteFile(file){
    const newUploads = this.uploads.filter(fileUpload=> fileUpload !== file)
    this.uploads = newUploads
  
  }
}

module.exports = DiskStorageInMemory