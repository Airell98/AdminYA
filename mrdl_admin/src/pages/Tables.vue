<template>
  <div class="table-container">
    
<div v-if="this.$route.params.module === 'student'">
   <Usertable/>
</div>

<div v-else-if="this.$route.params.module == 'crew'">
   <Coachtable/>
</div>
    <div v-else-if="this.$store.state.module.type == 'allVideos'">
      <VideoTable />
    </div>

    <div v-else-if="this.$store.state.module.type == 'mixed'">
      <PPTtable />
    </div>
  </div>
</template>

<script>
import VideoTable from "../components/VideoTable.vue";
import PPTtable from "../components/PPT_Table.vue";
import Usertable from "../components/UserTable.vue";
import Coachtable from "../components/CoachTable.vue";
export default {
  components: {
    VideoTable,
    PPTtable,
    Usertable,
    Coachtable
  },
  created() {
    
  }
};
</script>

<style></style>
