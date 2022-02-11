<template>
  <ui-container>
    <ui-title-heading :avatar="avatar_url"></ui-title-heading>

    <ui-alert ref="alert"></ui-alert>

    <div class="main-content">
      <ui-panel :title="$t('message.newPoll')">
        <ui-button
          slot="action"
          type="button"
          @click="generate"
          :disabled="loading"
          preset="primary"
          title="Generate the poll"
        >
          <ui-loader v-if="loading"></ui-loader>
          <span v-else>{{ $t("message.generate") }}</span>
        </ui-button>

        <div slot="body">
          <h4>{{ $t("message.question") }}</h4>
          <ui-input
            class="question-input"
            @change="changeQuestion"
            type="text"
            :placeholder="$t('message.askQuestion')"
          >
          </ui-input>

          <div class="options-title">
            <h4>
              {{ $t("message.options")
              }}<span v-if="isMulti"> ({{ $t("message.multiple") }})</span>
            </h4>
            <toggle-button :value="false" color="#43458B" @change="toggle" />
          </div>

          <draggable
            v-model="options"
            :options="{ group: 'options', handle: '.handle' }"
            class="inner"
          >
            <poll-option
              v-for="(option, index) in options"
              :key="option.id"
              :option="option"
              :index="index"
              :error="errors[option.id]"
              :solo="options.length === 1"
              ref="options"
              @change="change"
              @remove="rm"
            >
            </poll-option>
          </draggable>

          <ui-button type="button" @focus="trigger" @click="add" ref="add">
            {{ $t("message.addAnotherOption") }}
          </ui-button>
        </div>
      </ui-panel>

      <setting @dateChange="dateChange" />

      <tip :content="$t('message.createTip')"></tip>
    </div>
  </ui-container>
</template>

<script>
import i18n from "./i18n";
import axios from "axios";
import config from "./config";
import * as utils from "./utils";
import Draggable from "vuedraggable";
import UiContainer from "./components/UiContainer";
import UiPanel from "./components/UiPanel";
import UiButton from "./components/UiButton";
import UiAlert from "./components/UiAlert";
import UiInput from "./components/UiInput";
import UiLoader from "./components/UiLoader";
import UiTitleHeading from "./components/UiTitleHeading";
import Tip from "./components/Tip";
import PollOption from "./components/PollOption";
import CopyButton from "./components/CopyButton";
import Setting from "./components/Setting";
import { ToggleButton } from "vue-js-toggle-button";

export default {
  name: "create",
  data() {
    return {
      question: "",
      options: [{ text: "", id: 0 }],
      dueDate: "",
      loading: false,
      multiAnswer: false,
      errors: {},
      counter: 0,
      avatar_url: "",
    };
  },
  computed: {
    isMulti() {
      return this.multiAnswer;
    },
  },
  methods: {
    trigger() {
      // @REFACTOR: Find a way to isolate this.
      // e.g., allowing inner-ref like React.
      this.$refs.add.$el.click();
    },

    add() {
      this.counter = this.counter + 1;
      this.options.push({ id: this.counter + 1, text: "" });

      this.$nextTick(() => {
        this.$refs.options[this.$refs.options.length - 1].focus();
      });
    },

    change({ index, value }) {
      this.options[index].text = value;
    },

    dateChange(date) {
      this.dueDate = date;
    },

    changeQuestion(evt) {
      this.question = evt.target.value;
    },

    rm(i) {
      if (this.options.length > 1) {
        this.options.splice(i, 1);
      }
    },

    toggle({ value, _ }) {
      console.log(value);
      this.multiAnswer = value;
    },

    generate() {
      if (this.loading) {
        return;
      }

      if (this.options.some((o) => !o.text.length)) {
        this.errors = utils.objectify(
          this.options.filter((o) => !o.text.length).map((o) => o.id),
          true
        );
        this.$refs.alert.notify("error", i18n.t("message.forgetOption"));
        return;
      }

      if (!this.dueDate) {
        this.$refs.alert.notify("error", i18n.t("message.forgetDueDate"));
        return;
      }

      this.errors = {};
      this.loading = true;

      return axios
        .post("/poll", {
          question: this.question,
          options: this.options.map((o) => o.text),
          multi_answer: this.multiAnswer,
          due_date: this.dueDate,
        })
        .then(
          (res) => {
            this.$refs.alert.notify("success", i18n.t("message.createSuccess"));
            this.loading = false;
            window.location.href = `${config.baseUrl}/poll/${res.data.id}`;
          },
          (err) => {
            this.$refs.alert.notify("error", i18n.t("message.createError"));
            this.loading = false;
            if (err.response.status === 401) {
              window.location.href = err.response.data;
            }
          }
        );
    },
  },
  mounted() {
    axios.get("/me").then(
      (res) => {
        this.avatar_url = res.data.avatar_url;
        console.log(this.avatar_url);
      },
      (err) => {
        if (err.response.status === 401) {
          window.location.href = err.response.data;
        }
      }
    );

    if (window.MixinContext) {
      i18n.locale = JSON.parse(window.MixinContext.getContext()).locale;
    }
  },
  components: {
    CopyButton,
    Draggable,
    PollOption,
    Tip,
    UiContainer,
    UiAlert,
    UiInput,
    UiPanel,
    UiButton,
    UiLoader,
    UiTitleHeading,
    Setting,
    ToggleButton,
  },
};
</script>

<style>
:root {
  --color-white: #fff;
  --color-black: #000;
  --color-light-silver: #f9fafb;
  --color-dark-silver: #8898aa;
  --color-silver: #d9e3ed;
  --color-gray: #b4b4b4;
  --color-dark-gray: #434343;
  --color-red: #fc6d6b;
  --color-info: #1e6ef9;
  --color-green: #01dc87;
  --color-lavender: #43458b;
  --color-light-lavender: #6466bf;
  --drop-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  --drop-shadow-lower: 0px 4px 4px rgba(0, 0, 0, 0.1);
  --border-radius: 4px;
  --form-size: 40px;
  --font-size: 14px;
  --font-size-small: 10px;
  --fa-size-regular: 20px;
  --font-smallee: 12px;
  --font-family: "Source Sans Pro", San Francisco, -apple-system,
    BlinkMacSystemFont, ".SFSNText-Regular", Segoe UI, Ubuntu, Helvetica,
    sans-serif;
  --font-montserrat: "Montserrat", San Francisco, -apple-system,
    BlinkMacSystemFont, ".SFSNText-Regular", Segoe UI, Ubuntu, Helvetica,
    sans-serif;
}

* {
  box-sizing: border-box;
}

html,
body {
  color: var(--color-black);
  font-family: var(--font-family);
  font-size: var(--font-size);
  background: var(--color-light-silver);
}

.preview-box {
  text-align: center;
}

.main-content {
  margin-bottom: 160px;
}

.options-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 16px;
  padding-top: 0px;
}

/**
   * https://github.com/Justineo/vue-awesome#styling
   */
.fa-icon {
  width: auto;
  height: 1em; /* or any other relative font sizes */

  /* You would have to include the following two lines to make this work in Safari */
  max-width: 100%;
  max-height: 100%;
}

.mx-calendar-content .cell.active {
  background-color: var(--color-light-lavender);
}

.mx-input:hover,
.mx-input:focus {
  border-color: var(--color-light-lavender);
}
.mx-btn:hover,
.mx-btn:focus,
.mx-table-date .today,
.mx-time-column .mx-time-item.active {
  color: var(--color-light-lavender);
}
</style>
