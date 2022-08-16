<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap>
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
            <el-button type="primary" v-if="!form.id" @click="addNewChart">Create</el-button>
            <el-button type="primary" v-else @click="updateChart">Update</el-button>
          </div>
        </el-dialog>
    </v-layout>
    <v-layout row wrap>
      <!-- Widgets Ends -->
      <!-- Statistics -->
      <draggable
        :list="listChart"
        :animation="200"
        ghost-class="moving-card"
        group="listChart"
        filter=".action-button"
        class="row"
        style="display: flex; flex-wrap: wrap"
      >
        <v-flex d-flex v-for="(item, index) in listChart" :key="index">
          <!-- <site-view-statistic /> -->
          <v-card class="card">
            <v-card-text class="pa-2">
              <span class="icon-settings">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        large
                        class="mr-2"
                        color="primary"
                        v-bind="attrs"
                        v-on="on"
                        @click="showDialogUpdateChart(item)"
                      >
                        mdi-cog
                      </v-icon>
                    </template>
                    <span>Settings</span>
                  </v-tooltip>
              </span>
              <template v-if="item.type === 'pie'">
                <pie-chart
                  :data="item.data"
                  legend="right"
                  :donut="true"
                  class="chart"
                ></pie-chart>
              </template>
              <template v-else-if="item.type === 'line'">
                <line-chart
                  :data="item.data"
                  :colors="['#8b47d8']"
                  :xtitle="item.xtitle"
                  :ytitle="item.ytitle"
                  :dataset="{ borderWidth: 3 }"
                  class="chart"
                ></line-chart>
              </template>
            </v-card-text>
          </v-card>
        </v-flex>
      </draggable>
    </v-layout>
  </v-container>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "Dashboard",
  components: {
    draggable,
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
    };
  },
  methods: {
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
      // this.countIndex++;
      this.form.listData.forEach((item, index) => {
        console.log(item.modelData, item.modelSeries, "item");
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
                id: Date.now(),
              });
              this.dataChartPie = [];
            }

            break;
          case "line":
            this.datalineChart.push([item.modelData, item.modelSeries]);
            if (index == this.form.listData.length - 1) {
              this.listChart.push({
                type: "line",
                id: Date.now(),
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
      console.log("list", this.listChart);
      this.initForm();
      if (this.idErrorArr.length > 0 || this.titleErrorArr.length > 0) {
        return;
      }
      this.dialogVisible = false;
    },
    showDialogUpdateChart(item) {
      console.log("update", item);
      if (item.type === 'pie') {
        this.form.type = 'pie';
      } else if (item.type === 'line') {
        console.log("vào đây iffff lese", item.type);
        this.form.type = 'line';
        this.form.xtitle = item.xtitle;
        this.form.ytitle = item.ytitle;
      }
      console.log("filter", this.form);
      this.form.id = item.id;
      this.form.listData = [];
      item.data.forEach(el => {
        this.form.listData.push({
          modelData: el[0],
          modelSeries: el[1]
        });
      });
      this.dialogVisible = true;
      console.log("log chart", this.listChart);
    },
    updateChart() {
      console.log(this.form, this.listChart);
      let infoChart = this.listChart.find(element => element.id = this.form.id);
      console.log("item update", infoChart);
      // infoChart.data = [];
      // this.form.listData.forEach(item => {
      //   infoChart.data.push([item.modelData, item.modelSeries])
      // });
      // if (infoChart.type === 'line') {
      //   infoChart.xtitle = this.form.xtitle;
      //   infoChart.ytitle = this.form.ytitle;
      // }
      // this.initForm();
      // this.dialogVisible = false;
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
.icon-settings {
  display: block;
  text-align: right;
}
.chart {
  position: relative;
  top: -16px;
}
</style>
