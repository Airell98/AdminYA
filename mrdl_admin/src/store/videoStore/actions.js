/*
export function someAction (context) {
}
*/
import axios from "axios"
const baseURIModule = "http://localhost:3000/module";
const baseURIVideo = "http://localhost:3000/video"
export const getAllVideoDatas = (context, moduleType) => {
      axios({
          method:"GET",
          url:`${baseURIModule}/${moduleType}`,
          
      }).then(response=>{
           console.log(response.data.module, "dari action broooooo get All Video Datas")
          context.commit("getAllVideoDatasMutation", response.data.module)
      }).catch(err=>{
          console.log(err)
      })
  }

  export const editVideoNameByID = (context, videoData) => {
    
    axios({
        url:`${baseURIVideo}/editName/${videoData.id}`,
        method:"PUT",
        data:{
          name: videoData.value,
          moduleType: videoData.moduleType  
        }
        
    }).then(response=>{
        console.log("sukses mengedit video", response.data)
        context.commit("getAllVideoDatasMutation", response.data)
        // getAllVideoDatas("Module 1")
    //   this.$store.dispatch("getAllVideoDatas", "Module 1")
    }).catch(err=>{
        console.log(err)
    })
}


export const editVideoStsByID = (context, videoData) => {
    
    axios({
        url:`${baseURIVideo}/editName/${videoData.id}`,
        method:"PUT",
        data:{
          name: videoData.value,
          moduleType
        }
        
    }).then(response=>{
        console.log("sukses mengedit video")
        context.commit("getAllVideoDatasMutation", response.data.module)
        // getAllVideoDatas("Module 1")
    //   this.$store.dispatch("getAllVideoDatas", "Module 1")
    }).catch(err=>{
        console.log(err)
    })
}
