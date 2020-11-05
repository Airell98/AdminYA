<template>
  <div class="container">
    <div class="theBody" style="max-width: 800px; margin:auto;">
      <div class="header">
        <div class="header-text">
          <h4>Add PPT</h4>
        </div>
      </div>
      <div class="my-inputs">
        <div class="flexing">
          <div class="types">
            <h5>Name</h5>
          </div>
          <div class="titik">
            <h5>:</h5>
          </div>
          <div class="forms" style="margin-left: 25px;">
            <q-input
            class="zip-input"
              dark
              bg-color="grey"
              outlined
              v-model="videoData.name"
              label="File Name"
              dense
            />
          </div>
        </div>

        <div class="flexing">
          <div class="types">
            <h5>File Link</h5>
          </div>
          <div class="titik">
            <h5>:</h5>
          </div>
          <div class="forms" style="margin-left: 23px;">
            <q-input
              dark
              bg-color="grey"
              outlined
              v-model="videoData.ppt_link"
              label="File Link"
              dense
            />
          </div>
        </div>

        <div class="flexing">
          <div class="types">
            <h5>Image Link</h5>
          </div>
          <div class="titik">
            <h5>:</h5>
          </div>
          <div class="forms" style="margin-left: 23px;">
            <q-input
              dark
              bg-color="grey"
              outlined
              v-model="videoData.video_link"
              label="Image Link"
              dense
            />
          </div>
        </div>

        <div class="flexing">
          <div class="types">
            <h5>Part</h5>
          </div>
          <div class="titik">
            <h5>:</h5>
          </div>
          <div class="forms" style="margin-left: 23px;">
            <q-input
              outlined
              v-model="videoData.part"
              dark
              bg-color="grey"
              label=" Video Part"
              dense
            />
          </div>
        </div>

        <div class="flexing">
          <div class="types">
            <h5>Desc</h5>
          </div>
          <div class="titik">
            <h5>:</h5>
          </div>
          <div class="forms" style="margin-left: 23px; margin-bottom: 10px;">
            <q-input
              dark
              bg-color="grey"
              outlined
              v-model="videoData.desc"
              filled
              type="textarea"
              label=" Video Desc"
              dense
            />
          </div>
        </div>
      </div>
      <!-- <div class="all-inputs">
        <div class="left-side card">
          <div class="title" style="text-align:center;">
            <h5>Video Name</h5>
            <q-input outlined v-model="videoData.name" label="Video Name" />
          </div>

          <div class="title" style="text-align:center;">
            <h5>Video Link</h5>
            <q-input outlined v-model="videoData.video_link" label="Video Link" />
          </div>
        </div>

        <div class="middle-side card">
          <div class="title" style="text-align:center;">
            <h5>Video Module</h5>
            <q-select
              outlined
              v-model="videoData.ModuleId"
              :options="options"
              label="Video Module"
            />
          </div>
             <div class="title" style="text-align:center;">
            <h5>Video Part</h5>
            <q-input
              outlined
              v-model="videoData.part"
              
              label=" Video Part"
            />
          </div>
        </div>

         <div class="right-side card">
         
             <div class="title" style="text-align:center;">
            <h5>Video Desc</h5>
            <q-input
              outlined
              v-model="videoData.desc"
                filled
               type="textarea"
              label=" Video Desc"
            />
            <div style="margin-top: 20px;">

            <q-btn class="glossy" rounded color="negative" label="Click To Create" :disabled="isDisabled" @click="createVideo" />
            </div>
          </div>
        </div>
      </div> -->
      <div style="margin-top: 20px; width:100px; margin: auto;">
        <q-btn
          class="glossy"
          rounded
          color="negative"
          label="Create"
          :disabled="isDisabled"
          @click="createPPT"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  name: "PageIndex",
  data() {
    return {
      model: null,
      options: [1, 2],
      part: null,
      partOptions: [1, 2],
      desc: "",
      videoData: {
        name: "",
        ppt_link: "",
        video_link: "",
        ModuleId: 2,
        part: "",
        desc: "",
        sts: false,
        type: "ppt"
      }
    };
  },
  created() {
    // this.$store.dispatch("getAllVideoDatas");
  },
  computed: {
    isDisabled() {
      if (
        this.videoData.name == null ||
        this.videoData.video_link == null ||
        this.videoData.part == null ||
        this.videoData.desc == null ||
        this.videoData.username === "" ||
        this.videoData.ppt_link == "" ||
        this.videoData.ModuleId == "" ||
        this.videoData.part == "" ||
        this.videoData.desc == ""
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    createPPT() {
      let data = this.videoData;
      axios({
        url: `${this.$store.state.baseURIVideo}/createPPT`,
        method: "POST",
        data,
        headers: {
          access_token: localStorage.api_token
        }
      })
        .then(response => {
          for (let key in this.videoData) {
            console.log(key);
            this.videoData[key] = "";
          }
          Swal.fire("Successfully added a video");
        })
        .catch(err => {
          console.log(err);
          Swal.fire({
            position: "top",
            title: "Error!",
            text: err.response.data.message,
            icon: "error",
            confirmButtonText: "OK",
            timer: 2000
          });
        });
    }
  }
};
</script>



<style scoped>
h4{
  margin-block-start:7px ;
}

h5{
  margin-block-start:7px;
}



.types{
  width: 25%;
}
.all-inputs{
  display: flex;
  justify-content: space-evenly;
  border: 1px solid rgb(146, 14, 14);
   padding: 10px;
  box-sizing: border-box;
  border-radius: 1%;
}
.header{
   background-color: rgb(146, 14, 14);
   border-radius: 1%;
}
.flexing{
  display: flex;
  /* justify-content: flex-start; */
}
.header-text {

  /* max-width: 300px; */

  /* margin: auto; */
  text-align: center;
  /* padding: 2px; */
}
.header-text h4 {
  text-align: center;
  color: whitesmoke;
  padding: 20px;
  margin-bottom:14px;
  /* background-color: black; */
  max-width: 50%;
  margin-left: 25%;
  /* margin: auto; */
}

.forms{
  width: 80%;

}

/* .zip-input input {
height: 2px;
} */

/* .q-input{
  height: 2.5em;
}
.q-if-label
 { text-align: right;
  color: orangeRed;}

input[type="number"]
 { height: 1em;
  color: purple;
  text-align: right; } */
</style>



