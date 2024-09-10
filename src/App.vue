<template>
  <div class="tableBox">
    <el-form ref="form" :model="form" label-width="80px" style="display: flex; justify-content: space-evenly;">
      <!--      -->
      <el-form-item label="任务状态">
        <el-select v-model="form.status" placeholder="请选择任务状态" clearable>
          <el-option label="未完成" value="0"></el-option>
          <el-option label="已完成" value="1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="时间范围">
        <el-date-picker v-model="form.time" type="daterange" range-separator="至" start-placeholder="开始日期"
                        end-placeholder="结束日期" value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </el-form-item>

    </el-form>

    <el-table :data="list" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column>
        <el-switch
            v-model="list"
            active-color="#13ce66"
            inactive-color="#ff4949">
        </el-switch>
      </el-table-column>
      <el-table-column v-for=" item in columnsList" :key="item.id" :label="item.label" :prop="item.prop"
                       align="center"/>

      <el-table-column width="90">
        <el-button-group>
          <el-button type="primary" icon="el-icon-edit" size="small" circle @click="editForm(list.id)"></el-button>
          <el-button type="primary" icon="el-icon-delete" size="small" circle @click="deleteTodo(list.id)"></el-button>
        </el-button-group>
      </el-table-column>

    </el-table>

    <el-row class="addButton">
      <el-button type="primary" icon="el-icon-plus" circle @click="openForm"></el-button>
    </el-row>

    <!--新增/编辑表单-->
    <el-form v-if="showForm" ref="dataForm" :model="todoList" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="todoList.title"></el-input>
      </el-form-item>
      <el-form-item label="截止时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="todoList.diedLineData"
                          style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker placeholder="选择时间" v-model="todoList.diedLineHour" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="事项等级">
        <el-radio-group v-model="todoList.level">
          <el-radio label="高"></el-radio>
          <el-radio label="中"></el-radio>
          <el-radio label="低"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="todoList.detail"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary">确认</el-button>
        <el-button @click="showForm = false">取消</el-button>
      </el-form-item>
    </el-form>
  </div>


</template>


<script>
import {getAll, deleteTodo, getOneTodo} from '@/utils/api'

export default {
  data() {
    return {
      list: [],
      showForm: false,
      columnsList: [
        {
          prop: 'title',
          label: '主题',
        },
        {
          prop: 'detail',
          label: '内容',
        },
        {
          prop: 'level',
          label: '优先级',
        },
        {
          prop: 'died_line',
          label: '截止日期',
        },
        {
          prop: 'status',
          label: '任务状态',
        },
      ],
      form: {
        status: '',
        time: '',
      },
      query: {
        status: '',
        startTime: '',
        endTime: ''
      },
      todoList: {
        title: '',
        diedLineData: '',
        diedLineHour: '',
        level: '',
        detail: ''
      }
    };
  },
  computed: {
    listWithBooleanStatus() {
      return this.list.map(item => ({
        status: item.status === 0 ? true : false
      }))
    }
  },
  created() {
    getAll()
        .then(res => {
          if (res.data.status == 0) {
            res.data.status = true
          } else {
            res.data.status = false
          }
          this.list = res.data
        })
        .catch(error => {
          console.error('错误:', error);
        });
  },
  methods: {
    search() {
      this.query.status = this.form.status
      this.query.startTime = this.form.time[0]
      this.query.endTime = this.form.time[1]
      getAll(this.query).then(res => {
        this.list = res.data
      })
    },
    tableRowClassName({row}) {
      if (row.level == 1) {
        return "top-todo";
      } else if (row.level == 2) {
        return "sec-todo";
      }
    },
    deleteTodo(id) {
      this.$confirm('您确定要删除该待办事项吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTodo(id).then(res => {
          const message = res.data;
          alert(message);
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    openForm() {
      this.showForm = true
    },
    editForm(id) {
      this.openForm()
      getOneTodo(id).then(res => {
        this.todoList = res.data()
      })
    }
  }
}
</script>

<style>
.tableBox {
  width: 1000px;
  margin: 100px auto;
  padding: 30px;
  border: 1px solid;
  background-color: aliceblue;
}

.addButton {
  margin-top: 10px;
}

.addButton .el-button {
  float: right;
  margin-right: 10px;
}

.el-table .top-todo {
  background: oldlace;
}

.el-table .sec-todo {
  background: #f0f9eb;
}
</style>
