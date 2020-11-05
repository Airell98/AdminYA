<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-negative text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          <q-avatar>
            <img src="YAkecil.jpg" />
          </q-avatar>
          Merry Riana Youtube Academy Admin
        </q-toolbar-title>

        <q-btn @click="logOut" flat round dense icon="power_settings_new" />
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="left"
      side="left"
      elevated
      content-class="bg-grey-7"
    >
      <q-list
        v-if="this.allModules.length > 0"
        padding
        style="margin-top: 150px;"
      >
        <div v-for="(eachModule, index) in this.allModules" :key="index">
          <q-card class="my-card">
            <q-expansion-item
              expand-separator
              icon="table_view"
              :label="eachModule.name"
              content-class="text-black"
              header-class=" bg-negative text-white"
            >
              <q-card>
                <q-item
                  clickable
                  @click="accessTablePage(eachModule.id, eachModule.type)"
                  v-ripple
                  :active="
                    $router.currentRoute.fullPath === '/table/' + eachModule.id
                  "
                  active-class="bg-black text-deep-orange-5"
                >
                  <q-item-section avatar>
                    <q-icon name="check_circle" />
                  </q-item-section>
                  <q-item-section>Table {{ eachModule.name }}</q-item-section>
                </q-item>
              </q-card>
              <q-item
                clickable
                @click="activateModule(eachModule.id)"
                v-ripple
                :active="
                  $router.currentRoute.fullPath ===
                    '/module_setting/' + eachModule.id
                "
                active-class="bg-black text-deep-orange-5"
              >
                <q-item-section avatar>
                  <q-icon name="power_settings_new" />
                </q-item-section>
                <q-item-section>Module {{ index + 1 }} Settings</q-item-section>
              </q-item>
            </q-expansion-item>
          </q-card>
        </div>

        <!-- expansion item ke 2 -->
        <q-card class="my-card">
          <q-expansion-item
            expand-separator
            icon="table_view"
            label="Add Subject"
            content-class="text-black"
            header-class=" bg-negative text-white"
          >
            <q-card class="bg-white my-card">
              <q-item
                clickable
                @click="accessPageCreateVideo()"
                v-ripple
                :active="$router.currentRoute.fullPath === '/'"
                active-class="bg-black text-deep-orange-5"
              >
                <q-item-section avatar>
                  <q-icon name="add" />
                </q-item-section>
                <q-item-section>Add Video</q-item-section>
              </q-item>
            </q-card>
            <q-card class="bg-white my-card">
              <q-item
                clickable
                @click="accessPageCreatePPT()"
                v-ripple
                :active="$router.currentRoute.fullPath === '/createPPT'"
                active-class="bg-black text-deep-orange-5"
              >
                <q-item-section avatar>
                  <q-icon name="add" />
                </q-item-section>
                <q-item-section>Add PPT</q-item-section>
              </q-item>
            </q-card>
          </q-expansion-item>
        </q-card>
        <!-- 
        <q-card class="bg-negative my-card"> </q-card> -->

        <q-card class="my-card">
          <q-expansion-item
            expand-separator
            icon="table_view"
            label="Users"
            content-class="text-black"
            header-class=" bg-negative text-white"
          >
            <q-card class="bg-white my-card">
              <q-item
                clickable
                @click="accessStudentListsTable()"
                v-ripple
                :active="$router.currentRoute.fullPath === '/table/student'"
                active-class="bg-black text-deep-orange-5"
              >
                <q-item-section avatar>
                  <q-icon name="perm_identity" />
                </q-item-section>
                <q-item-section>Students</q-item-section>
              </q-item>
            </q-card>

            <q-card class="bg-white my-card">
              <q-item
                clickable
                @click="accessCoachListsTable()"
                v-ripple
                :active="$router.currentRoute.fullPath === '/table/crew'"
                active-class="bg-black text-deep-orange-5"
              >
                <q-item-section avatar>
                  <q-icon name="perm_identity" />
                </q-item-section>
                <q-item-section>Crews</q-item-section>
              </q-item>
            </q-card>
          </q-expansion-item>
        </q-card>
      </q-list>
      <!-- drawer content -->
      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-black">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">Admin</div>
          <div>admin@merryrianadigitallearning.com</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import router from "../router";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      left: false,
      active: true
    };
  },
  created() {
    if (!localStorage.api_token) {
      this.$router.push("/login");
    } else {
      this.$store.dispatch("getAllModules");
    }
  },
  computed: {
    allModules() {
      return this.$store.state.allModules;
    },

    moduleNya() {
      return this.$store.state.module;
    }
  },
  methods: {
    accessTablePage(moduleID, moduleType) {
      this.$store.state.kondisi = false;
      this.$store.dispatch("getAllVideoDatas", moduleID);

      this.$router.push(`/table/${moduleID}`);
    },
    accessPageCreateVideo() {
      this.$router.push("/");
    },

    activateModule(moduleID) {
      Swal.fire({
        title: "Activate/Deactivate Module 1",
        text: "Choose one of the buttons",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Deactivate!",
        confirmButtonText: "Activate!"
      }).then(result => {
        if (result.value) {
          let activate = true;

          this.$store.dispatch("forModuleSts", {
            moduleID: moduleID,
            sts: activate
          });
        } else if (!result.value) {
          let deactivate = false;
          // this.$store.state.kondisi = false;
          this.$store.dispatch("forModuleSts", {
            moduleID: moduleID,
            sts: deactivate
          });
        }
      });
    },
    accessStudentListsTable() {
       this.$store.state.kondisi = false;
      this.$router.push("/table/student");
       this.$store.dispatch("getAllUserDatas", "student");
    },
    accessCoachListsTable() {
      this.$store.state.kondisi = false;
      this.$router.push("/table/crew");
       this.$store.dispatch("getAllUserDatas", "crew");
    },

    accessPageCreatePPT() {
      this.$router.push("/createPPT");
    },
    logOut() {
      localStorage.clear();
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.my-menu-link {
  background-color: red;
}
.my-card {
  margin-bottom: 10px;
}
</style>
