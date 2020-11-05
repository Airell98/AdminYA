import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router";
import Swal from "sweetalert2";
// import example from './module-example'
// import videoStore from './videoStore';
Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */
const baseURIModule = "https://mrdl.herokuapp.com/module";
// const baseURIModule = "http://localhost:3000/module";
const baseURIVideo = "https://mrdl.herokuapp.com/video";
// const baseURIVideo = "http://localhost:3000/video"
const baseURI = "https://mrdl.herokuapp.com";
export default new Vuex.Store({
  state: {
    module: {},
    baseURIUser: "https://mrdl.herokuapp.com/user",
    // baseURIUser:"http://localhost:3000/user",
    // baseURIVideo: "http://localhost:3000/video",
    baseURIVideo: "https://mrdl.herokuapp.com/video",
    allModules: [],
    kondisi: false,
    movies: [],
    users: []
  },
  mutations: {
    getAllVideoDatasMutation(state, payload) {
      state.movies = payload;
      state.kondisi = true;
    },
    inputModuleMutation(state, payload) {
      state.module = payload;
    },
    allModulesMutation(state, payload) {
      state.allModules = payload;
    },
    getAllUsersDataMutation(state, payload) {
      state.users = payload;
      state.kondisi = true;
    }
  },
  actions: {
    getAllUserDatas(context, payload) {
      axios({
        url: `https://mrdl.herokuapp.com/user/getUsersByRole/${payload}`,
        method: "GET",

        headers: {
          access_token: localStorage.api_token
        }
      })
        .then(response => {
          console.log(response.data.users);
          context.commit("getAllUsersDataMutation", response.data.users);
        })
        .catch(err => {
          console.log(err, "Error dari getAllUsersData di Store Index");
        });
    },
    searchUserByEmail(context, payload) {
      axios({
        url: `https://mrdl.herokuapp.com/user/getOneUserByEmail/${payload.mymail}/${payload.role}`,
        method: "GET",

        headers: {
          access_token: localStorage.api_token
        }
      })
        .then(response => {
          context.commit("getAllUsersDataMutation", response.data.user);
        })
        .catch(err => {
          console.log(err, "Error dari getAllUsersData di Store Index");
        });
    },

    edituserNameByID(context, payload) {
      axios({
        url: `${baseURI}/user/edituserNameByID`,
        method: "PUT",
        data: {
          id: payload.id,
          firstname: payload.value
        },
        headers: {
          access_token: localStorage.api_token
        }
      })
        .then(response => {
          this.dispatch("getAllUserDatas", payload.role);
        })
        .catch(err => {
          console.log(err, "dari editUserNameByID di store index");
        });
    },
    edituserStsByID(context, payload) {
      axios({
        url: `${baseURI}/user/edituserStsByID`,
        method: "PUT",
        data: {
          id: payload.id,
          sts: payload.value
        },
        headers: {
          access_token: localStorage.api_token
        }
      })
        .then(response => {
          this.dispatch("getAllUserDatas", payload.role);
        })
        .catch(err => {
          console.log(err, "dari editUserNameByID di store index");
        });
    },
    edituserEmailByID(context, payload) {
      console.log(payload);
      axios({
        url: `${baseURI}/user/edituserEmailByID`,
        method: "PUT",
        data: {
          id: payload.id,
          mymail: payload.value
        },
        headers: {
          access_token: localStorage.api_token
        }
      })
        .then(response => {
          this.dispatch("getAllUserDatas", payload.role);
        })
        .catch(err => {
          console.log(
            err.response.data,
            "dari editUserEmailByID di store index"
          );
        });
    }, //

    edituserPasswordByID(context, payload) {
      axios({
        url: `${baseURI}/user/changePassword`,
        method: "PUT",
        data: {
          id: payload.id,
          password: payload.value
        },
        headers: {
          access_token: localStorage.api_token
        }
      })
        .then(response => {
          this.dispatch("getAllUserDatas", payload.role);
        })
        .catch(err => {
          console.log(
            err.response.data,
            "dari editUserPasswordByID di store index"
          );
        });
    },
    edituserDomisiliByID(commit, payload) {
      axios({
        url: `${baseURI}/user/edituserDomisiliByID`,
        method: "PUT",
        data: {
          id: payload.id,
          domisili: payload.value
        },
        headers: {
          access_token: localStorage.api_token
        }
      })
        .then(response => {
          this.dispatch("getAllUserDatas", payload.role);
        })
        .catch(err => {
          console.log(
            err.response.data,
            "dari /edituserDomisiliByID di store index"
          );
        });
    },

    edituserBatchByID(context, payload) {
      console.log(payload);
      axios({
        url: `${baseURI}/user/edituserBatchByID`,
        method: "PUT",
        data: {
          id: payload.id,
          batch: Number(payload.value)
        },
        headers: {
          access_token: localStorage.api_token
        }
      })
        .then(response => {
          this.dispatch("getAllUserDatas", payload.role);
        })
        .catch(err => {
          console.log(
            err.response.data,
            "dari edituserBatchByID di store index"
          );
        });
    },

    getAllVideoDatas(context, moduleID) {
      console.log("ini module id" + " " + moduleID);
      axios({
        method: "GET",
        url: `${baseURIModule}/getOneModule/${moduleID}`
      })
        .then(response => {
          context.commit("inputModuleMutation", response.data.module);

          context.commit(
            "getAllVideoDatasMutation",
            response.data.module.Videos.sort((a, b) => a.id - b.id)
          );
        })
        .catch(err => {
          console.log(err.response.data, "dari get all video datas");
        });
    },
    getAllModules(context, _) {
      axios({
        method: "GET",
        url: `${baseURIModule}`,
        headers: {
          access_token: localStorage.api_token
        }
      })
        .then(response => {
          context.commit("allModulesMutation", response.data.module);
        })
        .catch(err => {
          console.log(err, "error dari getAllModules di store index");
        });
    },
    editVideoNameByID(context, videoData) {
      axios({
        url: `${baseURIVideo}/editName/${videoData.id}`,
        method: "PUT",
        data: {
          name: videoData.value,
          moduleType: videoData.moduleType
        },
        headers: {
          access_token: localStorage.api_token
        }
      })
        .then(response => {
          this.dispatch("getAllVideoDatas", videoData.moduleType);
        })
        .catch(err => {
          console.log(
            err.response,
            "error dari editVideoNameByID di store index"
          );
        });
    },
    editVideoStsByID(_, payload) {
      console.log(payload, "editVideoStsByID");
      axios({
        url: `${baseURIVideo}/editSts/${payload.id}`,
        method: "PUT",
        data: {
          sts: payload.value,
          moduleType: payload.moduleType
        },
        headers: {
          access_token: localStorage.api_token
        }
      })
        .then(response => {
          this.dispatch("getAllVideoDatas", payload.moduleType);
        })
        .catch(err => {
          console.log(err, "error dari editVideoStsByID di store index");
        });
    },
    editVideoModuleByID(_, payload) {
      axios({
        url: `${baseURIVideo}/editModule/${payload.id}`,
        method: "PUT",
        data: {
          ModuleId: Number(payload.value),
          moduleType: payload.moduleType
        },
        headers: {
          access_token: localStorage.api_token
        }
      })
        .then(response => {
          this.dispatch("getAllVideoDatas", payload.moduleType);
        })
        .catch(err => {
          Swal.fire({
            position: "top",
            title: "Error!",
            text: err.response.data.message,
            icon: "error",
            confirmButtonText: "OK",
            timer: 2000
          });
        });
    },
    editVideoLinkByID(_, payload) {
      axios({
        url: `${baseURIVideo}/editLink/${payload.id}`,
        method: "PUT",
        data: {
          video_link: payload.value,
          moduleType: payload.moduleType
        },
        headers: {
          access_token: localStorage.api_token
        }
      })
        .then(response => {
          this.dispatch("getAllVideoDatas", payload.moduleType);
        })
        .catch(err => {
          Swal.fire({
            position: "top",
            title: "Error!",
            text: err.response.data.message,
            icon: "error",
            confirmButtonText: "OK",
            timer: 2000
          });
        });
    },
    editPPTLinkByID(_, payload) {
      axios({
        url: `${baseURIVideo}/editPPTLink/${payload.id}`,
        method: "PUT",
        data: {
          ppt_link: payload.value,
          moduleType: payload.moduleType
        },
        headers: {
          access_token: localStorage.api_token
        }
      })
        .then(response => {
          this.dispatch("getAllVideoDatas", payload.moduleType);
        })
        .catch(err => {
          Swal.fire({
            position: "top",
            title: "Error!",
            text: err.response.data.message,
            icon: "error",
            confirmButtonText: "OK",
            timer: 2000
          });
        });
    },

    editVideoPartByID(_, payload) {
      axios({
        url: `${baseURIVideo}/editPart/${payload.id}`,
        method: "PUT",
        data: {
          part: payload.value,
          moduleType: payload.moduleType
        },
        headers: {
          access_token: localStorage.api_token
        }
      })
        .then(response => {
          this.dispatch("getAllVideoDatas", payload.moduleType);
        })
        .catch(err => {
          Swal.fire({
            position: "top",
            title: "Error!",
            text: err.response.data.message,
            icon: "error",
            confirmButtonText: "OK",
            timer: 2000
          });
        });
    },
    editVideoDescByID(_, payload) {
      console.log(payload.value);
      axios({
        url: `${baseURIVideo}/editDesc/${payload.id}`,
        method: "PUT",
        data: {
          desc: payload.value,
          moduleType: payload.moduleType
        },
        headers: {
          access_token: localStorage.api_token
        }
      })
        .then(response => {
          this.dispatch("getAllVideoDatas", payload.moduleType);
        })
        .catch(err => {
          Swal.fire({
            position: "top",
            title: "Error!",
            text: err.response.data.message,
            icon: "error",
            confirmButtonText: "OK",
            timer: 2000
          });
        });
    },
    hapus(_, payload) {
      axios({
        url: `${baseURIVideo}/deleteVideo/${payload.videoID}`,
        method: "DELETE",

        headers: {
          access_token: localStorage.api_token
        }
      })
        .then(response => {
          this.dispatch("getAllVideoDatas", payload.moduleType);
        })
        .catch(err => {
          console.log(err, "error dari hapus di store index");
        });
    },
    hapusUser(_, payload) {
      axios({
        url: `${baseURI}/user/${payload.userID}`,
        method: "DELETE",

        headers: {
          access_token: localStorage.api_token
        }
      })
        .then(response => {
          this.dispatch("getAllUserDatas", payload.role);
        })
        .catch(err => {
          console.log(err.response, "error dari hapusUser di store index");
        });
    },
    forModuleSts(context, payload) {
      console.log(payload, "dari for module sts");
      axios({
        method: "PUT",
        url: `${baseURIModule}/module_setting`,
        data: {
          moduleID: payload.moduleID,
          sts: payload.sts
        },
        headers: {
          access_token: localStorage.api_token
        }
      })
        .then(response => {
          this.dispatch("getAllVideoDatas", payload.moduleID);
          // location.reload()
        })
        .catch(err => {
          console.log(err, "dari forModuleSts Store");
        });
    },
    resendPassword(_, payload){
      axios({
        method: "POST",
        url: `${baseURI}/emailing/resendPassword`,
        data: {
        mymail: payload.value,
        id: payload.id
        },
        headers: {
          access_token: localStorage.api_token
        }
      }).then(response=>{
        console.log(response)
        Swal.fire({
          position: "center",
          title: "Email has been sent",
         
          icon: "success",
          confirmButtonText: "OK",
          timer: 2000
        });
      }).catch(err=>{
        console.log(err, "dari resend password di store index")
      })
    }
  },

  modules: {}
});
