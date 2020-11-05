<template>
  <div class="q-pa-md"  style="background-color:#ced1d6;" v-if="this.$store.state.kondisi"  >
    <div class="header">
      <div class="header-text">
        <h4>Module {{ this.$route.params.module }}</h4>
      </div>
    </div>
    <q-table
      title="Videos"
      :data="this.movieNya"
      :columns="columns"
      row-key="name"
      content-class="bg-grey"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
        
          <q-td key="video_name" :props="props">
            {{ props.row.name }}
            <q-popup-edit
              v-model="video.name"
              title="Update name"
              buttons
              @before-show="updateName(props.row.name)"
              @save="saveName(video.name, props.row.name, props.row.id)"
            >
              <q-input v-model="video.name" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="sts" :props="props">
            {{ props.row.sts }}
            <q-popup-edit
              v-model="video.sts"
              title="Update status"
              buttons
              @before-show="updateSts(props.row.sts)"
              @save="saveSts(video.sts, props.row.sts, props.row.id)"
            >
              <!-- <q-select outlined v-model="model" :options="options" label="Outlined" /> -->
              <q-select v-model="video.sts" :options="opsi" dense autofocus />
            </q-popup-edit>
          </q-td>
          <!-- <q-td key="Module" :props="props">
            <div class="text-pre-wrap">{{ props.row.ModuleId }}</div>
            <q-popup-edit
              v-model="video.ModuleId"
              title="Update module"
              buttons
              @before-show="updateModule(props.row.ModuleId)"
              @save="
                saveModule(video.ModuleId, props.row.ModuleId, props.row.id)
              "
            >
              <q-select
                v-model="video.ModuleId"
                :options="pilihanModul"
                dense
                autofocus
              />
            </q-popup-edit>
          </q-td> -->

  <q-td key="PPT_link" :props="props">
            {{olahKata(props.row.ppt_link)}}
            <q-popup-edit
              v-model="video.PPT_link"
              title="Update File Link"
              buttons
              @before-show="updatePPTLink(props.row.ppt_link)"
              @save="
                savePPTLink(video.ppt_link, props.row.ppt_link, props.row.id)
              "
            >
              <q-input v-model="video.PPT_link" dense autofocus />
            </q-popup-edit>
          </q-td>


          <q-td key="video_link" :props="props">
            {{olahKata(props.row.video_link)}}
            <q-popup-edit
              v-model="video.video_link"
              title="Update Link"
              buttons
              @before-show="updateLink(props.row.video_link)"
              @save="
                saveLink(video.video_link, props.row.video_link, props.row.id)
              "
            >
              <q-input v-model="video.video_link" dense autofocus />
            </q-popup-edit>
          </q-td>

          

          <q-td key="desc" :props="props">
            <div v-html="olahKata(props.row.desc)"></div>
            <q-popup-edit
              buttons
              v-model="video.desc"
              @before-show="updateDesc(props.row.desc)"
              @save="saveDesc(video.desc, props.row.desc, props.row.id)"
            >
              <q-editor
                v-model="video.desc"
                min-height="5rem"
                autofocus
                @keyup.enter.stop
              />
            </q-popup-edit>
          </q-td>

          <q-td key="part" :props="props">
            {{ props.row.part }}
            <q-popup-edit
              v-model="video.part"
              title="Update Part"
              buttons
              @before-show="updatePart(props.row.part)"
              @save="savePart(video.part, props.row.part, props.row.id)"
            >
              <q-input v-model="video.part" dense autofocus />
            </q-popup-edit>
          </q-td>

           
        </q-tr>
      </template>

     
    </q-table>
  </div>
</template>

<script>
import router from "../router";
import Swal from "sweetalert2";
export default {
  name: "Table",
  created() {
    this.$store.dispatch("getAllVideoDatas", this.$route.params.module);
    // this.$store.dispatch("getAllVideoDatas", this.$route.params.module);
    // location.reload()
  },
  mounted() {
    //  console.log(this.$store.state.videoStore.movies.Videos,"=======")
    console.log(this.$route.params.module);
  },
  data() {
    return {
      video: {
        name: "",
        sts: "",
        ModuleId: "",
        PPT_link: "",
        video_link: "",
        part: "",
        desc: "",
        
      },
      columns: [
       

        {
          name: "video_name",
          required: true,
          label: "Video Name",
          align: "center",
          field: row => row.name,
          format: val => `${val}`
        },
        {
          name: "sts",
          required: true,
          label: "Status",
          align: "center",
          field: row => row.sts,
          format: val => `${val}`
        },
       {
          name: "PPT_link",
          required: true,
          label: "File Link",
          align: "center",
          field: row => row.ppt_link,
          format: val => `${val}`
        },
        {
          name: "video_link",
          required: true,
          label: "Image Link",
          align: "center",
          field: row => row.video_link,
          format: val => `${val}`
        },
        {
          name: "desc",
          required: true,
          label: "Desc",
          align: "center",
          field: row => row.desc,
          format: val => `${val}`
        },
        {
          name: "part",
          required: true,
          label: "Part",
          align: "center",
          field: row => row.part,
          format: val => `${val}`
        },
       
      ],
      opsi: [false, "true"],
      pilihanModul: [1, 2]
    };
  },
  computed: {
    data() {
      return this.$store.state.movies.Videos.sort((a, b) => a.id - b.id);
    },
    movieNya(){
      return this.$store.state.movies
    }
  },
  methods: {
     olahKata(kata){
       let counter  = 0;
        let result = "";
      if(kata){

       
        
      for(let i = 0; i < kata.length; i++){
        if(i < 17){
           result += kata[i]
        }else if(counter < 4){
             result += "."
             counter ++
        }else {
          break;  
        }
      }
    }
    
     counter = 0;
    return result;
    },
    updateName(params) {
      this.video.name = params;
    },
    inputName(params) {
      console.log(params);
    },
    updateSts(params) {
      this.video.sts = params;
    },
    updateModule(params) {
      this.video.ModuleId = params;
    },
    updatePPTLink(params) {
     
      this.video.PPT_link = params;
      
    },
    updateLink(params) {
      this.video.video_link = params;
    },
    updatePart(params) {
      this.video.part = params;
    },
    updateDesc(params) {
      this.video.desc = params;
    },
    saveName(value, _, id) {
      
      let videoData = {
        value,
        id,
        moduleType: this.$route.params.module
      };
      this.$store.dispatch("editVideoNameByID", videoData);
    },
    saveSts(value, _, id) {
      let result = "";
      if (value == "true") {
        result = true;
      } else {
        result = false;
      }
      this.video.sts = true;
      let videoData = {
        value: result,
        id,
        moduleType: this.$route.params.module
      };

      this.$store.dispatch("editVideoStsByID", videoData);
    },
    saveModule(value, _, id) {
      let videoData = {
        value,
        id,
        moduleType: this.$route.params.module
      };
      this.$store.dispatch("editVideoModuleByID", videoData);
    },
      savePPTLink(value, _, id) {
      let videoData = {
        value,
        id,
        moduleType: this.$route.params.module
      };
      this.$store.dispatch("editPPTLinkByID", videoData);
    },
    saveLink(value, _, id) {
      let videoData = {
        value,
        id,
        moduleType: this.$route.params.module
      };
      this.$store.dispatch("editVideoLinkByID", videoData);
    },
    savePart(value, _, id) {
      let videoData = {
        value,
        id,
        moduleType: this.$route.params.module
      };
      this.$store.dispatch("editVideoPartByID", videoData);
    },
    saveDesc(value, _, id) {
      let videoData = {
        value,
        id,
        moduleType: this.$route.params.module
      };
      this.$store.dispatch("editVideoDescByID", videoData);
    },
    hapus(videoID, videoName){
        Swal.fire({
            title: `<h4 style="text-align: center;">You are going to delete <span style="color:rgb(168,8,8);">${videoName}</span>.</h4>`,
            text: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sure",
            cancelButtonText: "Nope"
          }).then(result => {
            if (result.value) {
               this.$store.dispatch("hapus", {videoID, moduleType: this.$route.params.module})
            } else {
             
            }
          });
        
    }
  }
};
</script>

<style scoped>
/* .header{
  margin-top: 50px;
} */
.header-text {
  text-align: center;
  background-color: #c10015;
  max-width: 300px;
  border-radius: 2%;
  /* padding: 1px; */
  /* box-sizing: border-box; */
}
.header-text h4 {
  color: whitesmoke;
  padding: 10px;
}
</style>
