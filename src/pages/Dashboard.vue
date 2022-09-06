<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap>
      <v-row>
        <v-btn @click="dialogVisible = true" color="info">Add Chart</v-btn>
        <!-- <el-dialog :visible.sync="dialogVisible"> -->
        <el-dialog
          :visible="dialogVisible"
          :before-close="beforeClose"
          width="50%"
          title="Them moi bieu do"
        >
          <el-form :model="form">
            <el-form-item label="Type" label-width="200">
              <el-select
                v-model="form.type"
                placeholder="Chon kieu chart"
                size="medium"
                style="width: 90%; margin-left: 10px"
              >
                <el-option label="Pie Chart" value="pie"></el-option>
                <el-option label="Line Chart" value="line"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="form.type !== 'pie'" label="Title">
              <v-layout>
                <v-flex d-flex lg4 sm6 xs12>
                  <el-input
                    v-model="form.xtitle"
                    placeholder="Title chieu ngang"
                    auto-complete="off"
                    size="medium"
                  ></el-input>
                </v-flex>
                <v-flex d-flex lg4 sm6 xs12>
                  <el-input
                    v-model="form.ytitle"
                    auto-complete="off"
                    placeholder="Title chieu doc"
                    size="medium"
                  ></el-input>
                </v-flex>
              </v-layout>
            </el-form-item>
            <el-form-item label="Data" label-width="400">
              <template v-if="form.listData.length > 0">
                <v-layout
                  v-for="(item, index) in form.listData"
                  :key="index"
                  class="padding-54__not-first-child"
                >
                  <v-flex d-flex lg4 sm6 xs12>
                    <div>
                      <el-input
                        v-model="item.modelData"
                        placeholder="data input"
                        style="width: 200px"
                      ></el-input>
                      <span
                        v-if="titleErrorArr.includes(index)"
                        class="message-error"
                        >Required</span
                      >
                    </div>
                    <div>
                      <el-input-number
                        style="padding-left: 20px"
                        v-model="item.modelSeries"
                        controls-position="right"
                        placeholder="nhap so"
                      ></el-input-number>
                      <span
                        class="message-error"
                        v-if="idErrorArr.includes(index)"
                        >Required</span
                      >
                    </div>
                  </v-flex>
                </v-layout>
              </template>

              <v-layout>
                <v-flex d-flex lg4 sm6 xs12>
                  <v-btn @click="addNewData">add data</v-btn>
                </v-flex>
              </v-layout>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">Close</el-button>
            <el-button type="primary" @click="addNewChart">create</el-button>
          </div>
        </el-dialog>
      </v-row>
    </v-layout>
    <div>
      <grid-layout
        :layout.sync="layout"
        :col-num="6"
        :rowHeight="360"
        :is-draggable="true"
        :is-resizable="true"
        :is-mirrored="false"
        :vertical-compact="true"
        :margin="[10, 10]"
        :use-css-transforms="true"
      >
        <grid-item
          v-for="item in layout"
          :x.sync="item.x"
          :y.sync="item.y"
          :w.sync="item.w"
          :h.sync="item.h"
          :i="item.i"
          :key="item.i"
          @resized="resizedEvent"
          class="chart-item"
        >
          <div v-if="item.chart">
            <Highcharts
              :options="options"
              :style="{ width: item.width + 'px', height: item.height + 'px' }"
              :autoresize="true"
            />
          </div>
        </grid-item>
      </grid-layout>
    </div>
  </v-container>
</template>

<script>
import Highcharts from "highcharts";
import loadMap from "highcharts/modules/map.js";
import { genComponent } from "vue-highcharts";
import loadStock from "highcharts/modules/stock.js";
import loadGantt from "highcharts/modules/gantt.js";
import loadDrilldown from "highcharts/modules/drilldown.js";
import loadHighchartsMore from "highcharts/highcharts-more.js";
import loadSolidGauge from "highcharts/modules/solid-gauge.js";
import VueGridLayout from "vue-grid-layout";

loadStock(Highcharts);
loadMap(Highcharts);
loadGantt(Highcharts);
loadDrilldown(Highcharts);
loadHighchartsMore(Highcharts);
loadSolidGauge(Highcharts);
// loadMap(Highcharts);
var testLayout = [
  { x: 0, y: 0, w: 2, h: 1, i: "0", width: "350", height: "350" },
  { x: 2, y: 0, w: 2, h: 1, i: "1", width: "350", height: "350" },
  { x: 4, y: 0, w: 2, h: 1, i: "2", width: "350", height: "350" },
  { x: 0, y: 3, w: 2, h: 1, i: "3", width: "350", height: "350" },
  { x: 2, y: 5, w: 2, h: 1, i: "4", width: "350", height: "350" },
  { x: 4, y: 6, w: 2, h: 1, i: "5", width: "350", height: "350" },
  { x: 0, y: 6, w: 2, h: 1, i: "6", width: "350", height: "350" },
];
export default {
  name: "Dashboard",
  components: {
    Highcharts: genComponent("Highcharts", Highcharts),
    Highmaps: genComponent("Highmaps", Highcharts),
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
  },
  data() {
    return {
      lorem: `Lorem ipsum dolor sit amet, mel at clita quando.`,
      dialogVisible: false,
      form: {
        type: "pie",
        xtitle: "",
        ytitle: "",
        listData: [],
      },
      dataChartPie: [],
      datalineChart: [],
      idErrorArr: [],
      titleErrorArr: [],
      listChart: [],
      countIndex: 0,
      layout: testLayout.map((i) => ({ ...i, chart: true })),
      options: {
        title: {
          text: "Monthly Average Temperature",
          x: -20, //center
        },
        subtitle: {
          text: "Source: WorldClimate.com",
          x: -20,
        },
        xAxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
        yAxis: {
          title: {
            text: "Temperature (°C)",
          },
          plotLines: [
            {
              value: 0,
              width: 1,
              color: "#808080",
            },
          ],
        },
        tooltip: {
          valueSuffix: "°C",
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle",
          borderWidth: 0,
        },
        series: [
          {
            type: "pie",
            name: "Tokyo",
            data: [
              7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9,
              9.6,
            ],
          },
          {
            name: "New York",
            data: [
              -0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6,
              2.5,
            ],
          },
          {
            name: "Berlin",
            data: [
              -0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0,
            ],
          },
          {
            name: "London",
            data: [
              3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8,
            ],
          },
        ],
      },
    };
  },
  methods: {
    resizedEvent(i, newH, newW, newHPx, newWPx) {
      this.layout = this.layout.map((item) => {
        if (item.i === i) {
          console.log(item.width);
          console.log(item.height);
          item.width = newWPx;
          item.height = newHPx;
          item.chart = false;
        }
        return item;
      });
      setTimeout(() => {
        this.layout = this.layout.map((item) => {
          if (item.i === i) {
            item.width = newWPx;
            item.height = newHPx;
            item.chart = true;
          }
          return item;
        });
      }, 100);
    },
    initForm() {
      this.form = {
        type: "pie",
        xtitle: "",
        ytitle: "",
        listData: [],
      };
    },
    beforeClose(done) {
      this.dialogVisible = false;
      done();
    },
    addNewData() {
      if (this.form.listData.length < 10) {
        this.form.listData.push({
          modelData: "",
          modelSeries: 0,
        });
      }
    },
    addNewChart() {
      this.idErrorArr = [];
      this.titleErrorArr = [];
      this.countIndex++;
      this.form.listData.forEach((item, index) => {
        if (item.modelSeries === 0) {
          this.idErrorArr.push(index);
        }
        if (!item.modelData) {
          this.titleErrorArr.push(index);
        }
        switch (this.form.type) {
          case "pie":
            this.dataChartPie.push([item.modelData, item.modelSeries]);
            if (index == this.form.listData.length - 1) {
              this.listChart.push({
                type: "pie",
                data: this.dataChartPie,
                id: this.countIndex,
              });
              this.dataChartPie = [];
            }

            break;
          case "line":
            this.datalineChart.push([item.modelData, item.modelSeries]);
            if (index == this.form.listData.length - 1) {
              this.listChart.push({
                type: "line",
                id: this.countIndex,
                data: this.datalineChart,
                xtitle: this.form.xtitle,
                ytitle: this.form.ytitle,
              });
              this.datalineChart = [];
            }

          default:
            break;
        }
      });
      this.initForm();
      if (this.idErrorArr.length > 0 || this.titleErrorArr.length > 0) {
        return;
      }
      this.dialogVisible = false;
    },
    isNumber(value) {
      return typeof value === "number" && isFinite(value);
    },

    isNumberObject(n) {
      return Object.prototype.toString.apply(n) === "[object Number]";
    },

    isCustomNumber(n) {
      return this.isNumber(n) || this.isNumberObject(n);
    },
  },
};
</script>

<style scoped>
.padding-54__not-first-child:not(:first-child) {
  padding-left: 54px;
}
.message-error {
  display: block;
  padding-left: 20px;
  line-height: 34px;
  position: relative;
  bottom: 6px;
  color: rgb(248, 123, 123);
}
.card {
  border-radius: 3px;
  background-clip: border-box;
  border: 1px solid rgba(122, 117, 117, 0.125);
  box-shadow: 1px 1px 1px 1px rgba(122, 117, 117, 0.125);
  background-color: transparent;
}
.moving-card {
  opacity: 0.5;
  background: #f7fafc;
  border: 1px solid #4299e1;
}
</style>

<style>
body {
  background-color: #fafbfc;
}

.highchart {
  width: 100%;
  height: 300px; /* or e.g. 400px */
}
#app {
  max-width: 1170px;
  margin: auto;
}
#content {
  width: 100%;
}

.vue-grid-layout {
  /* background: #eee; */
}

.layoutJSON {
  background: #ddd;
  border: 1px solid black;
  margin-top: 10px;
  padding: 10px;
}

.eventsJSON {
  background: #ddd;
  border: 1px solid black;
  margin-top: 10px;
  padding: 10px;
  height: 100px;
  overflow-y: scroll;
}

.columns {
  -moz-columns: 120px;
  -webkit-columns: 120px;
  columns: 120px;
}

.vue-grid-item:not(.vue-grid-placeholder) {
  /* background: #ccc; */
  /* border: 1px solid black; */
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0 0 40px hsla(0, 0%, 88.6%, 0.5);
}
.vue-grid-item.vue-grid-placeholder {
  background-color: #cccccc;
  border-radius: 5px;
}
.vue-grid-item.resizing {
  opacity: 0.9;
}

.vue-grid-item.static {
  background: #cce;
}

.vue-grid-item {
  /* display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  text-transform: capitalize;
  font-family: sans-serif; */
}
.vue-grid-item .text {
  font-size: 24px;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 100%;
  width: 100%;
}

.vue-grid-item .no-drag {
  height: 100%;
  width: 100%;
}
.vue-grid-item.vue-draggable-dragging {
  box-shadow: 0 0 20px hsla(0, 0%, 0%, 0.5);
}

.vue-grid-item .minMax {
  font-size: 12px;
}

.vue-grid-item .add {
  cursor: pointer;
}

/* .vue-draggable-handle {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    left: 0;
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'>
    <circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat;
    background-position: bottom right;
    padding: 0 8px 8px 0;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    cursor: pointer;
} */
</style>

