function starVideoFromCamera(){

    const spec = {video:{width:300}}

    navigator.mediaDevices.getUserMedia(spec).then(stream=>{

        const videoElement = document.querySelector("#video")
        videoElement.srcObject = stream
    }).catch(error=>{console.log(error)})
}

window.addEventListener("DOMContentLoaded", starVideoFromCamera)