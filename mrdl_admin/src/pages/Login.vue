<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-negative text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="YAkecil.jpg" />
          </q-avatar>
          Merry Riana Youtube Academy Admin
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="q-pa-md">
        <div
          class="q-gutter-y-md column"
          style="max-width: 300px; margin:auto; text-align:center;"
        >
          <div class="login-header">
            <div class="login-header-text">
              <img src="https://merryriana.com/youtubeacademy/images/aset.png" style="width: 200px;" />
            </div>
          </div>
          <q-input color="red" filled v-model="username" label="email">
            <template v-slot:prepend>
              <q-icon name="event" />
            </template>
          </q-input>
          <q-input  color="red" v-model="pass" filled :type="isPwd ? 'password' : 'text'" label="password">
             <template v-slot:prepend>
              <q-icon name="event" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <!-- <q-input color="red" filled v-model="pass" label="password">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-input> -->
          <q-btn
            class="glossy"
            rounded
            color="negative"
            label="Click To Sign In"
            :disabled="isDisable"
            @click="login"
          />
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      username: "",
      pass: "",
      isPwd: true
    };
  },
  methods: {
    isValidEmailAddress(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
      return re.test(String(email).toLowerCase());
    },
    login() {
      console.log(this.username, this.pass);
      axios({
        url: `${this.$store.state.baseURIUser}/loginAdmin`,
        method: "POST",
        data: {
          mymail: this.username,
          password: this.pass
        }
      })
        .then(response => {
          localStorage.setItem("api_token", response.data.access_token);
          this.$router.replace("/");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    isDisable() {
      if (
        this.username == null ||
        this.pass == null ||
        this.username === "" ||
        this.pass === "" ||
        this.isValidEmailAddress(this.username) === false
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login-header {
  background-color: rgb(180, 15, 15);
  color: whitesmoke;
  border-radius: 5px;
}
.login-header-text {
  padding: 10px;
  img{
    background-color: white;
    padding: 9px;
    border-radius:3%;
  }
}

</style>
