<template>
  <div class="q-pa-md q-gutter-sm" style="background-color:#ced1d6;">
    <div v-if="!moduleNya.sts" class="container">
      <div class="header">
        <div class="header-text">
          <h3>Activate Module {{ $route.params.module }} </h3>
        </div>
      </div>
      <div class="button-setting">
        <q-btn rounded color="negative" size="xl" label="Activate" @click="moduleButton(true)" />
      </div>
    </div>
     <div v-else class="container">
      <div class="header">
        <div class="header-text">
          <h3>Deactivate Module {{ $route.params.module }}</h3>
        </div>
      </div>
      <div class="button-setting">
        <q-btn rounded color="negative" size="xl" label="Deactivate" @click="moduleButton(false)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActivateModule",
  created() {
    this.$store.dispatch("getAllVideoDatas", this.$route.params.module);
  },
  data() {
    return {
      sizes: ["xs", "sm", "md", "lg", "xl"],
      icons: [
        "navigation",
        "add_a_photo",
        "camera",
        "camera_front",
        "my_location"
      ]
    };
  },
  computed: {
    moduleNya() {
      return this.$store.state.module;
    }
  },
  methods: {
    moduleButton(sts) {
       
        this.$store.dispatch("forModuleSts",  {moduleID:this.moduleNya.id, sts})
    }
  }
};
</script>

<style scoped>
.header{
   background-color: rgb(146, 14, 14);
   border-radius: 1%;
}
.header-text {
   
  /* max-width: 300px; */
  
  /* margin: auto; */
  text-align: center;
  /* padding: 2px; */
}
.header-text h3 {
  text-align: center;
  color: whitesmoke;
  padding: 20px;
  /* background-color: black; */
  max-width: 50%;
  margin-left: 25%;
  /* margin: auto; */
}
.container {
  /* max-width: 600px;
  margin: auto; */
   text-align: center;
}
/* .button-setting{
    text-align: center;
} */
</style>
