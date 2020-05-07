<template>
  <v-container fluid>
    <v-form>
      <v-file-input
        label="Selecione as legendas"
        prepend-icon="mdi-message-text"
        append-outer-icon="mdi-send"
        multiple
        chips
        v-model="files"
        @click:append-outer="processSubtitles"
      />
    </v-form>
    <div class="pills">
      <Pill v-for="word in groupedWords" :key="word.name" :name="word.name" :amount="word.amount" />
    </div>
  </v-container>
</template>

<script>
import Pill from "./Pill";
import { ipcRenderer } from "electron";

export default {
  name: "Home",
  components: {
    Pill
  },
  data: function() {
    return {
      files: [],
      groupedWords: []
    };
  },
  methods: {
    processSubtitles() {
      const paths = this.files.map(file => {
        return file.path;
      });

      ipcRenderer.send("processSubtitles", paths);

      ipcRenderer.on("processSubtitles", (event, words) => {
        this.groupedWords = words;
      });
    }
  }
};
</script>

<style>
.pills {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>