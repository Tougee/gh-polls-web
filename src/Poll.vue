<template>
  <ui-container>
    <ui-title-heading :avatar="avatar_url"></ui-title-heading>

    <ui-alert ref="alert"></ui-alert>

    <div class="main-content">
      <ui-panel :title="$t('message.generatedPoll')">
        <div slot="body">
          <h4>
            {{ question
            }}<span v-if="isMulti"> ({{ $t("message.multiple") }})</span>
          </h4>
          <div class="preview-box">
            <div v-for="o in options" :key="o.text">
              <img
                :src="buildSrc(o.text)"
                alt=""
                @click="vote(o.text)"
                :id="o.text"
                class="option-img"
              />
            </div>
          </div>
        </div>
      </ui-panel>

      <tip :content="$t('message.shareTip')"></tip>
    </div>
  </ui-container>
</template>

<script>
import i18n from "./i18n";
import axios from "axios";
import config from "./config";
import Draggable from "vuedraggable";
import UiContainer from "./components/UiContainer";
import UiPanel from "./components/UiPanel";
import UiButton from "./components/UiButton";
import UiAlert from "./components/UiAlert";
import UiLoader from "./components/UiLoader";
import UiTitleHeading from "./components/UiTitleHeading";
import Tip from "./components/Tip";
import PollOption from "./components/PollOption";
import CopyButton from "./components/CopyButton";

export default {
  name: "poll",
  data() {
    return {
      question: "",
      options: [{ text: "" }],
      multiAnswer: false,
      id: "",
      avatar_url: "",
    };
  },
  methods: {
    vote(option) {
      if (!option) return;

      axios
        .get(`/poll/${this.id}/${option}/vote`)
        .then((res) => {
          if (res.data && res.data.error && res.data.error == 10000) {
            this.$refs.alert.notify("error", i18n.t("message.alreadyVote"));
          } else {
            var imgs = document.getElementsByClassName("option-img");
            if (imgs) {
              Array.from(imgs).map((img) => {
                img.src = `${config.api}/poll/${this.id}/${img.id}?${Date.now()}`;
              })
              this.$refs.alert.notify("success", i18n.t("message.voteSuccess"));
            } else {
              this.$refs.alert.notify(
                "error",
                i18n.t("message.optionNotFound")
              );
            }
          }
        })
        .catch((err) => {
          this.$refs.alert.notify("error", err);
        });
    },

    buildSrc(option) {
      return `${config.api}/poll/${this.id}/${option}`;
    },
  },
  computed: {
    isMulti() {
      return this.multiAnswer;
    },
  },
  mounted() {
    axios.get("/me").then(
      (res) => {
        this.avatar_url = res.data.avatar_url;
      },
      (err) => {
        if (err.response.status === 401) {
          window.location.href = `${err.response.data}&return_to=${window.location.href}`;
        }
      }
    );

    if (window.MixinContext) {
      i18n.locale = JSON.parse(window.MixinContext.getContext()).locale;
    }

    var href = window.location.href;
    var questionMarkIndex = href.indexOf("?");
    var postIndex = questionMarkIndex != -1 ? questionMarkIndex : href.length;
    var pollId = href.substring(href.lastIndexOf("/") + 1, postIndex);
    this.id = pollId;

    if (!pollId) return;

    axios.get(`/poll/${pollId}`).then(
      (res) => {
        this.question = res.data.question;
        if (res.data.question) {
          document.title = res.data.question;
        }
        this.options = res.data.options.map((option) => {
          return { text: option };
        });
        this.multiAnswer = res.data.multi_answer;
      },
      (err) => {
        if (err.response.status === 404) {
          this.$refs.alert.notify("error", i18n.t("message.pollNotFound"));
        } else if (err.response.status === 401) {
          window.location.href = `${err.response.data}&return_to=${window.location.href}`;
        }
      }
    );
  },
  components: {
    CopyButton,
    Draggable,
    PollOption,
    Tip,
    UiContainer,
    UiAlert,
    UiPanel,
    UiButton,
    UiLoader,
    UiTitleHeading,
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
</style>