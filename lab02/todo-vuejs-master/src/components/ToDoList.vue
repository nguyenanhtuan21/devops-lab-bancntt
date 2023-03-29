<template>
    <div class="hello">
    {{ count }}
        <div class="box p-4" >   
            <div class="form-group ml-5 mr-5 row">
                <div class="col-10"> 
                    <input class="form-control" autofocus 
                        v-model.trim="newTodo" 
                        @keyup.enter="Add"  
                        placeholder="Nhập việc cần làm và ấn Enter để thêm"> 
                </div>
                <div class="col-2"> 
                    <button @click="Add" class="btn btn-primary">
                        Add task
                    </button>
                </div>
            </div>
            <div>
                <table class="mt-3 listTodo">  
                    <p v-if="toDos.length <= 0"> 
                        Danh sách trống 
                    </p>
                    <tr v-for="item in toDos" 
                        :key="item.ID" >
                        <td>
                            <div class="ok"> 
                                <label> 
                                    {{ item.TodoName}} 
                                </label>
                            </div>
                        </td>
                        <td width="20%">
                            <a @click="Delete(item)" 
                              title="Xóa" 
                              class="delete badge badge-danger"
                            >
                               x
                            </a> 
                        </td>
                    </tr>
                </table> 
                <!-- <div class="m-5 text-left" >
                    <b> Bạn có {{ allTasks }} task </b>
                    <span class="badge badge-warning">
                        Task còn lại: {{ notDone }} 
                    </span> 
                    <span class="badge badge-success"> 
                        Task đã xong: {{ Done }} 
                    </span> 
                </div> -->
            </div> 
        </div>
        <br>
        <span> Click vào task để sửa, ấn Enter để submit </span>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      toDos:[],
      newTodo:""
    }
  },
  mounted(){
    axios.get('https://localhost:7155/api/Todolist')
                .then((response) =>{
                  this.toDos = response.data.Data;
                  console.log(response.data.Data)
                })
                .catch((error)=> {
                  console.log(error);
            })
  },
  methods: {
    Add () {
      axios.post('https://localhost:7155/api/Todolist', {
                    "ID": "68f6ee22-f2ec-44ec-a2be-e08f8008a932",
                    "TodoName": this.newTodo,
                    "Status": 0
                })
                .then((response)=> {
                  this.toDos =[];
                  this.toDos = response.data.Data;
                })
                .catch((error)=> {
                  console.log(error);
            })
    },
    Delete (item) {
      this.$swal.fire({
        title: 'are you sure?',
        icon: 'warning',
        showCancelButton: true
      }).then((result) => {
        if(result.isConfirmed) {
          axios.delete(`https://localhost:7155/api/Todolist?id=${item.ID}`)
          .then((response) =>{
            this.toDos = response.data.Data;
            this.$swal('Done it')
          })
        }
      })
    },
  },
  computed: {
  },
  filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
  }, 
   watch: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  font-size: 15px;
  cursor: pointer;
  margin-left: 20px
}
.completed label{
    color: #cccaca;
    text-decoration: line-through;
}
label {
    cursor:pointer;
}
.listTodo {
  font-size: 30px;
  margin: 0 auto;
}
table {
  width: 70%;
}
table, td {
  border: 1px black;
  text-align: left;
}
table td .delete {
  display: none;
}
table tr:hover .delete{
  display: block;
}
.box {
  width: 50%;
  height: auto;
  margin: 0 auto;
  margin-top: 10px;
  box-shadow: 0px 12px 23px 0px #c1c1c1;
  border: 1px solid #e2e2e2;
}
.mark {
  width: 50px;
  height: auto;
}
.ok {
  position: relative;
}

.ok input {
  position: absolute;
  width: 100%;
  
  top: 0px;
  left: 0px;
}
</style>
