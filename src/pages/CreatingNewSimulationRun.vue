<template>
    <div>
      <header>
        <h1>Create new simulaton run</h1>
        <hr>
      </header>
      <el-row>
        <el-col :span="8">
          <h2>Select scenario to run</h2>
          <ul>
             <input type="checkbox"> All scenarios    <br>
             <input type="checkbox"> Anoka Expressway <br>
             <input type="checkbox"> Baseline_skims   <br>
             <input type="checkbox"> Satellite Campus Cluster <br>
             <input type="checkbox"> Transit expansion <br>
             <input type="checkbox"> University Expansion <br>
             <input type="checkbox"> Upzone 
          </ul>
        </el-col>
        <el-col :span="8">
          <h2>Run Setup</h2>
          End Year: <el-input-number v-model="num1" controls-position="right" @change="handleChange" :min="2010" ></el-input-number>
          <br>
          <br>
          <br>
          Random Seed(optional):  <el-input-number v-model="num2" controls-position="right" @change="handleChange" :min=0 ></el-input-number>
          <br>
          <br>
          <br>
          <span>
            Calibrated Coefficients:   
            <el-switch
                v-model="value"
                active-color="#blue"
                inactive-color="#gray">
            </el-switch>
          </span>
        </el-col>
      </el-row>
      <hr>
      <footer>
      <el-button type="danger"  class="mybb1"  size="medium">Cancel</el-button>
      <el-button type="success"  class="mybb2" size="medium" >Start Run</el-button>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CreatingNewSimulationRun',
    data() {
      return {
        num1: 2010,
        num2:0,
        value:true,
        checkList:["All scenarios","Anoka Expressway","Baseline_skims","Satellite Campus Cluster",
        "Transit expansion","University Expansion","Upzone"]
      };
    },
    methods: {
      handleChange(value) {
        console.log(value);
      }
    },
    components: {
    }
  }
  </script>
    