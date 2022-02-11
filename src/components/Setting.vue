<template>
  <div class="setting">
    <div class="due-date">
      <h4 class="title">
        {{ $t("message.dueDate") }}
      </h4>
      <date-picker
        v-model="date"
        type="datetime"
        :lang="lang"
        :editable="false"
        :placeholder="$t('message.selectDatetime')"
        :default-value="new Date()"
        :disabled-date="notBeforeToday"
        :disabled-time="notBeforeNow"
        @change="change"
      ></date-picker>
    </div>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  name: "settings",
  data: () => ({
    date: new Date(Date.now() + 3600 * 1000 * 24),
    lang: {
      formatLocale: {
        firstDayOfWeek: 1,
      },
      monthBeforeYear: false,
    },
  }),
  methods: {
    change(date) {
      if (date) {
        this.$emit("dateChange", date.toUTCString());
      } else {
        this.$emit("dateChange", "");
      }
    },

    notBeforeToday(date) {
      return date < new Date(new Date().setHours(0, 0, 0, 0));
    },
    notBeforeNow(date) {
      return date.getTime() < Date.now();
    },
  },
  mounted() {
    this.$emit("dateChange", this.date.toUTCString());
  },
  components: {
    DatePicker,
  },
};
</script>

<style scoped>
.setting {
  padding: 16px;
  background: var(--color-white);
  border: 1px solid var(--color-silver);
  border-top: 0px;
}

.setting > .due-date > .title {
  margin: 0;
  margin-bottom: 16px;
}

.datePick {
  margin-bottom: 16px;
}
</style>
