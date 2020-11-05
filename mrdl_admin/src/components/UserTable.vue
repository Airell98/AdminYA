<template>
  <div
    class="q-pa-md"
    style="background-color:#ced1d6;"
    v-if="this.$store.state.kondisi"
  >
    <div class="header">
      <div class="header-text">
        <h4>{{ $route.params.module }}</h4>
      </div>

      <div class="input-find-one">
        <div class="flexing">
          <div
            class="forms"
            style="margin-right: 20px; margin-block-start: 2.80em;
   "
          >
            <q-input
              class="zip-input"
              dark
              bg-color="grey"
              outlined
              v-model="mymail"
              label="Email/Name"
              dense
            />
          </div>
          <div class="the-button" style=" margin-block-start: 2.80em;">
            <q-btn
              class="glossy"
              rounded
              color="negative"
              label="Search"
              @click="searchEmail"
            />
          </div>
        </div>
      </div>
    </div>
    <q-table
      title="users"
      :data="this.userNya"
      :columns="columns"
      row-key="name"
      content-class="bg-grey"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">
            {{ props.row.firstname }}
            <q-popup-edit
              v-model="user.firstname"
              title="Update name"
              buttons
              @before-show="updateName(props.row.firstname)"
              @save="
                saveName(
                  user.firstname,
                  props.row.firstname,
                  props.row.id,
                  props.row.role
                )
              "
            >
              <q-input v-model="user.firstname" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="sts" :props="props">
            {{ props.row.sts }}
            <q-popup-edit
              v-model="user.sts"
              title="Update status"
              buttons
              @before-show="updateSts(props.row.sts)"
              @save="
                saveSts(user.sts, props.row.sts, props.row.id, props.row.role)
              "
            >
              <!-- <q-select outlined v-model="model" :options="options" label="Outlined" /> -->
              <q-select v-model="user.sts" :options="opsi" dense autofocus />
            </q-popup-edit>
          </q-td>

          <q-td key="mymail" :props="props">
            {{ props.row.mymail }}
            <q-popup-edit
              v-model="user.mymail"
              title="Update Email"
              buttons
              @before-show="updateEmail(props.row.mymail)"
              @save="
                saveEmail(
                  user.mymail,
                  props.row.mymail,
                  props.row.id,
                  props.row.role
                )
              "
            >
              <q-input v-model="user.mymail" dense autofocus />
            </q-popup-edit>
          </q-td>

          <!-- <q-td key="backup_password" :props="props">
            {{ props.row.backup_password }}
            <q-popup-edit
              v-model="user.backup_password"
              title="Backup"
              buttons
              @before-show="updatePassword(props.row.backup_password)"
              @save="
                savePassword(
                  user.backup_password,
                  props.row.backup_password,
                  props.row.id,
                  props.row.role
                )
              "
            >
              <q-input v-model="user.backup_password" dense autofocus />
            </q-popup-edit>
          </q-td> -->

          <!-- <q-td key="domisili" :props="props">
            <div v-html="olahKata(props.row.domisili)"></div>
            <q-popup-edit
              buttons
              v-model="user.domisili"
              @before-show="updateDomisili(props.row.domisili)"
              @save="
                saveDomisili(
                  user.domisili,
                  props.row.domisili,
                  props.row.id,
                  props.row.role
                )
              "
            >
              <q-editor
                v-model="user.domisili"
                min-height="5rem"
                autofocus
                @keyup.enter.stop
              />
            </q-popup-edit>
          </q-td> -->

          <q-td key="batch" :props="props">
            {{ props.row.batch }}
            <q-popup-edit
              v-model="user.batch"
              title="Batch"
              buttons
              @before-show="updateBatch(props.row.batch)"
              @save="
                saveBatch(
                  user.batch,
                  props.row.batch,
                  props.row.id,
                  props.row.role
                )
              "
            >
              <q-input v-model="user.batch" dense autofocus type="number" />
            </q-popup-edit>
          </q-td>

          <q-td key="action1">
            <q-btn
             style="margin-left: 30px;"
              push
              color="negative"
              label="Delete"
              @click="hapus(props.row.id, props.row.firstname, props.row.role)"
            />
           
          </q-td>
            <q-td key="action2" >
            
             <q-btn
             style="margin-left: 50px;"
              push
              color="primary"
              label="Resend Password"
              @click="resendPassword(props.row.id, props.row.mymail)"
            />
          </q-td>
        
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "UserTable",
  created() {
    this.$store.dispatch("getAllUserDatas", this.$route.params.module);
  },
  computed: {
    userNya() {
      return this.$store.state.users;
    }
  },
  data() {
    return {
      user: {
        firstname: "",
        sts: "",
        mymail: "",
        backup_password: "",
        domisili: "",
        part: "",
        desc: "",
        batch: ""
      },
      mymail: "",
      columns: [
        {
          name: "name",
          required: true,
          label: "User Name",
          align: "center",
          field: row => row.firstname,
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
          name: "mymail",
          required: true,
          label: "Email",
          align: "center",
          field: row => row.mymail,
          format: val => `${val}`
        },
        // {
        //   name: "backup_password",
        //   required: true,
        //   label: "Password",
        //   align: "left",
        //   field: row => row.backup_password,
        //   format: val => `${val}`
        // },
        // {
        //   name: "domisili",
        //   required: true,
        //   label: "Domisili",
        //   align: "left",
        //   field: row => row.domisili,
        //   format: val => `${val}`
        // },
        {
          name: "batch",
          required: true,
          label: "Batch",
          align: "center",
          field: row => row.batch,
          format: val => `${val}`
        },
        {
          name: "action1",
          required: true,
          label: "Action 1",
          align: "center"
        },
         {
          name: "action2",
          required: true,
          label: "Action 2",
          align: "center"
        }
      ],
      opsi: ["false", "true"]
      // pilihanModul: [1, 2]
    };
  },
  methods: {
    olahKata(kata) {
      // console.log(kata.split(" "))
      if (kata) {
        let result = "";
        let counter = 0;
        for (let i = 0; i < kata.length; i++) {
          if (i < 17) {
            result += kata[i];
          } else if (counter < 4) {
            result += ".";
            counter++;
          } else {
            break;
          }
        }

        counter = 0;
        return result;
      }
    },
    updateName(params) {
      this.user.firstname = params;
    },
    updateSts(params) {
      this.user.sts = params;
    },
    updatePassword(params) {
      this.user.backup_password = params;
    },
    updateDomisili(params) {
      this.user.domisili = params;
    },
    updateBatch(params) {
      this.user.batch = params;
    },
    updateEmail(params) {
      this.user.mymail = params;
    },
    saveName(value, _, id, role) {
      let userData = {
        value,
        id,
        role
      };

      this.$store.dispatch("edituserNameByID", userData);
    },
    saveSts(value, _, id, role) {
      let userData = {
        value,
        id,
        role
      };

      this.$store.dispatch("edituserStsByID", userData);
    },
    saveEmail(value, _, id, role) {
      let userData = {
        value,
        id,
        role
      };

      this.$store.dispatch("edituserEmailByID", userData);
    },

    savePassword(value, _, id, role) {
      let userData = {
        value,
        id,
        role
      };

      this.$store.dispatch("edituserPasswordByID", userData);
    },
    saveDomisili(value, _, id, role) {
      console.log("masuk domisli save");
      let userData = {
        value,
        id,
        role
      };
      this.$store.dispatch("edituserDomisiliByID", userData);
    },
    saveBatch(value, _, id, role) {
      console.log("masuk save Batch ");
      let userData = {
        value,
        id,
        role
      };

      this.$store.dispatch("edituserBatchByID", userData);
      this.user.batch = "";
    },
    saveDomisili(value, _, id, role) {
      let userData = {
        value,
        id,
        role
      };
      this.$store.dispatch("edituserDomisiliByID", userData);
    },
    hapus(userID, userName) {
      Swal.fire({
        title: `<h4 style="text-align: center;">You are going to delete <span style="color:rgb(168,8,8);">${userName}</span>.</h4>`,
        text: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sure",
        cancelButtonText: "Nope"
      }).then(result => {
        if (result.value) {
          this.$store.dispatch("hapusUser", { userID, role: "student" });
        } else {
        }
      });
    },
    searchEmail() {
      this.$store.dispatch("searchUserByEmail", {
        mymail: this.mymail,
        role: this.$route.params.module
      });
      this.mymail = "";
    },
    resendPassword(userID, userEmail) {
      let userData = {
        id: userID,
        value: userEmail
      };
      this.$store.dispatch("resendPassword", userData);
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  .flexing {
    display: flex;
  }
}
</style>
