function generateQRCode(){
  const text = document.getElementById('text')
  const fgcolor = document.getElementById('fgColor').value
  const bgcolor = document.getElementById('bgColor').value
  const canvas = document.getElementById('qrcode')
  canvas.innerHTML = ''

  if(text.value === "" || text.value.trim() == ""){
    alert("Please enter a URL")
    return
  }

  new QRCode(canvas,{
    text: text.value,
    height: 300,
    width: 300,
    colorDark: fgcolor,
    colorLight: bgcolor
  })

  setTimeout(()=>{
    const qrimage = document.getElementById('qrImage')
    qrimage.src = canvas.querySelector('canvas').toDataURL()
    qrimage.style.display = "block"
  },100)
}
function downloadQRCode(){
  if(text.value === "" || text.value.trim == ""){
    alert("Please enter a URL")
    return
  }
  const canvas = document.querySelector("#qrcode canvas") 
  const link = document.createElement('a')
  link.href = canvas.toDataURL("image/png")
  link.download = "qrcode.png"
  link.click()
}
function shareQRCode(){
  if (navigator.share) {
    const canvas = document.querySelector("#qrcode canvas")
    canvas.toBlob((blob)=>{
      const file = new File([blob] , "qrcode.png" , {type:"image/png"})
      navigator.share({
        files:[file],
        title: "QR Code",
        text: "Here is your custom QR Code" 
      })
    })
  }
  else{
    alert("Web Share API is NOT supported in your Browser")
    return
  }
}